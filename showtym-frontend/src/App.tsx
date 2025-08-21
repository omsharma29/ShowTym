import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import SeatBook from "./pages/SeatBook"
import History from "./pages/History"
import SignUp from "./pages/SignUp"
import Booked from "./pages/Booked"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/:id">
        <Route path="details" element={<DetailsPage/>}/>
        <Route path="seatBook" element={<SeatBook/>}/>
        <Route path="booked" element={<Booked/>} />
      </Route>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/history" element={<History/>} />
      <Route path="*" element={<Navigate  to={'/'} replace />}/>
    </Routes>
  )
}

export default App