export const fetchUser = async (id) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};
