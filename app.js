// CricAPI Key (replace with your key)
const API_KEY = 'bc32eef6-fdf2-481d-a1c2-403512e18aad';
const API_URL = 'https://cricapi.com/api/matches';

// Function to fetch live scores
const fetchLiveScores = async () => {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&status=LIVE`);
        const data = await response.json();
        
        // If API returns data
        if (data.matches) {
            const matches = data.matches;
            const scoreList = document.getElementById('live-scores');
            scoreList.innerHTML = ''; // Clear previous scores
            
            matches.forEach(match => {
                const matchItem = document.createElement('div');
                matchItem.classList.add('score-item');
                
                matchItem.innerHTML = `
                    <h3>${match.team1} vs ${match.team2}</h3>
                    <p>Status: ${match.status}</p>
                    <p>Score: ${match.score}</p>
                    <p>Match Type: ${match.type}</p>
                `;
                
                scoreList.appendChild(matchItem);
            });
        } else {
            document.getElementById('live-scores').innerHTML = '<p>No live matches at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('live-scores').innerHTML = '<p>Failed to fetch scores. Please try again later.</p>';
    }
};

// Refresh button functionality
document.getElementById('refresh-btn').addEventListener('click', fetchLiveScores);

// Fetch live scores on page load
window.onload = fetchLiveScores;
