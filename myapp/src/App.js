import React from "react";
import Header from "./components/Header/Header";
import UserList from "./components/UserList/UserList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <UserList />
    </div>
  );
}

export default App;
