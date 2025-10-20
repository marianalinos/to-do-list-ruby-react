import { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import Modal from './Modal';
import { todosApi } from '../api/todo';

interface EditTodoModalProps {
  open: boolean;
  onClose: () => void;
  todoId: number;
  currentTitle: string;
  onSuccess: () => void;
}

export default function EditTodoModal({ 
  open, 
  onClose, 
  todoId, 
  currentTitle, 
  onSuccess 
}: EditTodoModalProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setTodoTitle(currentTitle);
    }
  }, [open, currentTitle]);

  const handleUpdate = async () => {
    if (!todoTitle.trim() || todoTitle.trim() === currentTitle) {
      onClose();
      return;
    }

    try {
      setLoading(true);
      await todosApi.update(todoId, { todo_title: todoTitle.trim() });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Erro ao atualizar lista');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta lista? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setLoading(true);
      await todosApi.delete(todoId);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Erro ao excluir lista');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTodoTitle(currentTitle);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Editar Lista"
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
        label="Nome da lista"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        variant="outlined"
        autoFocus
        sx={{ marginTop: 4 }}
      />
    </Modal>
  );
}
