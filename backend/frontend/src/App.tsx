import logo from "/logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import CreateTodoModal from "./components/CreateTodoModal";
import { Box, Button } from "@mui/material";
import { useState } from "react";

function App() {
  const [createTodoModalOpen, setCreateTodoModalOpen] = useState(false);

  const handleCreateTodoSuccess = () => {
    window.location.reload();
  };

  return (
    <Box className="mx-auto min-h-screen bg-white" >
      <Box className="shadow-sm mb-4 flex items-center justify-between gap-4">
        <img src={logo} className="w-20 m-6 md:w-35" alt="V360 Logo" />
        <h1 className="text-primary-1 font-bold text-lg md:text-3xl">
          Suas listas
        </h1>
        <Button
          onClick={() => setCreateTodoModalOpen(true)}
          className="!m-6 bg-secondary-1 rounded-md transition duration-200 hover:brightness-110 text-tertiary-1 text-sm md:text-base p-2  font-semibold"
          sx={{
            backgroundColor: '#ff5c13',
            color: 'white',
            '&:hover': {
              backgroundColor: '#e54a0a',
            },
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Nova lista
        </Button>
      </Box>
      <TodoList />
      
      <CreateTodoModal
        open={createTodoModalOpen}
        onClose={() => setCreateTodoModalOpen(false)}
        onSuccess={handleCreateTodoSuccess}
      />
    </Box>
  );
}

export default App;
