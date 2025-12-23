


// // import { useState } from "react";
// // import SeatGrid from "./SeatGrid";
// // import { seedShow, getSeats, holdSeat, confirmSeat, cancelHold } from "./api";

// // function App() {
// //   const [showId, setShowId] = useState("");
// //   const [seats, setSeats] = useState([]);
// //   const [selectedSeat, setSelectedSeat] = useState("");
// //   const [name, setName] = useState("");
// //   const [status, setStatus] = useState("");

// //   const handleSeed = () => {
// //     const data = seedShow();
// //     setShowId(data.showId);
// //     setSeats(data.seats);
// //     setStatus("Show created with 30 seats");
// //   };

// //   const handleRefresh = () => setSeats(getSeats());

// //   const handleHold = () => {
// //     if (!selectedSeat) return alert("Select a seat!");
// //     setSeats(holdSeat(selectedSeat));
// //     setStatus(`Seat ${selectedSeat} HELD`);
// //   };

// //   const handleConfirm = () => {
// //     if (!selectedSeat) return alert("Select a seat!");
// //     setSeats(confirmSeat(selectedSeat));
// //     setStatus(`Seat ${selectedSeat} BOOKED`);
// //   };

// //   const handleCancel = () => {
// //     if (!selectedSeat) return alert("Select a seat!");
// //     setSeats(cancelHold(selectedSeat));
// //     setStatus(`Seat ${selectedSeat} AVAILABLE`);
// //   };

// //   return (
// //     <div className="container" style={{ padding: "20px", fontFamily: "Arial" }}>
// //       <h1>Book My Show</h1>

// //       <div className="actions" style={{ marginBottom: "20px" }}>
// //         <button onClick={handleSeed} style={{ marginRight: "10px" }}>
// //           Seed Show + 30 Seats
// //         </button>
// //         <button onClick={handleRefresh}>Refresh Seats</button>
// //       </div>

// //       <div className="form" style={{ marginBottom: "20px" }}>
// //         <label>Show ID:</label>
// //         <input value={showId} readOnly style={{ marginLeft: "10px", marginBottom: "10px" }} />

// //         <br />
// //         <label>Seat:</label>
// //         <select
// //           onChange={(e) => setSelectedSeat(e.target.value)}
// //           style={{ marginLeft: "10px", marginBottom: "10px" }}
// //         >
// //           <option value="">Select</option>
// //           {seats.map((s) => (
// //             <option key={s.seat_number} value={s.seat_number}>
// //               {s.seat_number} ({s.status})
// //             </option>
// //           ))}
// //         </select>

// //         <br />
// //         <label>Name:</label>
// //         <input
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           style={{ marginLeft: "10px" }}
// //         />
// //       </div>

// //       <div className="buttons" style={{ marginBottom: "20px" }}>
// //         <button onClick={handleHold} style={{ marginRight: "10px" }}>
// //           Checkout (Hold Seat)
// //         </button>
// //         <button onClick={handleConfirm} style={{ marginRight: "10px" }}>
// //           Confirm (Mock Payment)
// //         </button>
// //         <button onClick={handleCancel}>Cancel Hold</button>
// //       </div>

// //       <p>
// //         <strong>Status:</strong> {status}
// //       </p>

// //       <h3>All Seats</h3>
// //       <SeatGrid seats={seats} onSelect={setSelectedSeat} />
// //     </div>
// //   );
// // }

// // export default App;



// import { useEffect, useState } from "react";
// import SeatGrid from "./SeatGrid";
// import socket from "./socket";
// import { seedShow, getSeats, holdSeat, confirmSeat, cancelHold } from "./api";

// function App() {
//   const [showId, setShowId] = useState("");
//   const [seats, setSeats] = useState([]);
//   const [selectedSeat, setSelectedSeat] = useState("");
//   const [name, setName] = useState("");
//   const [status, setStatus] = useState("");
//   const [userId] = useState(crypto.randomUUID());

//   // Listen for real-time seat updates
//   useEffect(() => {
//     socket.on("seatStatusChanged", ({ showId: sId, seatNumber, status }) => {
//       if (sId !== showId) return;
//       setSeats((prev) =>
//         prev.map((seat) =>
//           seat.seat_number === seatNumber ? { ...seat, status } : seat
//         )
//       );
//     });

//     return () => socket.off("seatStatusChanged");
//   }, [showId]);

//   const handleSeed = async () => {
//     const data = await seedShow();
//     setShowId(data.showId);
//     setSeats(data.seats);
//     setStatus("Show created / loaded with 30 seats");
//   };

//   const handleRefresh = async () => {
//     if (!showId) return;
//     const data = await getSeats(showId);
//     setSeats(data);
//     setStatus("Seats refreshed");
//   };

//   const handleHold = async () => {
//     if (!selectedSeat || !name) return alert("Select a seat and enter name");
//     try {
//       await holdSeat(showId, selectedSeat, userId);
//       setStatus(`Seat ${selectedSeat} HELD`);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error holding seat");
//     }
//   };

//   const handleConfirm = async () => {
//     if (!selectedSeat) return alert("Select a seat");
//     try {
//       await confirmSeat(showId, selectedSeat, userId);
//       setStatus(`Seat ${selectedSeat} BOOKED`);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error booking seat");
//     }
//   };

