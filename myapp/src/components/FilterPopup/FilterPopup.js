import React, { useState } from "react";
import "./FilterPopup.css";

const FilterPopup = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="filter-popup">
      <h3>Filter Users</h3>
      <input
        name="name"
        placeholder="Name"
        value={filters.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={filters.email}
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="Department"
        value={filters.department}
        onChange={handleChange}
      />
      <div className="filter-actions">
        <button onClick={handleApply}>Apply</button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FilterPopup;
