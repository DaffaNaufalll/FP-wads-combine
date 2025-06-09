const apiUrl = process.env.REACT_APP_API_URL;

export function getTickets() {
  const token = localStorage.getItem("token");
  return fetch(`${apiUrl}api/tickets`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }).then(res => res.json());
}

// You can add more API functions here as needed, using the same pattern.