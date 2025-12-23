// // // const Show = require('../models/show');
// // // const Seat = require('../models/seat');
// // // const client = require('../config/redis');

// // // // 1️⃣ Get all seats for a show
// // // exports.getAllSeats = async (req, res) => {
// // //   const { showId } = req.params;
// // //   try {
// // //     const seats = await Seat.findAll({ where: { show_id: showId } });
// // //     res.json(seats);
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // };

// // // // 2️⃣ Create show + 30 seats (if not exists)
// // // exports.createShow = async (req, res) => {
// // //   try {
// // //     // Only one show exists at a time
// // //     let show = await Show.findOne();
// // //     if (!show) {
// // //       show = await Show.create({ title: 'New Show' });

// // //       const seats = [];
// // //       for (let i = 1; i <= 30; i++) {
// // //         seats.push({
// // //           show_id: show.id,
// // //           seat_number: `A${i}`,
// // //           status: 'AVAILABLE'
// // //         });
// // //       }

// // //       await Seat.bulkCreate(seats);
// // //     }

// // //     const seats = await Seat.findAll({ where: { show_id: show.id } });
// // //     res.json({ showId: show.id, seats });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // };

// // // // 3️⃣ Hold a seat
// // // exports.holdSeat = async (req, res) => {
// // //   const { showId, seatNumber, userId } = req.body;
// // //   const io = req.app.get('io');
// // //   const seatKey = `seat:${showId}:${seatNumber}`;

// // //   try {
// // //     const held = await client.get(seatKey);
// // //     if (held) return res.status(400).json({ message: 'Seat already held or booked' });

// // //     const holdExpire = new Date(Date.now() + 60 * 1000); // 1 min hold

// // //     // Set Redis hold
// // //     await client.set(seatKey, userId, { EX: 60 });

// // //     // Update DB
// // //     const [updated] = await Seat.update(
// // //       { status: 'HELD', hold_id: userId, hold_expire_at: holdExpire },
// // //       { where: { show_id: showId, seat_number: seatNumber, status: 'AVAILABLE' } }
// // //     );

// // //     if (!updated) return res.status(400).json({ message: 'Seat not available' });

// // //     io.emit('seatStatusChanged', { showId, seatNumber, status: 'HELD' });
// // //     res.json({ message: 'Seat held for 1 minute' });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // };

// // // // 4️⃣ Checkout / Confirm seat
// // // exports.checkoutSeat = async (req, res) => {
// // //   const { showId, seatNumber, userId } = req.body;
// // //   const io = req.app.get('io');
// // //   const seatKey = `seat:${showId}:${seatNumber}`;

// // //   try {
// // //     const heldBy = await client.get(seatKey);
// // //     if (heldBy !== userId) return res.status(400).json({ message: 'Seat not held by you' });

// // //     await Seat.update(
// // //       { status: 'BOOKED', hold_id: null, hold_expire_at: null },
// // //       { where: { show_id: showId, seat_number: seatNumber } }
// // //     );

// // //     await client.del(seatKey);
// // //     io.emit('seatStatusChanged', { showId, seatNumber, status: 'BOOKED' });
// // //     res.json({ message: 'Seat booked successfully' });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // };

// // // // 5️⃣ Cancel hold
// // // exports.cancelHold = async (req, res) => {
// // //   const { showId, seatNumber, userId } = req.body;
// // //   const io = req.app.get('io');
// // //   const seatKey = `seat:${showId}:${seatNumber}`;

// // //   try {
// // //     const heldBy = await client.get(seatKey);
// // //     if (heldBy !== userId) return res.status(400).json({ message: 'Seat not held by you' });

// // //     await Seat.update(
// // //       { status: 'AVAILABLE', hold_id: null, hold_expire_at: null },
// // //       { where: { show_id: showId, seat_number: seatNumber } }
// // //     );

// // //     await client.del(seatKey);
// // //     io.emit('seatStatusChanged', { showId, seatNumber, status: 'AVAILABLE' });
// // //     res.json({ message: 'Hold cancelled' });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // };



// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const API = "http://localhost:5000/api/shows";
// // const USER_ID = "user123"; // temporary user

// // function App() {
// //   const [showId, setShowId] = useState(null);
// //   const [seats, setSeats] = useState([]);

// //   // 1️⃣ Create show + seats
// //   const seedShow = async () => {
// //     const res = await axios.post(`${API}/create`);
// //     setShowId(res.data.showId);
// //     setSeats(res.data.seats);
// //   };

// //   // 2️⃣ Get seats
// //   const loadSeats = async (id) => {
// //     const res = await axios.get(`${API}/${id}/seats`);
// //     setSeats(res.data);
// //   };

