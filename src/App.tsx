import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import PokemonCard from "./Views/PokemonCard";
import DashboardLayout from "./Components/DashbaordLayout";

const App: React.FC = () => {
  return (
    <div className="w-screen">
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index element={<Dashboard />} />
            <Route path="/pages/pokemon/:id" element={<PokemonCard />} />
          </Route>

          <Route path="/*" element={<>Not Found</>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
