import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth/Auth";
import ExpenseTracker from "./pages/expense-tracker/ExpenseTracker";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Auth />} />
      <Route path="/expense-tracker" element={<ExpenseTracker />} />
    </Routes>
  );
}

export default App;
