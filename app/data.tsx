// src/app/data.tsx
export const fetchRooms = async () => {
  const response = await fetch(`/api/room/index`);

  if (!response.ok) {
    throw new Error('Failed to fetch rooms');
  }

  return response.json();
};
