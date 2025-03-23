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

const TaskForm = ({ task, onSubmit, onClose }) => {
  const [form, setForm] = useState({ title: "", description: "" });

  // Populate form with task data when editing an existing task
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

  const handleSubmit = () => {
    // Basic validation: Ensure the title is not empty
    if (form.title.trim() === "") return;
    // If editing, include the task id; otherwise, pass form data as is
    onSubmit(task ? { ...task, ...form } : form);
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
