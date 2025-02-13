// Use CORS proxy to bypass the CORS error
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

// Replace with your CricAPI key
const apiKey = 'YOUR_CRICAPI_KEY';
const liveMatchesUrl = `${corsProxy}https://cricapi.com/api/matches?apikey=${apiKey}&status=LIVE`; // Fetch live matches
const pastMatchesUrl = `${corsProxy}https://cricapi.com/api/matches?apikey=${apiKey}&status=COMPLETED`; // Fetch completed matches

async function fetchMatchData(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from API. Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Log API response for debugging
        console.log('API Response:', data);

        // Check if matches are available
        if (data.matches && data.matches.length > 0) {
            const matchData = data.matches.map(match => {
                let matchStatusClass = 'match-pending'; // Default status

                if (match.status === 'Match completed') {
                    matchStatusClass = 'match-completed';
                } else if (match.status === 'In progress') {
                    matchStatusClass = 'match-in-progress';
                }

                return `
                    <div class="match ${matchStatusClass}">
                        <div class="match-header">
                            <strong>${match.team1}</strong> vs <strong>${match.team2}</strong>
                        </div>
                        <div class="match-status">${match.status}</div>
                        <div class="match-score">${match.score || 'No score available'}</div>
                    </div>
                `;
            }).join('');
            
            document.getElementById(containerId).innerHTML = matchData;
        } else {
            document.getElementById(containerId).innerHTML = '<p class="error-message">No matches found.</p>';
        }
    } catch (error) {
        console.error('Error fetching match data:', error); // Log error to console
        document.getElementById(containerId).innerHTML = '<p class="error-message">Error fetching match data. Please try again later.</p>';
    }
}

// Fetch live and past match data
fetchMatchData(liveMatchesUrl, 'live-scores');
fetchMatchData(pastMatchesUrl, 'past-scores');

// Refresh scores every 30 seconds
setInterval(() => {
    fetchMatchData(liveMatchesUrl, 'live-scores');
    fetchMatchData(pastMatchesUrl, 'past-scores');
}, 30000);
