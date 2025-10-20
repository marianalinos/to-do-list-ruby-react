import { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import Modal from './Modal';
import { tasksApi } from '../api/todo';

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  todoId: number;
  taskId: number;
  currentTitle: string;
  onSuccess: () => void;
}

export default function EditTaskModal({ 
  open, 
  onClose, 
  todoId, 
  taskId, 
  currentTitle, 
  onSuccess 
}: EditTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setTaskTitle(currentTitle);
    }
  }, [open, currentTitle]);

  const handleUpdate = async () => {
    if (!taskTitle.trim() || taskTitle.trim() === currentTitle) {
      onClose();
      return;
    }

    try {
      setLoading(true);
      await tasksApi.update(todoId, taskId, { task_title: taskTitle.trim() });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Erro ao atualizar tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    try {
      setLoading(true);
      await tasksApi.delete(todoId, taskId);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Erro ao excluir tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTaskTitle(currentTitle);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Editar Tarefa"
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            onClick={handleDelete} 
            variant="outlined" 
            color="error"
            disabled={loading}
          >
            Excluir
          </Button>
          <Button onClick={handleClose} variant="outlined"  sx={{
            borderColor: "#ff5c13", color: "#ff5c13",
          }}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            disabled={loading}
            sx={{ backgroundColor: '#783dbc', '&:hover': { backgroundColor: '#6a2c9a' } }}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Box>
      }
    >
      <TextField
        fullWidth
        label="Nome da tarefa"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        variant="outlined"
        autoFocus
        sx={{ marginTop: 4 }}
      />
    </Modal>
  );
}
