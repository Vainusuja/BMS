

// let showId = null;
// let seats = [];

// export const seedShow = () => {
//   showId = crypto.randomUUID(); // same ID for the session
//   seats = Array.from({ length: 30 }, (_, i) => ({
//     seat_number: `A${i + 1}`,
//     status: "AVAILABLE",
//   }));
//   return { showId, seats };
// };

// export const getSeats = () => seats;

// export const holdSeat = (seatNumber) => {
//   seats = seats.map((s) =>
//     s.seat_number === seatNumber && s.status === "AVAILABLE"
//       ? { ...s, status: "HELD" }
//       : s
//   );
//   return seats;
// };

// export const confirmSeat = (seatNumber) => {
//   seats = seats.map((s) =>
//     s.seat_number === seatNumber && s.status === "HELD"
//       ? { ...s, status: "BOOKED" }
//       : s
//   );
//   return seats;
// };

// export const cancelHold = (seatNumber) => {
//   seats = seats.map((s) =>
//     s.seat_number === seatNumber && s.status === "HELD"
//       ? { ...s, status: "AVAILABLE" }
//       : s
//   );
//   return seats;
// };



import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/shows",
});

export const seedShow = async () => {
  const { data } = await API.post("/create");
  return data; // { showId, seats }
};

export const getSeats = async (showId) => {
  const { data } = await API.get(`/${showId}`);
  return data; // array of seats
};

export const holdSeat = async (showId, seatNumber, userId) => {
  const { data } = await API.post("/hold", { showId, seatNumber, userId });
  return data;
};

export const confirmSeat = async (showId, seatNumber, userId) => {
  const { data } = await API.post("/checkout", { showId, seatNumber, userId });
  return data;
};

export const cancelHold = async (showId, seatNumber, userId) => {
  const { data } = await API.post("/cancel", { showId, seatNumber, userId });
  return data;
};