// //   // 3️⃣ Hold seat
// //   const holdSeat = async (seatNumber) => {
// //     await axios.post(`${API}/hold`, {
// //       showId,
// //       seatNumber,
// //       userId: USER_ID
// //     });
// //     loadSeats(showId);
// //   };

// //   // 4️⃣ Book seat
// //   const bookSeat = async (seatNumber) => {
// //     await axios.post(`${API}/checkout`, {
// //       showId,
// //       seatNumber,
// //       userId: USER_ID
// //     });
// //     loadSeats(showId);
// //   };

// //   // 5️⃣ Cancel hold
// //   const cancelHold = async (seatNumber) => {
// //     await axios.post(`${API}/cancel`, {
// //       showId,
// //       seatNumber,
// //       userId: USER_ID
// //     });
// //     loadSeats(showId);
// //   };

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h1>🎬 BookMyShow Seat Booking</h1>

// //       {!showId && (
// //         <button onClick={seedShow}>Seed Show (Create 30 Seats)</button>
// //       )}

// //       <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginTop: 20 }}>
// //         {seats.map((seat) => (
// //           <div
// //             key={seat.id}
// //             style={{
// //               padding: 10,
// //               border: "1px solid black",
// //               background:
// //                 seat.status === "AVAILABLE"
// //                   ? "lightgreen"
// //                   : seat.status === "HELD"
// //                   ? "orange"
// //                   : "red",
// //             }}
// //           >
// //             <p>{seat.seat_number}</p>
// //             <p>{seat.status}</p>

// //             {seat.status === "AVAILABLE" && (
// //               <button onClick={() => holdSeat(seat.seat_number)}>Hold</button>
// //             )}

// //             {seat.status === "HELD" && (
// //               <>
// //                 <button onClick={() => bookSeat(seat.seat_number)}>Book</button>
// //                 <button onClick={() => cancelHold(seat.seat_number)}>Cancel</button>
// //               </>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;


// const Show = require('../models/show');
// const Seat = require('../models/seat');
// const client = require('../config/redis');
// const { Op } = require('sequelize');

// // 1️⃣ Create show + 30 seats (single shared show)
// exports.createShow = async (req, res) => {
//   try {
//     let show = await Show.findOne();

//     if (!show) {
//       show = await Show.create({ title: 'New Show' });

//       const seats = [];
//       for (let i = 1; i <= 30; i++) {
//         seats.push({
//           show_id: show.id,
//           seat_number: `A${i}`,
//           status: 'AVAILABLE'
//         });
//       }
//       await Seat.bulkCreate(seats);
//     }

//     const seats = await Seat.findAll({ where: { show_id: show.id } });
//     res.json({ showId: show.id, seats });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 2️⃣ Get all seats for a show (auto release expired holds)
// exports.getAllSeats = async (req, res) => {
//   const { showId } = req.params;

//   try {
//     // 🔥 Release expired HELD seats
//     await Seat.update(
//       { status: 'AVAILABLE', hold_id: null, hold_expire_at: null },
//       {
//         where: {
//           show_id: showId,
//           status: 'HELD',
//           hold_expire_at: { [Op.lt]: new Date() }
//         }
//       }
//     );

//     const seats = await Seat.findAll({ where: { show_id: showId } });
//     res.json(seats);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 3️⃣ Hold seat (Redis + DB)
// exports.holdSeat = async (req, res) => {
//   const { showId, seatNumber, userId } = req.body;
//   const io = req.app.get('io');
//   const seatKey = `seat:${showId}:${seatNumber}`;

//   try {
//     const locked = await client.get(seatKey);
//     if (locked) {
//       return res.status(400).json({ message: 'Seat already held or booked' });
//     }

//     const holdExpire = new Date(Date.now() + 60 * 1000);

//     await client.set(seatKey, userId, { EX: 60 });

//     const [updated] = await Seat.update(
//       { status: 'HELD', hold_id: userId, hold_expire_at: holdExpire },
//       { where: { show_id: showId, seat_number: seatNumber, status: 'AVAILABLE' } }
//     );

//     if (!updated) {
//       return res.status(400).json({ message: 'Seat not available' });
//     }

//     io.emit('seatStatusChanged', { showId, seatNumber, status: 'HELD' });
//     res.json({ message: 'Seat held for 1 minute' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 4️⃣ Book seat
// exports.checkoutSeat = async (req, res) => {
//   const { showId, seatNumber, userId } = req.body;
//   const io = req.app.get('io');
//   const seatKey = `seat:${showId}:${seatNumber}`;

//   try {
//     const heldBy = await client.get(seatKey);
//     if (heldBy !== userId) {
//       return res.status(400).json({ message: 'Seat not held by you' });
//     }

