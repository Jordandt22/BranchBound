import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { arcjetMiddleware } from "./middleware/arcjet.mw.js";
import { getWebURL } from "./utils/urlGenerator.js";
import { authAPIKey } from "./middleware/auth.mw.js";

// Routers
import storiesRouter from "./routes/stories.routes.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

// Middleware
const { NODE_ENV, API_VERSION, PORT } = process.env;
app.use(helmet());
app.use(
  cors({
    origin: getWebURL(),
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.enable("trust proxy");
  app.set("trust proxy", 1);
}

// Arcjet Middleware
app.use(arcjetMiddleware);

// Landing Page Route
app.get("/", (req, res) => {
  res.send("BranchBound API Server is Up and Running !");
});

// ---- API Routes ----

// Routes for Stories
app.use(
  `/v${API_VERSION}/api/stories`,
  authAPIKey(process.env.INTERNAL_API_KEY),
  storiesRouter
);

// Routes for Users
app.use(`/v${API_VERSION}/api/users`, usersRouter);

// PORT and Sever
const server = http.createServer(app);
server.listen(PORT || 8000, () => {
  console.log(`CORS Enabled Server, Listening to port: ${PORT || 8000}...`);
});

export default server;