//   const handleCancel = async () => {
//     if (!selectedSeat) return alert("Select a seat");
//     try {
//       await cancelHold(showId, selectedSeat, userId);
//       setStatus(`Seat ${selectedSeat} AVAILABLE`);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error cancelling hold");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Book My Show</h1>

//       <div className="actions">
//         <button onClick={handleSeed}>Seed / Load Show</button>
//         <button onClick={handleRefresh}>Refresh Seats</button>
//       </div>

//       <div className="form">
//         <label>Show ID:</label>
//         <input value={showId}  />

//         <label>Seat:</label>
//         <select onChange={(e) => setSelectedSeat(e.target.value)}>
//           <option value="">Select</option>
//           {seats.map((s) => (
//             <option key={s.seat_number} value={s.seat_number}>
//               {s.seat_number} ({s.status})
//             </option>
//           ))}
//         </select>

//         <label>Name:</label>
//         <input value={name} onChange={(e) => setName(e.target.value)} />
//       </div>

//       <div className="buttons">
//         <button onClick={handleHold}>Checkout (Hold Seat)</button>
//         <button onClick={handleConfirm}>Confirm (Book Seat)</button>
//         <button onClick={handleCancel}>Cancel Hold</button>
//       </div>

//       <p><strong>Status:</strong> {status}</p>

//       <h3>All Seats</h3>
//       <SeatGrid seats={seats} onSelect={setSelectedSeat} />
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import SeatGrid from "./SeatGrid";
import socket from "./socket";
import {
  seedShow,
  getSeats,
  holdSeat,
  confirmSeat,
  cancelHold
} from "./api";

function App() {
  const [showId, setShowId] = useState("");
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [userId] = useState(crypto.randomUUID());

  // 🔴 Listen for real-time seat updates
  useEffect(() => {
    socket.on("seatStatusChanged", ({ showId: sId, seatNumber, status }) => {
      if (String(sId) !== String(showId)) return;

      setSeats((prev) =>
        prev.map((seat) =>
          seat.seat_number === seatNumber
            ? { ...seat, status }
            : seat
        )
      );
    });

    return () => socket.off("seatStatusChanged");
  }, [showId]);

  // 🟢 Admin/Test: Seed new show
  const handleSeed = async () => {
    try {
      const data = await seedShow();
      setShowId(String(data.showId));
      setSeats(data.seats);
      setStatus(`Show ${data.showId} created with 30 seats`);
    } catch (err) {
      alert("Error seeding show");
    }
  };

  // 🔵 User: Load seats for entered Show ID
  const handleRefresh = async () => {
    if (!showId) return alert("Enter Show ID");
    try {
      const data = await getSeats(showId);
      setSeats(data);
      setStatus(`Seats loaded for Show ${showId}`);
    } catch (err) {
      alert("Invalid Show ID or no seats found");
    }
  };

  // 🟡 Hold seat
  const handleHold = async () => {
    if (!selectedSeat || !name)
      return alert("Select seat and enter name");

    try {
      await holdSeat(showId, selectedSeat, userId);
      setStatus(`Seat ${selectedSeat} HELD`);
    } catch (err) {
      alert(err.response?.data?.message || "Error holding seat");
    }
  };

  // 🟢 Confirm booking
  const handleConfirm = async () => {
    if (!selectedSeat) return alert("Select seat");

    try {
      await confirmSeat(showId, selectedSeat, userId);
      setStatus(`Seat ${selectedSeat} BOOKED`);
    } catch (err) {
      alert(err.response?.data?.message || "Error booking seat");
    }
  };

  // 🔴 Cancel hold
  const handleCancel = async () => {
    if (!selectedSeat) return alert("Select seat");

    try {
      await cancelHold(showId, selectedSeat, userId);
      setStatus(`Seat ${selectedSeat} AVAILABLE`);
    } catch (err) {
      alert(err.response?.data?.message || "Error cancelling hold");
    }
  };

  return (
    <div className="container">
      <h1>🎬 Book My Show</h1>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={handleSeed}>Seed / Create Show</button>
        <button onClick={handleRefresh} disabled={!showId}>
          Load Seats
        </button>
      </div>

      {/* FORM */}
      <div className="form">
        <label>Show ID:</label>
        <input
          value={showId}
          onChange={(e) => setShowId(e.target.value)}
          placeholder="Enter Show ID"
        />

        <label>Seat:</label>
        <select
          value={selectedSeat}
          onChange={(e) => setSelectedSeat(e.target.value)}
        >
          <option value="">Select</option>
          {seats.map((s) => (
            <option
              key={s.seat_number}
              value={s.seat_number}
              disabled={s.status !== "AVAILABLE"}
            >
              {s.seat_number} ({s.status})
            </option>
          ))}
        </select>

        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
      </div>

      {/* BUTTONS */}
      <div className="buttons">
        <button onClick={handleHold}>Checkout (Hold)</button>
        <button onClick={handleConfirm}>Confirm Booking</button>
        <button onClick={handleCancel}>Cancel Hold</button>
      </div>

      {/* STATUS */}
      <p>
        <strong>Status:</strong> {status}
      </p>

      {/* GRID */}
      <h3>All Seats</h3>
      <SeatGrid seats={seats} onSelect={setSelectedSeat} />
    </div>
  );
}

export default App;
