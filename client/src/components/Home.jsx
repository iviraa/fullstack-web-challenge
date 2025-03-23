import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "./TaskForm.jsx";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  // Open the TaskForm for adding a new task
  const handleAddTask = () => {
    setEditingTask(null);
    setOpenForm(true);
  };

  // Open the TaskForm for editing an existing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenForm(true);
  };

  // Remove a task from the list
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle form submission for both adding and editing tasks
  const handleFormSubmit = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              My To-Do List
            </Typography>
            <Button variant="contained" onClick={handleAddTask}>
              Add Task
            </Button>
          </Stack>
          {tasks.length === 0 ? (
            <Typography variant="body1" align="center">
              No tasks yet. Click "Add Task" to get started.
            </Typography>
          ) : (
            <List>
              {tasks.map((task) => (
                <ListItem
                  key={task.id}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        edge="end"
                        onClick={() => handleEditTask(task)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Stack>
      </Paper>
      {openForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onClose={() => setOpenForm(false)}
        />
      )}
    </Container>
  );
};

export default Home;
