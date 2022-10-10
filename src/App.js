import {Route,Routes} from 'react-router-dom'
import Leaderboard from './Components/Leaderboard/Leaderboard';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import TypingTest from './pages/TypingTest/TypingTest';

function App() {
  return (
    <div>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='Typing-Test' element={<TypingTest />} />
      <Route path='Leaderboard' element={<Leaderboard />} />
      <Route path='profile' element={<Profile /> } />
      <Route path='*' element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;
