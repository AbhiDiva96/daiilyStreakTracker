import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StreakTracker } from './components/trackStreak';
import { Home } from './components/home';


function App() {
      
  return(
      <div>
        <Router >
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/dashboard" element={<StreakTracker />} />
            </Routes>
        </Router>
      </div>
  );
}

export default App;
