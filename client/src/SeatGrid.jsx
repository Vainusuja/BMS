// // const SeatGrid = ({ seats, onSelect }) => {
// //   return (
// //     <div className="seat-grid">
// //       {seats.map((seat) => (
// //         <div
// //           key={seat.seat_number}
// //           className={`seat ${seat.status.toLowerCase()}`}
// //           onClick={() => onSelect(seat.seat_number)}
// //         >
// //           <strong>{seat.seat_number}</strong>
// //           <div>{seat.status}</div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default SeatGrid;



// function SeatGrid({ seats, onSelect }) {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 50px)", gap: "10px" }}>
//       {seats.map((seat) => (
//         <button
//           key={seat.seat_number}
//           onClick={() => onSelect(seat.seat_number)}
//           style={{
//             backgroundColor:
//               seat.status === "AVAILABLE"
//                 ? "green"
//                 : seat.status === "HELD"
//                 ? "orange"
//                 : "red",
//             color: "white",
//             padding: "10px",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           {seat.seat_number}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default SeatGrid;


function SeatGrid({ seats, onSelect }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {seats.map((seat) => (
        <div
          key={seat.seat_number}
          style={{
            width: "50px",
            height: "50px",
            lineHeight: "50px",
            textAlign: "center",
            backgroundColor:
              seat.status === "AVAILABLE"
                ? "green"
                : seat.status === "HELD"
                ? "orange"
                : "red",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => onSelect(seat.seat_number)}
        >
          {seat.seat_number}
        </div>
      ))}
    </div>
  );
}

export default SeatGrid;
