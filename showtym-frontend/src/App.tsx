import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import SeatBook from "./pages/SeatBook"
import History from "./pages/History"
import SignUp from "./pages/SignUp"
import Booked from "./pages/Booked"
import PageNotFound from "./pages/PageNotFound"
import ProtectedRoute from "./functions/RouteProtection"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id">
        <Route path="details" element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
        <Route path="seatBook" element={<ProtectedRoute><SeatBook /></ProtectedRoute>} />
        <Route path="booked" element={<ProtectedRoute><Booked /></ProtectedRoute>} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App