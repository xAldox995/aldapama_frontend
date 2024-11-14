import './App.css'
import { Route, Routes } from 'react-router';
import Login from './components/Login';
import Invoices from './components/Invoices';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/invoices' element={<Invoices />} />
    </Routes>
  )
}

export default App
