
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import BooksList from './pages/BooksList'
import BookDetail from './pages/BookDetail'
import Transactions from './pages/Transactions'
import TransactionDetail from './pages/TransactionDetail'
import AddBook from './pages/AddBook'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<TransactionDetail />} />
        </Route>
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </div>
  )
}
