import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { api } from '../api/api';

interface ContributionDay {
  date: string;
  contributionCount: number;
}

export const StreakTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  useEffect(() => {
    // Retrieve the username from state or localStorage
    const stateUsername = location.state?.username;
    const storedUsername = localStorage.getItem('githubUsername');
    const user = stateUsername || storedUsername;

    if (user) {
      setUsername(user);
      fetchContributions(user);
      navigate('/dashboard');
    } else {
      // If no username is available, redirect back to the Home page
      navigate('/');
    }
  }, [location.state, navigate]);

   const logout = () => {
       localStorage.removeItem('githubUsername');
       navigate('/home');
   }
  const fetchContributions = async (user: string) => {
    try {
      const response = await api.get(`/streak?username=${user}`);
      setContributions(response.data.contributionDays || []);
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  const heatmapValues = contributions.map((day) => ({
    date: day.date,
    count: day.contributionCount,
  }));

  const startDate = contributions.length > 0 ? contributions[contributions.length - 1].date : '';
  const endDate = contributions.length > 0 ? contributions[0].date : '';

  return (
    <div className='w-full h-screen bg-gray-900 text-white pt-20'>

       <div className='flex justify-center items-center text-3xl font-bold'>
            Your Daily contribution
          </div>
        <div className='flex flex-row items-center justify-between px-12 py-10 '>
         <h1 className='flex text-xl'>GitHub Contributions of <p className='text-green-500 pl-4 font-bold'>
            {username}
            </p></h1>
         <button onClick={logout}
          className='border border-gray-800 bg-gray-800 rounded-lg p-2 text-center text-white-800'
         >Logout</button>
        </div>

      {contributions.length > 0 ? (
        <ReactCalendarHeatmap
          startDate={startDate ? new Date(startDate) : new Date()}
          endDate={endDate ? new Date(endDate) : new Date()}
          values={heatmapValues}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return `color-scale-${Math.min(value.count, 4)}`;
          }}
        />
      ) : (
        <p>Loading contributions or no contributions available.</p>
      )}
    </div>
  );
};
