import {Routes,Route,Link, BrowserRouter } from 'react-router-dom';
 import { Dashboard,Register,Error,Landing } from './pages';

function App() {
  return <BrowserRouter>
  <nav>
    <Link to='/'>Dashbord</Link>
    <Link to='/register'>Register</Link>
    <Link to='/landing'>Landing</Link>
  </nav>
  <Routes>
    <Route path="/" element={<Dashboard/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/landing" element={<Landing/>} />
    <Route path="*" element={<Error/>} />
        
  </Routes>
  <Landing/>
  </BrowserRouter>
  
}

export default App;
