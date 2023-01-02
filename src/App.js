
import { Routes , Route } from 'react-router-dom';
import AddUserPage from './pages/AddUser';
import Homepage from './pages/Home';
import UserPage from './pages/userPage';
function App() {
  return (
    <div className='w-full h-screen bg-gray-200'>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='addUser' element={<AddUserPage/>} />
        <Route path='userPage' element={<UserPage/>} />
      </Routes>
    </div>
  );
}

export default App;
