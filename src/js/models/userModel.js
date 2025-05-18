export function fetchUsers() {
  return fetch("/api/users")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}
