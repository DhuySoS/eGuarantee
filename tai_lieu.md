src/
├── app/ # Routing thuần của Next.js (App Router)
│ ├── (portal)/ # Route group áp dụng chung MainTemplate (Layout)
│ │ ├── layout.tsx # Kế thừa MainTemplate từ components/templates
│ │ └── guarantees/
│ │ ├── page.tsx # Frame 01: Danh sách & bộ lọc
│ │ ├── create/
│ │ │ └── page.tsx # Frame 02: Tạo mới yêu cầu
│ │ └── [id]/
│ │ ├── page.tsx # Frame 03: Xem chi tiết (Maker/Checker)
│ │ └── edit/
│ │ └── page.tsx # Chỉnh sửa yêu cầu
│ ├── layout.tsx # Root layout (AntdRegistry, ReactQueryProvider)
│ ├── globals.css
│ └── page.tsx # Redirect về /guarantees
│
├── components/ # Shared UI Components (Chuẩn Atomic Design)
│ ├── atoms/ # Phần tử cơ bản nhỏ nhất (UI thuần, không vỡ thêm được)
│ │ ├── UiButton.tsx # Nút bấm chuẩn
│ │ ├── UiInput.tsx # Input text trần
│ │ ├── UiSelect.tsx # Select box trần
│ │ ├── UiDatePicker.tsx # Date picker trần
│ │ ├── UiDivider.tsx # Đường phân cách
│ │ └── StatusTag.tsx # Tag hiển thị trạng thái (badge màu)
│ │
│ ├── molecules/ # Tổ hợp từ các atoms (nhập liệu có nhãn, control bar)
│ │ ├── UiInputField.tsx # Cụm Label + UiInput + Error Message
│ │ ├── UiSelectField.tsx # Cụm Label + UiSelect + Error Message
│ │ ├── UiDatePickerField.tsx # Cụm Label + UiDatePicker + Error Message
│ │ └── UserMiniProfile.tsx # Avatar + Tên + Role (dùng ở đáy Sidebar & góc Header)
│ │
│ ├── organisms/ # Các khối giao diện phức tạp hoàn chỉnh
│ │ ├── AppHeader.tsx # Header chứa Brand + Action + User Profile
│ │ ├── AppSidebar.tsx # Menu điều hướng + UserMiniProfile ở đáy
│ │ ├── PageContainer.tsx # Khung chuẩn trang: Breadcrumb + Title + Action Extra
│ │ └── FormSection.tsx # Card gom nhóm form: Tiêu đề nhóm + Khung bọc Grid
│ │
│ └── templates/ # Khung layout tổng thể lắp ráp từ các organisms
│ └── MainTemplate.tsx # Khung sườn App: AppHeader + AppSidebar + Slot Content
│
├── features/
│ └── guarantee/ # Business Domain: Quản lý bảo lãnh
│ ├── components/ # Chia theo từng MODULE cụ thể
│ │ │
│ │ ├── list/ # Module 1: Trang danh sách & tra cứu
│ │ │ ├── GuaranteeFilter.tsx # Bộ lọc tìm kiếm (Từ khóa, trạng thái, loại, ngày)
│ │ │ ├── GuaranteeTable.tsx # Bảng dữ liệu bảo lãnh
│ │ │ └── GuaranteeTableActions.tsx # Cột action menu (...): Xem, sửa, gửi duyệt, xóa
│ │ │
│ │ ├── form/ # Module 2: Nhập liệu / Chỉnh sửa bảo lãnh
│ │ │ ├── GuaranteeForm.tsx # Form chính (dùng chung cho Create & Edit)
│ │ │ ├── GuaranteeGeneralFields.tsx # Cụm thông tin chung (Khách hàng, CIF, loại)
│ │ │ ├── GuaranteeAmountFields.tsx # Cụm thông tin số tiền & thời hạn
│ │ │ └── GuaranteeFormFooter.tsx # Cụm nút bấm lưu nháp / gửi duyệt của form
│ │ │
│ │ └── detail/ # Module 3: Chi tiết hồ sơ & phê duyệt
│ │ ├── GuaranteeDetailView.tsx # Khối hiển thị thông tin hồ sơ (cột trái)
│ │ ├── GuaranteeHistoryTimeline.tsx# Timeline lịch sử thao tác/phê duyệt (cột phải)
│ │ ├── GuaranteeActionButtons.tsx # Cụm nút Maker/Checker (Duyệt, Từ chối, Hủy)
│ │ └── GuaranteeRejectModal.tsx # Modal nhập lý do từ chối dành riêng cho Checker
│ │
│ ├── hooks/ # Custom hooks (TanStack Query)
│ │ ├── useGuarantees.ts
│ │ ├── useGuaranteeDetail.ts
│ │ ├── useGuaranteeMutations.ts
│ │ └── useGuaranteeHistories.ts
│ │
│ ├── services/ # Gọi API Backend
│ │ ├── apiClient.ts
│ │ └── guaranteeService.ts
│ │
│ ├── schemas/ # Zod Schemas
│ │ └── guarantee.schema.ts
│ │
│ ├── constants/ # Hằng số, options mapping
│ │ ├── guarantee.constants.ts
│ │ └── role.constants.ts
│ │
│ └── types/ # TypeScript types
│ ├── guarantee.types.ts
│ └── api.types.ts
│
├── lib/
│ └── queryClient.ts
│
└── utils/
├── formatCurrency.ts
└── formatDate.ts
