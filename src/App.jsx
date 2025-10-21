import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { AirlinesPage } from "./pages/tables/AirlinesPage";
import { UsersPage } from "./pages/tables/UsersPage";
import { FlightsPage } from "./pages/tables/FlightsPage";
import { SeatsPage } from "./pages/tables/SeatsPage";
import { NewUsersPage } from "./pages/create/NewUsersPage";
import { NewAirlinesPage } from "./pages/create/NewAirlinesPage";
import { NewFlightsPage } from "./pages/create/NewFlightsPage";
import { NewSeatsPage } from "./pages/create/NewSeatsPage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/login/RegisterPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { BookSeatPage } from "./pages/BookSeatPage";
import { HomePage } from "./pages/HomePage";
import { FlightDetailPage } from "./pages/FlightDetailPage";
import { TicketsPage } from "./pages/TicketsPage";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="mt-4 mb-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />

            {/* rutas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />

            {/* rutas protegidas*/}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/airlines"
              element={
                <PrivateRoute>
                  <AirlinesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/flights"
              element={
                <PrivateRoute>
                  <FlightsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/seats"
              element={
                <PrivateRoute>
                  <SeatsPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/users/new"
              element={
                <PrivateRoute>
                  <NewUsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/airlines/new"
              element={
                <PrivateRoute>
                  <NewAirlinesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/flights/new"
              element={
                <PrivateRoute>
                  <NewFlightsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/seats/new"
              element={
                <PrivateRoute>
                  <NewSeatsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/bookSeat"
              element={
                <PrivateRoute>
                  <BookSeatPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/flights/:id"
              element={
                <PrivateRoute>
                  <FlightDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/:userId"
              element={
                <PrivateRoute>
                  <TicketsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
