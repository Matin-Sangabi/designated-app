
import { Routes , Route } from 'react-router-dom';
import Homepage from './pages/Home';
function App() {
  return (
    <div className='w-full h-screen bg-gray-100'>
      <Routes>
        <Route path='/' element={<Homepage/>} />
      </Routes>
    </div>
  );
}

export default App;
