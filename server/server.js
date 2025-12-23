// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const sequelize = require('./config/db');
// const showRoutes = require('./routes/showRoutes');
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: { origin: "*" }  // allow your frontend origin here
// });

// // Make io accessible in routes/controllers
// app.set('io', io);

// app.use('/api/shows', showRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize.sync({ alter: true }).then(() => {
//   httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('New user connected:', socket.id);

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const showRoutes = require('./routes/showRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("joinShow", (showId) => {
    socket.join(`show_${showId}`);
    console.log(`User joined show_${showId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

app.use('/api/shows', showRoutes);

sequelize.sync().then(() => {
  httpServer.listen(5000, () => {
    console.log("✅ Server running on port 5000");
  });
});
