import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/DownloadDoneOutlined";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const TaskForm = ({ task, onSubmit, onClose }) => {
  const { isAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (task) {
      setForm({ title: task.title, description: task.description });
    } else {
      setForm({ title: "", description: "" });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.title.trim() === "") return;

    try {
      let response;
      const config = {
        headers: {
          Authorization: `Bearer ${isAuth.token}`,
        },
      };
      if (task) {
        response = await axios.put(
          `http://localhost:5000/api/tasks/${task._id}`,
          form,
          config
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/tasks",
          form,
          config
        );
      }
      onSubmit(task ? { ...task, ...form } : response.data);
      console.log("Task saved successfully:", response.data);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ px: 3, py: 2, fontSize: "1.25rem", fontWeight: 600 }}>
        {task ? "Edit Task" : "Add New Task"}
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={form.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={task ? <EditIcon /> : <AddIcon />}
          sx={{ textTransform: "none" }}
        >
          {task ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
