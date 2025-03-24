import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
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
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import TaskForm from "./TaskForm";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const user = isAuth.user;
  const token = isAuth.token; 
  console.log("User:", user);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(
          "http://localhost:5000/api/tasks",
          config
        );
        setTasks(response.data);
        console.log("Tasks retrieved successfully:", response.data);
      } catch (error) {
        console.error("Error retrieving tasks:", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleDeleteTask = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      // Remove task from local state after deletion
      setTasks((prevTasks) =>
        prevTasks.filter((t) => {
          const currentId = t._id?.$oid || t._id || t.id;
          return currentId !== id;
        })
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const handleToggleCompleted = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const taskId = task._id?.$oid || task._id || task.id;
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        updatedTask,
        config
      );
      // Update local state with the updated task
      setTasks((prevTasks) =>
        prevTasks.map((t) => {
          const currentId = t._id;
          return currentId === taskId ? response.data : t;
        })
      );
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter tasks based on active tab and search query.
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

  const handleTaskFormSubmit = (task) => {
    setOpenForm(false);
    fetchTasks();
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
              Welcome, {user?.username || "User"}!
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
          {filteredTasks.map((task) => {
            const taskId = task._id?.$oid || task._id || task.id;
            return (
              <Paper key={taskId} sx={{ p: 2, borderRadius: 3 }} elevation={1}>
                <List disablePadding>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => handleEditTask(task)}>
                          <EditIcon color="primary"/>
                        </IconButton>
                        <IconButton onClick={() => handleDeleteTask(taskId)}>
                          <DeleteIcon color="error"  />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleCompleted(task)}
                    />
                    <ListItemText
                      sx={{ ml: 2 }}
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
                            {new Date(task.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            );
          })}
        </Stack>
      </Container>

      {/* Task Form Dialog */}
      {openForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskFormSubmit}
          onClose={() => setOpenForm(false)}
          token={token}
        />
      )}
    </>
  );
};

export default Home;
