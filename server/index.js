const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();

const db = require('./models'); 

const postsRouter = require('./routes/Posts');
app.use("/posts", postsRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port 3001");
  })
}).catch((err) => {
    console.error("Failed to sync database:", err);
});

