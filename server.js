import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { UserRouter, PostRouter, CommentRouter } from "./api/routes/index.js";

import "dotenv/config.js";

// Connect with Mongo DB atlas

const dbURI = process.env.DB_URI;

await mongoose
  .connect(dbURI)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));

// Server creation

const app = express();

// Middleware
// const corsOptions = {
//   origin: "https://eco-conciencia.netlify.app",
//   optionsSuccessStatus: 200,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type,Authorization",
// };
app.use(cors());
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json());

// Define routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", PostRouter);
app.use("/api/v1", CommentRouter);

app.use("/api/v1", (req, res) => {
  res.send("EcoConciencia API is running");
});

// Server initialization

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
