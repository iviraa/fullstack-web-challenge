import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  TextField,
  Paper,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskForm from "./TaskForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const user = isAuth.user;
  console.log("User:", user);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish project report",
      description: "Due tomorrow",
      updatedAt: "Mar 18, 2025",
      completed: false,
    },
    {
      id: 2,
      title: "Buy groceries",
      description: "",
      updatedAt: "Mar 21, 2025",
      completed: true,
    },
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    if (activeTab === 1) return matchesSearch && !task.completed;
    if (activeTab === 2) return matchesSearch && task.completed;
    return matchesSearch;
  });

  const handleAddTask = () => {
    setEditingTask(null);
    setOpenForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenForm(true);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleTaskFormSubmit = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([
        ...tasks,
        { ...task, id: Date.now(), updatedAt: new Date().toDateString() },
      ]);
    }
    setOpenForm(false);
  };

  return (
    <>
      {/* Header */}
      <Container maxWidth="false" sx={{ py: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Welcome, {user.username}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here’s your overview for today.
            </Typography>
          </Box>
          <Button variant="contained" onClick={handleAddTask}>
            + Add Task
          </Button>
        </Stack>

        {/* Search and Filter */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {/* Tabs on the left */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="All" disableRipple />
            <Tab label="Active" disableRipple />
            <Tab label="Completed" disableRipple />
          </Tabs>

          {/* Search bar on the right with icon inside */}
          <Box sx={{ maxWidth: 300, width: "100%" }}>
            <TextField
              placeholder="Search tasks..."
              variant="outlined"
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>

        {/* Task List */}
        <Stack spacing={2}>
          {filteredTasks.map((task) => (
            <Paper key={task.id} sx={{ p: 2, borderRadius: 3 }} elevation={1}>
              <List disablePadding>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={() => handleEditTask(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={600}>
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="span"
                          sx={{ display: "block" }}
                        >
                          {task.description || "No description"}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          component="span"
                          sx={{ display: "block" }}
                        >
                          {task.updatedAt}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          ))}
        </Stack>
      </Container>

      {/* Task Form Dialog */}
      {openForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskFormSubmit}
          onClose={() => setOpenForm(false)}
        />
      )}
    </>
  );
};

export default Home;
