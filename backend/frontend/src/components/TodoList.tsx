import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { todosApi, tasksApi } from "../api/todo";
import type { Todo, Task } from "../api/todo";
import EditTodoModal from "./EditTodoModal";
import EditTaskModal from "./EditTaskModal";
import AddTaskModal from "./AddTaskModal";

export default function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [editTodoModal, setEditTodoModal] = React.useState<{
    open: boolean;
    todoId: number;
    title: string;
  }>({ open: false, todoId: 0, title: "" });

  const [editTaskModal, setEditTaskModal] = React.useState<{
    open: boolean;
    todoId: number;
    taskId: number;
    title: string;
  }>({ open: false, todoId: 0, taskId: 0, title: "" });

  const [addTaskModal, setAddTaskModal] = React.useState<{
    open: boolean;
    todoId: number;
  }>({ open: false, todoId: 0 });

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (err) {
      setError("Erro ao carregar as listas de tarefas");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (todoId: number, task: Task) => {
    try {
      const newStatus = task.task_status === "done" ? "pending" : "done";

      await tasksApi.update(todoId, task.id, { task_status: newStatus });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                tasks: todo.tasks?.map((t) =>
                  t.id === task.id ? { ...t, task_status: newStatus } : t
                ),
              }
            : todo
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Erro ao atualizar tarefa");
    }
  };

  const handleEditTodo = (todoId: number, title: string) => {
    setEditTodoModal({ open: true, todoId, title });
  };

  const handleEditTask = (todoId: number, taskId: number, title: string) => {
    setEditTaskModal({ open: true, todoId, taskId, title });
  };

  const handleAddTask = (todoId: number) => {
    setAddTaskModal({ open: true, todoId });
  };

  const handleModalSuccess = () => {
    fetchTodos(); // Recarrega os dados após qualquer operação
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[200px] bg-tertiary-1">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center min-h-[200px] bg-tertiary-1">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (todos.length === 0) {
    return (
      <Box className="flex justify-center items-center min-h-[200px] bg-tertiary-1">
        <Typography className="text-primary-1">
          Nenhuma lista de tarefas encontrada... Que tal criar uma?
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className="min-h-200 w-full rounded-md bg-gray-100 p-6 overflow-x-auto">
        <Box className="flex gap-6 m-2 flex-wrap md:flex-nowrap">
          {todos.map((todo) => (
            <Paper
              key={todo.id}
              elevation={2}
              className="w-full md:w-70 h-180 border-0 rounded-md bg-tertiary-1 flex flex-col flex-shrink-0"
            >
              <Box className="bg-primary-1 text-tertiary-1 p-4">
                <Box className="flex items-center justify-between">
                  <Box className="flex-grow text-center">
                    <Typography
                      className="text-2xl font-extrabold text-tertiary-1 cursor-pointer hover:underline"
                      onClick={() => handleEditTodo(todo.id, todo.todo_title)}
                    >
                      {todo.todo_title}
                    </Typography>
                    <Typography className="text-sm text-tertiary-1 opacity-90">
                      {todo.tasks?.length || 0} tarefa(s)
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={() => handleAddTask(todo.id)}
                    className="w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full hover:bg-gray-300 transition !text-tertiary-1"
                  >
                    +
                  </IconButton>
                </Box>
              </Box>

              <Box className="flex-grow overflow-y-auto bg-tertiary-1">
                {!todo.tasks || todo.tasks.length === 0 ? (
                  <Box className="p-4 text-center">
                    <Typography className="bg-tertiary-1" variant="body2">
                      Nenhuma tarefa
                    </Typography>
                  </Box>
                ) : (
                  <List className="p-0 bg-tertiary-1">
                    {todo.tasks.map((task) => {
                      const labelId = `checkbox-list-label-${task.id}`;
                      const isDone = task.task_status === "done";

                      return (
                        <ListItem
                          key={task.id}
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              onChange={() => handleToggleTask(todo.id, task)}
                              checked={isDone}
                              sx={{
                                color: "#783dbc",
                                "&.Mui-checked": {
                                  color: "#783dbc",
                                },
                              }}
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton
                            className=" hover:bg-gray-300"
                            onClick={() =>
                              handleEditTask(todo.id, task.id, task.task_title)
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  backgroundColor: isDone
                                    ? "#10b981"
                                    : "#ff5c13",
                                  width: 24,
                                  height: 24,
                                  fontSize: "12px",
                                  color: "white",
                                }}
                              >
                                {isDone ? "✓" : "○"}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              id={labelId}
                              primary={task.task_title}
                              className={`${
                                isDone
                                  ? "line-through text-gray-400"
                                  : "text-tertiary-2"
                              }`}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <EditTodoModal
        open={editTodoModal.open}
        onClose={() => setEditTodoModal({ open: false, todoId: 0, title: "" })}
        todoId={editTodoModal.todoId}
        currentTitle={editTodoModal.title}
        onSuccess={handleModalSuccess}
      />

      <EditTaskModal
        open={editTaskModal.open}
        onClose={() =>
          setEditTaskModal({ open: false, todoId: 0, taskId: 0, title: "" })
        }
        todoId={editTaskModal.todoId}
        taskId={editTaskModal.taskId}
        currentTitle={editTaskModal.title}
        onSuccess={handleModalSuccess}
      />

      <AddTaskModal
        open={addTaskModal.open}
        onClose={() => setAddTaskModal({ open: false, todoId: 0 })}
        todoId={addTaskModal.todoId}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
