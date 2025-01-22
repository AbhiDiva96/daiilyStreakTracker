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
    <div>
      <h1>GitHub Contributions for {username}</h1>

        <button onClick={logout}>Logout</button>
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
