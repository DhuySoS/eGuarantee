"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import MakerActions from "./MakerActions";
import CheckerActions from "./CheckerActions";
import {
  useApproveGuarantee,
  useDeleteGuarantee,
  useGuarantee,
  useRejectGuarantee,
  useSubmitGuarantee,
} from "../../hooks/useGuaranteeDetail";

interface ActionsProps {
  id: string;
}

export default function Actions({ id }: ActionsProps) {
  const { user } = useAuth();

  const guaranteeQuery = useGuarantee(id);

  const submitMutation = useSubmitGuarantee();
  const deleteMutation = useDeleteGuarantee();
  const approveMutation = useApproveGuarantee();
  const rejectMutation = useRejectGuarantee();

  const handleSubmit = () => {
    submitMutation.mutate(id);
  };

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  const handleApprove = () => {
    approveMutation.mutate(id);
  };

  const handleReject = (reason: string) => {
    rejectMutation.mutate({
      id,
      payload: {
        reason,
      },
    });
  };

  if (guaranteeQuery.isLoading) {
    return null;
  }

  if (guaranteeQuery.isError || !guaranteeQuery.data) {
    return null;
  }

  const guarantee = guaranteeQuery.data;

  if (user?.role === "MAKER") {
    return (
      <MakerActions
        guarantee={guarantee}
        onSubmit={handleSubmit}
        isSubmitting={submitMutation.isPending}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
      />
    );
  }

  if (user?.role === "CHECKER") {
    return (
      <CheckerActions
        guarantee={guarantee}
        onApprove={handleApprove}
        onReject={handleReject}
        isApproving={approveMutation.isPending}
        isRejecting={rejectMutation.isPending}
      />
    );
  }

  return null;
}
