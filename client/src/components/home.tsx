import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [username, setUsername] = useState<string>(''); // State to store the GitHub username
  const navigate = useNavigate(); // React Router's navigation hook

  const handleConnect = () => {
    if (!username.trim()) {
      alert('Please enter a GitHub username.');
      return;
    }
    // Navigate to /dashboard (StreakTracker) with the username passed as state
    navigate('/dashboard', { state: { username } });
  };

  return (
    <div className="App">
      <h1>GitHub Contribution Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleConnect}>Connect</button>
      </div>
    </div>
  );
};
