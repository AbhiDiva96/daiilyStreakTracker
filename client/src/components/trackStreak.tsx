import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Access state and navigation
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Heatmap styles
import { api } from '../api/api'; // API helper for backend requests

interface ContributionDay {
  date: string;
  contributionCount: number;
}

export const StreakTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [contributions, setContributions] = useState<ContributionDay[]>([]); // State for contributions
  const username = location.state?.username; // Retrieve the username from the state passed via navigation

  useEffect(() => {
    if (!username) {
      // Redirect back to Home if no username is provided
      alert('No username provided. Redirecting back to Home...');
      navigate('/');
      return;
    }

    // Fetch user data if username exists
    const fetchContributions = async () => {
      try {
        const response = await api.get(`/streak?username=${username}`);
        setContributions(response.data.contributionDays || []);
      } catch (error) {
        console.error('Error fetching contributions:', error);
        alert('Failed to fetch contributions. Redirecting back to Home...');
        navigate('/');
      }
    };

    fetchContributions();
  }, [username, navigate]);

  const heatmapValues = contributions.map((day) => ({
    date: day.date,
    count: day.contributionCount,
  }));

  const startDate = contributions.length > 0 ? contributions[contributions.length - 1].date : '';
  const endDate = contributions.length > 0 ? contributions[0].date : '';

  return (
    <div className="Dashboard">
      <h1>GitHub Contributions for {username}</h1>
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
