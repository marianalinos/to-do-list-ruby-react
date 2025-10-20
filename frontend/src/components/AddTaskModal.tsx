import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Modal from "./Modal";
import { tasksApi } from "../api/todo";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  todoId: number;
  onSuccess: () => void;
}

export default function AddTaskModal({
  open,
  onClose,
  onSuccess,
  todoId,
}: AddTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    try {
      setLoading(true);
      await tasksApi.create({
        task_title: taskTitle.trim(),
        task_status: "pending",
        todo_id: todoId,
      });
      setTaskTitle("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTaskTitle("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Nova tarefa"
      
      actions={
        <Box>
          <Button onClick={handleClose} variant="outlined" sx={{
            borderColor: "#ff5c13", color: "#ff5c13",
          }}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!taskTitle.trim() || loading}
            sx={{
              backgroundColor: "#783dbc",
              "&:hover": { backgroundColor: "#6a2c9a" },
              marginLeft: 2
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
          label="Nome da tarefa"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          autoFocus
          sx={{ marginTop: 4 }}
        />
      </Box>
    </Modal>
  );
}
