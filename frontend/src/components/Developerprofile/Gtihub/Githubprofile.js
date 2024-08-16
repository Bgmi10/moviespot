import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/core';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Githubmainprofile } from './Githubmainprofile';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Githubprofile = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyRepos, setEmptyRepos] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const octokit = new Octokit({
          auth: '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', // Use your environment variable for the token
        });

        // Fetch repositories of the authenticated user
        const reposResponse = await octokit.request('GET /user/repos', {
          type: 'owner',
          sort: 'updated',
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        });

        const reposData = reposResponse.data;

        // Fetch commits for each repository
        const commitsPromises = reposData.map(async (repo) => {
          try {
            const commitsResponse = await octokit.request('GET /repos/{owner}/{repo}/commits', {
              owner: repo.owner.login,
              repo: repo.name,
              per_page: 100, // Adjust per_page as needed
              headers: {
                'X-GitHub-Api-Version': '2022-11-28',
              },
            });

            if (commitsResponse.data.length === 0) {
              setEmptyRepos(prev => [...prev, repo.name]); // Track empty repositories
              return null;
            }

            return commitsResponse.data.map(commit => ({
              date: new Date(commit.commit.author.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
            }));
          } catch (err) {
            // Handle specific errors for each repository
            console.error(`Error fetching commits for repository ${repo.name}:`, err);
            return null;
          }
        });

        const commits = (await Promise.all(commitsPromises)).flat().filter(Boolean);

        if (commits.length === 0) {
          throw new Error('No commits found in any repository.');
        }

        // Aggregate commits by date
        const dateCount = commits.reduce((acc, commit) => {
          acc[commit.date] = (acc[commit.date] || 0) + 1;
          return acc;
        }, {});

        // Prepare data for chart
        const dates = Object.keys(dateCount).sort();
        const counts = dates.map(date => dateCount[date]);

        setChartData({
          labels: dates,
          datasets: [{
            label: 'Commits per Day',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light green color
            borderColor: 'rgba(75, 192, 192, 1)', // Darker green color
            borderWidth: 1,
          }],
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Githubmainprofile />
      <h1>Contribution Timeline</h1>
      {emptyRepos.length > 0 && (
        <div>
          <h2>Repositories with No Commits:</h2>
          <ul>
            {emptyRepos.map((repo, index) => (
              <li key={index}>{repo}</li>
            ))}
          </ul>
        </div>
      )}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `Commits: ${context.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Commits',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};
