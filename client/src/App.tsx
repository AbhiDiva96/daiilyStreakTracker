import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StreakTracker } from './components/trackStreak';
import { Home } from './components/home';
import { LandingPage } from './components/landing';
import { Analytics } from '@vercel/analytics/react';


function App() {
      
  return(
      <div>
        <Analytics/>
        <Router >
            <Routes>
                <Route path='/' element={<LandingPage/>} />
                <Route path="/home"  element={<Home/>}/>
                <Route path="/dashboard" element={<StreakTracker />} />
            </Routes>
        </Router>
      </div>
  );
}

export default App;
