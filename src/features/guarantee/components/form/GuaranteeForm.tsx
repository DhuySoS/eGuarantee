"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Space,
  App,
  AutoComplete,
} from "antd";
import {
  SaveOutlined,
  SendOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  GuaranteeFormData,
  guaranteeFormSchema,
} from "@/features/guarantee/schemas/guarantee.schema";
import { Guarantee } from "@/features/guarantee/types/guarantee";
import {
  CURRENCY_OPTIONS,
  GUARANTEE_TYPE_OPTIONS,
} from "@/features/guarantee/constants/guarantee";
import { useCustomers } from "../../hooks/useGuaranteeMutations";

const { TextArea } = Input;

const Field = ({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export interface GuaranteeFormProps {
  initialData?: Guarantee;
  onSaveDraft: (data: GuaranteeFormData) => void;
  onSubmitForApproval: (data: GuaranteeFormData) => void;
  isLoading?: boolean;
}

export default function GuaranteeForm({
  initialData,
  onSaveDraft,
  onSubmitForApproval,
  isLoading = false,
}: GuaranteeFormProps) {
  const { data: customers = [], isLoading: isLoadingCustomers } =
    useCustomers();

  const [cifDropdownOpen, setCifDropdownOpen] = React.useState(false);

  const customerMap = useMemo(() => {
    const map = new Map<string, { name: string; taxCode: string }>();
    if (customers) {
      customers?.forEach((c: any) => {
        map.set(c.cif, { name: c.customerName, taxCode: c.taxCode });
      });
    }
    return map;
  }, [customers]);

  const router = useRouter();
  const isEdit = !!initialData;
  const { modal } = App.useApp();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<GuaranteeFormData>({
    resolver: zodResolver(guaranteeFormSchema),
    defaultValues: initialData || {
      currency: "VND",
      guaranteeType: "BID_BOND",
      contractNumber: "",
      relatedContractNumber: "",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const effectiveDate = watch("effectiveDate");
  const expiryDate = watch("expiryDate");
  const guaranteeType = watch("guaranteeType");
  const guaranteeAmount = watch("guaranteeAmount");
  const customerCifValue = watch("customerCif");
  const currency = watch("currency") || "VND";
  const guaranteeDays =
    effectiveDate && expiryDate
      ? Math.max(dayjs(expiryDate).diff(dayjs(effectiveDate), "day"), 0)
      : 0;

  // Tự động re-validate tenderNumber khi loại bảo lãnh thay đổi
  useEffect(() => {
    if (guaranteeType) {
      trigger("tenderNumber");
    }
  }, [guaranteeType, trigger]);

  const customerOptions = useMemo(() => {
    const query = (customerCifValue || "").trim().toLowerCase();
    return (customers || [])
      .filter((cust) => {
        if (!query) return true;
        return (
          cust.cif?.toLowerCase().includes(query) ||
          cust.customerName?.toLowerCase().includes(query) ||
          cust.taxCode?.toLowerCase().includes(query)
        );
      })
      .map((cust) => ({
        value: cust.cif,
        label: (
          <div className="flex flex-col py-1.5 px-0.5 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-blue-600 text-xs">
                CIF: {cust.cif}
              </span>
              <span className="text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                MST: {cust.taxCode}
              </span>
            </div>
            <div className="text-xs text-gray-800 font-medium truncate mt-0.5">
              {cust.customerName}
            </div>
          </div>
        ),
      }));
  }, [customers, customerCifValue]);

  // Chuẩn hóa dữ liệu form, loại bỏ các trường thừa từ initialData trước khi gửi
  const cleanFormData = (raw: any): GuaranteeFormData => ({
    customerCif: raw.customerCif || "",
    customerName: raw.customerName || "",
    taxCode: raw.taxCode || "",
    guaranteeType: raw.guaranteeType || "BID_BOND",
    guaranteeAmount: Number(raw.guaranteeAmount || 0),
    currency: raw.currency || "VND",
    effectiveDate: raw.effectiveDate || "",
    expiryDate: raw.expiryDate || "",
    tenderNumber: raw.tenderNumber || "",
    contractNumber: raw.contractNumber || "",
    relatedContractNumber: raw.relatedContractNumber || "",
    referenceNumber: raw.referenceNumber || "",
    purpose: raw.purpose || "",
    beneficiaryName: raw.beneficiaryName || "",
    beneficiaryAddress: raw.beneficiaryAddress || "",
    contactEmail: raw.contactEmail || "",
    phoneNumber: raw.phoneNumber || "",
  });

  const handleSaveDraft = () => {
    const values = watch();
    if (!values.customerCif || !values.customerName) {
      modal.warning({
        title: "Thiếu thông tin",
        content:
          "Vui lòng nhập tối thiểu Mã CIF và Tên khách hàng để lưu nháp.",
      });
      return;
    }
    onSaveDraft(cleanFormData(values));
  };

  const onValidSubmit = (data: GuaranteeFormData) => {
    modal.confirm({
      title: "Xác nhận gửi phê duyệt",
      icon: <ExclamationCircleOutlined />,
      content:
        'Hồ sơ sẽ chuyển sang trạng thái "Chờ phê duyệt". Bạn có chắc chắn?',
      okText: "Gửi phê duyệt",
      cancelText: "Hủy",
      onOk: () => onSubmitForApproval(cleanFormData(data)),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      className="space-y-4 max-w-5xl mx-auto pb-6"
    >
      <Card title=" Thông tin khách hàng" size="small">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Field label="CIF" required error={errors.customerCif?.message}>
              <Controller
                name="customerCif"
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    value={field.value || ""}
                    options={customerOptions}
                    open={cifDropdownOpen}
                    onOpenChange={setCifDropdownOpen}
                    onFocus={() => setCifDropdownOpen(true)}
                    onSelect={(cif) => {
                      field.onChange(cif);
                      setCifDropdownOpen(false);
                      const customer = customerMap.get(cif);
                      if (customer) {
                        setValue("customerName", customer.name, {
                          shouldValidate: true,
                        });
                        setValue("taxCode", customer.taxCode, {
                          shouldValidate: true,
                        });
                      }
                    }}
                    onChange={(val) => {
                      field.onChange(val);
                      setCifDropdownOpen(true);
                      const customer = customerMap.get(val);
                      if (customer) {
                        setValue("customerName", customer.name, {
                          shouldValidate: true,
                        });
                        setValue("taxCode", customer.taxCode, {
                          shouldValidate: true,
                        });
                      } else {
                        setValue("customerName", "", { shouldValidate: true });
                        setValue("taxCode", "", { shouldValidate: true });
                      }
                    }}
                    className="w-full"
                    popupMatchSelectWidth={false}
                    defaultActiveFirstOption={false}
                    notFoundContent={
                      isLoadingCustomers ? (
                        <div className="py-2 px-3 text-center text-xs text-gray-400">
                          Đang tải dữ liệu...
                        </div>
                      ) : (
                        <div className="py-2 px-3 text-center text-xs text-gray-400">
                          Không tìm thấy khách hàng phù hợp
                        </div>
                      )
                    }
                  >
                    <Input
                      placeholder="Nhập CIF hoặc tìm kiếm khách hàng"
                      maxLength={12}
                      allowClear
                      onClick={() => setCifDropdownOpen(true)}
                      suffix={
                        <SearchOutlined
                          className="text-gray-400 cursor-pointer hover:text-blue-500"
                          onClick={() => setCifDropdownOpen((prev) => !prev)}
                        />
                      }
                      status={errors.customerCif ? "error" : ""}
                    />
                  </AutoComplete>
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={8}>
            <Field label="Tên khách hàng">
              <Controller
                name="customerName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tự động hiển thị"
                    disabled
                    className="bg-gray-50 text-gray-800 font-medium"
                  />
                )}
              />
            </Field>
          </Col>

          <Col xs={24} md={8}>
            <Field label="Mã số thuế" error={errors.taxCode?.message}>
              <Controller
                name="taxCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tự động hiển thị"
                    disabled
                    className="bg-gray-50 text-gray-800 font-medium"
                  />
                )}
              />
            </Field>
          </Col>
        </Row>
      </Card>

      <Card title=" Thông tin bảo lãnh" size="small">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Field
              label="Loại bảo lãnh"
              required
              error={errors.guaranteeType?.message}
            >
              <Controller
                name="guaranteeType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Chọn loại bảo lãnh"
                    className="w-full"
                    options={GUARANTEE_TYPE_OPTIONS}
                  />
                )}
              />
            </Field>
          </Col>

          <Col xs={24} md={8}>
            <Field label="Loại tiền" required error={errors.currency?.message}>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full"
                    options={CURRENCY_OPTIONS}
                  />
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={8}>
            <Field
              label="Số tiền bảo lãnh"
              required
              error={errors.guaranteeAmount?.message}
            >
              <Controller
                name="guaranteeAmount"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    style={{ width: "100%" }}
                    className="w-full"
                    inputMode="numeric"
                    placeholder="Nhập số tiền (bắt buộc nhập số)"
                    controls={false}
                    min={1}
                    max={1_000_000_000_000}
                    formatter={(val) =>
                      `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(val) => {
                      const clean = (val || "")
                        .toString()
                        .replace(/[^0-9]/g, "");
                      return clean ? Number(clean) : ("" as any);
                    }}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "Delete",
                        "Tab",
                        "Escape",
                        "Enter",
                        "ArrowLeft",
                        "ArrowRight",
                        "ArrowUp",
                        "ArrowDown",
                        "Home",
                        "End",
                      ];
                      if (
                        allowedKeys.includes(e.key) ||
                        (e.ctrlKey &&
                          ["a", "c", "v", "x", "z"].includes(
                            e.key.toLowerCase(),
                          )) ||
                        (e.metaKey &&
                          ["a", "c", "v", "x", "z"].includes(
                            e.key.toLowerCase(),
                          ))
                      ) {
                        return;
                      }
                      // Chặn tuyệt đối không cho gõ bất kỳ chữ cái nào
                      if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      const pasteText = e.clipboardData.getData("text");
                      if (!/^\d+$/.test(pasteText.replace(/,/g, "").trim())) {
                        e.preventDefault();
                        const numericOnly = pasteText.replace(/[^0-9]/g, "");
                        if (numericOnly) {
                          field.onChange(Number(numericOnly));
                        }
                      }
                    }}
                    suffix={
                      <span className="text-gray-400 font-semibold text-xs pr-1">
                        {currency}
                      </span>
                    }
                    status={errors.guaranteeAmount ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>

          <Col xs={24} md={8}>
            <Field
              label="Ngày hiệu lực"
              required
              error={errors.effectiveDate?.message}
            >
              <Controller
                name="effectiveDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(d) => {
                      field.onChange(d ? d.format("YYYY-MM-DD") : "");
                      if (watch("expiryDate")) {
                        trigger("expiryDate");
                      }
                    }}
                    format="DD/MM/YYYY"
                    className="w-full"
                    placeholder="Chọn ngày"
                    disabledDate={(current) =>
                      current && current.isBefore(dayjs().startOf("day"))
                    }
                    status={errors.effectiveDate ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={8}>
            <Field
              label="Ngày hết hạn"
              required
              error={errors.expiryDate?.message}
            >
              <Controller
                name="expiryDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(d) => {
                      field.onChange(d ? d.format("YYYY-MM-DD") : "");
                      setTimeout(() => trigger("expiryDate"), 0);
                    }}
                    format="DD/MM/YYYY"
                    className="w-full"
                    placeholder="Chọn ngày"
                    disabledDate={(current) => {
                      if (!current) return false;
                      if (current.isBefore(dayjs().startOf("day"))) {
                        return true;
                      }
                      if (effectiveDate) {
                        // Bắt buộc sau Ngày hiệu lực ít nhất 1 ngày
                        return current.isBefore(
                          dayjs(effectiveDate).startOf("day").add(1, "day"),
                        );
                      }
                      return false;
                    }}
                    status={errors.expiryDate ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={8}>
            <Field label="Số ngày hiệu lực">
              <Input
                value={
                  effectiveDate && expiryDate
                    ? `${guaranteeDays} ngày`
                    : undefined
                }
                placeholder="Tự động tính"
                disabled
                className="bg-gray-50 text-gray-800 font-medium"
              />
            </Field>
          </Col>
          <Col xs={24} md={8}>
            <Field
              label="Số hợp đồng liên quan"
              error={errors.relatedContractNumber?.message}
            >
              <Controller
                name="relatedContractNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Nhập số hợp đồng (nếu có)"
                    status={errors.relatedContractNumber ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={8}>
            <Field
              label="Số tham chiếu"
              error={errors.referenceNumber?.message}
            >
              <Controller
                name="referenceNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Nhập số tham chiếu (nếu có)"
                    status={errors.referenceNumber ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>
          {guaranteeType === "BID_BOND" && (
            <Col xs={24} md={8}>
              <Field
                label="Số hiệu thầu"
                required
                error={errors.tenderNumber?.message}
              >
                <Controller
                  name="tenderNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Nhập số hiệu thầu"
                      status={errors.tenderNumber ? "error" : ""}
                    />
                  )}
                />
              </Field>
            </Col>
          )}
        </Row>
      </Card>

      <Card title=" Bên thụ hưởng & Liên hệ" size="small">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Field
              label="Tên bên thụ hưởng"
              required
              error={errors.beneficiaryName?.message}
            >
              <Controller
                name="beneficiaryName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Nhập tên bên thụ hưởng "
                    status={errors.beneficiaryName ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={12}>
            <Field
              label="Địa chỉ bên thụ hưởng"
              error={errors.beneficiaryAddress?.message}
            >
              <Controller
                name="beneficiaryAddress"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập địa chỉ" />
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={12}>
            <Field
              label="Email liên hệ"
              required
              error={errors.contactEmail?.message}
            >
              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Nhập email"
                    status={errors.contactEmail ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>
          <Col xs={24} md={12}>
            <Field
              label="Số điện thoại"
              required
              error={errors.phoneNumber?.message}
            >
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    maxLength={10}
                    placeholder="Nhập số điện thoại (10 chữ số)"
                    status={errors.phoneNumber ? "error" : ""}
                  />
                )}
              />
            </Field>
          </Col>
          <Col xs={24}>
            <Field
              label="Mục đích bảo lãnh"
              required
              error={errors.purpose?.message}
            >
              <Controller
                name="purpose"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <TextArea
                      {...field}
                      rows={3}
                      placeholder="Nhập mục đích bảo lãnh"
                      status={errors.purpose ? "error" : ""}
                      style={{ resize: "none", paddingBottom: 28 }}
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none">
                      {field.value?.length || 0}/1000
                    </span>
                  </div>
                )}
              />
            </Field>
          </Col>
        </Row>
      </Card>

      <Card size="small">
        <div className="flex justify-end items-center">
          <Space>
            <Button
              htmlType="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="hover:border-red-500! hover:text-red-500! hover:bg-red-50! transition-colors"
            >
              Huỷ
            </Button>
            <Button
              htmlType="button"
              onClick={handleSaveDraft}
              loading={isLoading}
            >
              {isEdit ? "Lưu thay đổi" : "Lưu bản nháp"}
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Gửi duyệt
            </Button>
          </Space>
        </div>
      </Card>
    </form>
  );
}
