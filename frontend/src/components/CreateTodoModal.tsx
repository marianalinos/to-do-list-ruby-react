import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Modal from "./Modal";
import { todosApi } from "../api/todo";

interface CreateTodoModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTodoModal({
  open,
  onClose,
  onSuccess,
}: CreateTodoModalProps) {
  const [todoTitle, setTodoTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoTitle.trim()) return;

    try {
      setLoading(true);
      await todosApi.create({ todo_title: todoTitle.trim() });
      setTodoTitle("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Erro ao criar lista");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTodoTitle("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Nova lista"
      actions={
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: "#ff5c13",
              color: "#ff5c13",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!todoTitle.trim() || loading}
            sx={{
              backgroundColor: "#783dbc",
              "&:hover": { backgroundColor: "#6a2c9a", marginLeft: 2 },
            }}
          >
            {loading ? "Criando..." : "Criar"}
          </Button>
        </Box>
      }
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Insira o nome da lista"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          variant="outlined"
          autoFocus
          sx={{ marginTop: 4 }}
        />
      </Box>
    </Modal>
  );
}
