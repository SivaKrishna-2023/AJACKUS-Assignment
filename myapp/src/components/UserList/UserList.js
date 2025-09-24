import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../../api";
import UserTable from "../UserTable/UserTable";
import UserForm from "../UserForm/UserForm";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import FilterPopup from "../FilterPopup/FilterPopup";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchUsers().then((data) => {
      const withDept = data.map((u, i) => ({
        ...u,
        department: u.company?.name || "Dept " + (i + 1),
      }));
      setUsers(withDept.sort((a, b) => a.id - b.id));
    });
  }, []);

  const handleAddOrUpdate = async (user) => {
    if (editingUser) {
      const updated = await updateUser(editingUser.id, user);
      setUsers((prev) =>
        prev
          .map((u) => (u.id === editingUser.id ? { ...u, ...updated } : u))
          .sort((a, b) => a.id - b.id)
      );
      setEditingUser(null);
    } else {
      const newUser = await addUser(user);
      const nextId = Math.max(...users.map((u) => u.id), 0) + 1;
      newUser.id = nextId;

      setUsers((prev) =>
        [...prev, newUser].sort((a, b) => a.id - b.id)
      );
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1); 
  };

  const applyFilters = (filtersObj) => {
    setFilters(filtersObj);
    setPage(1); 
  };

  
  const filteredUsers = users.filter((u) => {
    const fullName = u.name.toLowerCase();
    const [firstName, lastName = ""] = fullName.split(" ");

    return (
      (!search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (!filters.firstName ||
        firstName.includes(filters.firstName.toLowerCase())) &&
      (!filters.lastName ||
        lastName.includes(filters.lastName.toLowerCase())) &&
      (!filters.email ||
        u.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.department ||
        u.department.toLowerCase().includes(filters.department.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const currentPage = Math.min(page, totalPages || 1); 
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="user-list">
      <UserForm
        onSubmit={handleAddOrUpdate}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <div className="top-bar">
        <SearchBar value={search} onSearch={handleSearch} />
        <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
      </div>

      {showFilter && (
        <FilterPopup
          onApply={applyFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      <UserTable
        users={paginatedUsers}
        onEdit={setEditingUser}
        onDelete={handleDelete}
      />

      <Pagination
        total={filteredUsers.length}
        perPage={perPage}
        page={currentPage}
        setPage={setPage}
        setPerPage={setPerPage}
      />
    </div>
  );
};

export default UserList;
