import React from "react";
import "./UserTable.css";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name || `${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.department || "N/A"}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="no-data">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;

