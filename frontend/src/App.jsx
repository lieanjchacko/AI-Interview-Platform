import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateInterview from "./pages/CreateInterview";
import InterviewDetails from "./pages/InterviewDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/create-interview"
        element={<CreateInterview />}
      />

      <Route
        path="/interview/:id"
        element={<InterviewDetails />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;