// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
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
      let config = {
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
      onSubmit(task ? { ...task, ...form } : form);
      console.log("Task saved successfully:", response.data);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {task ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
