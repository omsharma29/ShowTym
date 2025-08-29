import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import SeatBook from "./pages/SeatBook"
import History from "./pages/History"
import SignUp from "./pages/SignUp"
import Booked from "./pages/Booked"
import PageNotFound from "./pages/PageNotFound"
import ProtectedRoute from "./functions/RouteProtection"
import PaymentStatus from "./pages/PaymentStatus"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/payment-status/:myOrderId" element={<ProtectedRoute><PaymentStatus /></ProtectedRoute>} />
      <Route path="/:id/details" element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
      <Route path="/:id/seatBook" element={<ProtectedRoute><SeatBook /></ProtectedRoute>} />
      <Route path="/:id/booked" element={<ProtectedRoute><Booked /></ProtectedRoute>} />
      {/* This catch-all route must be the last route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App