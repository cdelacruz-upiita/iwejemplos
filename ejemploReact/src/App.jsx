import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import './styles/formStyles.css'

export default function App() {
  const [vista, setVista] = useState("login");

  return (
    <div>
      {vista === "login" && (
        <LoginForm onCreateAccount={() => setVista("register")} />
      )}

      {vista === "register" && (
        <RegisterForm onBackToLogin={() => setVista("login")} />
      )}
    </div>
  );
}