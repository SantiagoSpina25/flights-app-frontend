import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { AirlinesPage } from "./pages/AirlinesPage";
import { UsersPage } from "./pages/UsersPage";
import { FlightsPage } from "./pages/FlightsPage";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import { SeatsPage } from "./pages/SeatsPage";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="container mt-4 mb-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/airlines" element={<AirlinesPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/seats" element={<SeatsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
