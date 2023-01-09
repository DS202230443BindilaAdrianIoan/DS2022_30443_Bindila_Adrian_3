import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import ChatPage from "./components/ChatPage";
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
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
