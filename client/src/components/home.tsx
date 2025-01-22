import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [username, setUsername] = useState<string>(''); // State to store the GitHub username
  const navigate = useNavigate(); // React Router's navigation hook


   useEffect(() => {
    const storedUsername = localStorage.getItem('githubUsername');

    if(storedUsername){
        setUsername(storedUsername);
        navigate('/dashboard')
    }
   }, [navigate]);

  const handleConnect = () => {
    if (!username.trim()) {
      alert('Please enter a GitHub username.');
      return;
    }
    // Navigate to /dashboard (StreakTracker) with the username passed as state
    localStorage.setItem('githubUsername', username);
    navigate('/dashboard', { state: { username } });
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white pt-20">
      <h1 className='flex items-center justify-center text-3xl font-bold'>GitHub Contribution Tracker</h1>
      <div className='flex flex-row items-center justify-center pt-40 '>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border-2 border-gray-800 bg-gray-800 rounded-lg p-2 text-center text-white-800'
        />
        <button onClick={handleConnect}
         className='border p-2 rounded-lg'
        >Connect</button>
      </div>
    </div>
  );
};
