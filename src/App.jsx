import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { AirlinesPage } from "./pages/AirlinesPage";
import { UsersPage } from "./pages/UsersPage";
import { FlightsPage } from "./pages/FlightsPage";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import { SeatsPage } from "./pages/SeatsPage";
import { NewUsersPage } from "./pages/create/NewUsersPage";
import { NewAirlinesPage } from "./pages/create/NewAirlinesPage";
import { NewFlightsPage } from "./pages/create/NewFlightsPage";
import { NewSeatsPage } from "./pages/create/NewSeatsPage";


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
            <Route path="/users/new" element={<NewUsersPage />} />
            <Route path="/airlines/new" element={<NewAirlinesPage />} />
            <Route path="/flights/new" element={<NewFlightsPage />} />
            <Route path="/seats/new" element={<NewSeatsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
