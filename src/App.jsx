import { NavBar } from "./components/NavBar";
import { AirlinesPage } from "./pages/AirlinesPage";
import { UsersPage } from "./pages/UsersPage";
import { FlightsPage } from "./pages/FlightsPage";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import { SeatsPage } from "./pages/SeatsPage";

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/airlines" element={<AirlinesPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/seats" element={<SeatsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
