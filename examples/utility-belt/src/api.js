export const fetchConcerts = async (bandName) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?bandName=${bandName}`,
  );
  return response.json();
};
