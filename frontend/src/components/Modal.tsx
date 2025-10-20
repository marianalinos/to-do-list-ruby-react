import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
}: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#783dbc",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-2xl font-bold  rounded-full hover:bg-gray-300 transition !text-tertiary-1"
        >
          ×
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>{children}</DialogContent>
      {actions && (
        <DialogActions sx={{ padding: 2, gap: 1 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
}
