export const getFavorites = (): number[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { return []; }
};
export const setFavorites = (ids: number[]) => localStorage.setItem("favorites", JSON.stringify(ids));
export const toggleFavorite = (id: number) => {
  const f = getFavorites();
  const next = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
  setFavorites(next);
  return next;
};

export type Booking = { id: string; workspaceId: number; date: string; createdAt: string };
export const getBookings = (): Booking[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("bookings") || "[]"); } catch { return []; }
};
export const addBooking = (workspaceId: number, date: string) => {
  const list = getBookings();
  const b: Booking = { id: crypto.randomUUID(), workspaceId, date, createdAt: new Date().toISOString() };
  list.push(b);
  localStorage.setItem("bookings", JSON.stringify(list));
  return b;
};
export const removeBooking = (id: string) => {
  const list = getBookings().filter((b) => b.id !== id);
  localStorage.setItem("bookings", JSON.stringify(list));
  return list;
};