//     await Seat.update(
//       { status: 'BOOKED', hold_id: null, hold_expire_at: null },
//       { where: { show_id: showId, seat_number: seatNumber } }
//     );

//     await client.del(seatKey);
//     io.emit('seatStatusChanged', { showId, seatNumber, status: 'BOOKED' });

//     res.json({ message: 'Seat booked successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 5️⃣ Cancel hold
// exports.cancelHold = async (req, res) => {
//   const { showId, seatNumber, userId } = req.body;
//   const io = req.app.get('io');
//   const seatKey = `seat:${showId}:${seatNumber}`;

//   try {
//     const heldBy = await client.get(seatKey);
//     if (heldBy !== userId) {
//       return res.status(400).json({ message: 'Seat not held by you' });
//     }

//     await Seat.update(
//       { status: 'AVAILABLE', hold_id: null, hold_expire_at: null },
//       { where: { show_id: showId, seat_number: seatNumber } }
//     );

//     await client.del(seatKey);
//     io.emit('seatStatusChanged', { showId, seatNumber, status: 'AVAILABLE' });

//     res.json({ message: 'Hold cancelled' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const Show = require('../models/show');
const Seat = require('../models/seat');
const client = require('../config/redis');
const { Op } = require('sequelize');

// 1️⃣ Create show + 30 seats (single shared show)
exports.createShow = async (req, res) => {
  try {
    let show = await Show.findOne();

    if (!show) {
      show = await Show.create({ title: 'New Show' });

      const seats = [];
      for (let i = 1; i <= 30; i++) {
        seats.push({
          show_id: show.id,
          seat_number: `A${i}`,
          status: 'AVAILABLE'
        });
      }
      await Seat.bulkCreate(seats);
    }

    const seats = await Seat.findAll({ where: { show_id: show.id } });
    res.json({ showId: show.id, seats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 2️⃣ Get all seats for a show (auto release expired holds)
exports.getAllSeats = async (req, res) => {
  const { showId } = req.params;

  try {
    // 🔥 Release expired HELD seats
    await Seat.update(
      { status: 'AVAILABLE', hold_id: null, hold_expire_at: null },
      {
        where: {
          show_id: showId,
          status: 'HELD',
          hold_expire_at: { [Op.lt]: new Date() }
        }
      }
    );

    const seats = await Seat.findAll({ where: { show_id: showId } });
    res.json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3️⃣ Hold seat (Redis + DB)
exports.holdSeat = async (req, res) => {
  const { showId, seatNumber, userId } = req.body;
  const io = req.app.get('io');
  const seatKey = `seat:${showId}:${seatNumber}`;

  try {
    const locked = await client.get(seatKey);
    if (locked) {
      return res.status(400).json({ message: 'Seat already held or booked' });
    }

    const holdExpire = new Date(Date.now() + 60 * 1000);

    await client.set(seatKey, userId, { EX: 60 });

    const [updated] = await Seat.update(
      { status: 'HELD', hold_id: userId, hold_expire_at: holdExpire },
      { where: { show_id: showId, seat_number: seatNumber, status: 'AVAILABLE' } }
    );

    if (!updated) {
      return res.status(400).json({ message: 'Seat not available' });
    }

    io.emit('seatStatusChanged', { showId, seatNumber, status: 'HELD' });
    res.json({ message: 'Seat held for 1 minute' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 4️⃣ Book seat
exports.checkoutSeat = async (req, res) => {
  const { showId, seatNumber, userId } = req.body;
  const io = req.app.get('io');
  const seatKey = `seat:${showId}:${seatNumber}`;

  try {
    const heldBy = await client.get(seatKey);
    if (heldBy !== userId) {
      return res.status(400).json({ message: 'Seat not held by you' });
    }

    await Seat.update(
      { status: 'BOOKED', hold_id: null, hold_expire_at: null },
      { where: { show_id: showId, seat_number: seatNumber } }
    );

    await client.del(seatKey);
    io.emit('seatStatusChanged', { showId, seatNumber, status: 'BOOKED' });

    res.json({ message: 'Seat booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 5️⃣ Cancel hold
exports.cancelHold = async (req, res) => {
  const { showId, seatNumber, userId } = req.body;
  const io = req.app.get('io');
  const seatKey = `seat:${showId}:${seatNumber}`;

  try {
    const heldBy = await client.get(seatKey);
    if (heldBy !== userId) {
      return res.status(400).json({ message: 'Seat not held by you' });
    }

    await Seat.update(
      { status: 'AVAILABLE', hold_id: null, hold_expire_at: null },
      { where: { show_id: showId, seat_number: seatNumber } }
    );

    await client.del(seatKey);
    io.emit('seatStatusChanged', { showId, seatNumber, status: 'AVAILABLE' });

    res.json({ message: 'Hold cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


