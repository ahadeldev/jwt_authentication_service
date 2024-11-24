import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import logger from "./middlewares/logger.js";
import routeNotFound from "./middlewares/notfound.js";
import errorHandler from "./middlewares/errorhandler.js";

dotenv.config();
const PORT = process.env.PORT || 8001;
const app = express()

app.use(express.json());
app.use(logger);

app.use("/api/v1/auth", authRoutes);

// Routes not found middleware.
app.use(routeNotFound);

// Custome error handler middleware.
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`==> Server running on port: ${PORT}`);
})