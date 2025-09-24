import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ onSubmit, editingUser, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        department: editingUser.department || "",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required!");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", email: "", department: "" });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />

      <button type="submit">
        {editingUser ? "Update User" : "Add User"}
      </button>
      {editingUser && (
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;
