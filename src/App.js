import {Routes,Route, BrowserRouter } from 'react-router-dom';
 import { Register,Error,Landing,ProtectedRoute } from './pages';
import {AllJobs,AddJob,Profile,Stats,SharedLayout} from './pages/dashboard';

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={
    <ProtectedRoute>
      <SharedLayout/>
      </ProtectedRoute>} >
        <Route index element={<Stats/>} />
        <Route path="all-jobs" element={<AllJobs/>} />
        <Route path="add-jobs" element={<AddJob/>} />
        <Route path="profile" element={<Profile/>} />
    </Route> 
    <Route path="/register" element={<Register/>} />
    <Route path="/landing" element={<Landing/>} />
    <Route path="*" element={<Error/>} />
  </Routes>
  </BrowserRouter>
  // index=ala ne deschide ca home
}

export default App;
