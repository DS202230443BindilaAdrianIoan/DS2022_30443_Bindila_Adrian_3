import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import ChartPage from "./components/ChartPage";
import ChatRoom from "./components/ChatRoom";
import ClientPage from "./components/ClientPage";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/client"
          element={
            <ClientPage />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPage />
          }
        />
        <Route path="/lol" element={<ChatRoom/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
