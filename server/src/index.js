import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { arcjetMiddleware } from "./middleware/arcjet.mw.js";
import { getWebURL } from "./lib/utils/urlGenerator.js";

// Schemas
import { UserIDSchema } from "./schemas/users.schemas.js";

// Middleware
import { authAPIKey, authUser } from "./middleware/auth.mw.js";
import { paramsValidator } from "./middleware/validators.js";

// Routers
import storiesRouter from "./routes/stories.routes.js";
import usersRouter from "./routes/users.routes.js";
import userStoriesRouter from "./routes/user.stories.routes.js";

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

// Landing Page Route
app.get("/", (req, res) => {
  res.send("BranchBound API Server is Up and Running !");
});

// Arcjet Middleware
app.use(arcjetMiddleware);

// Internal API Key Middleware
app.use(authAPIKey(process.env.INTERNAL_API_KEY));

// ---- API Routes ----

// Routes for Stories
app.use(`/v${API_VERSION}/api/stories`, storiesRouter);

// Routes for Users
app.use(`/v${API_VERSION}/api/users`, usersRouter);

// Routes for User Stories
app.use(
  `/v${API_VERSION}/api/users/:uid/stories`,
  paramsValidator(UserIDSchema),
  authUser,
  userStoriesRouter
);

// PORT and Sever
const server = http.createServer(app);
server.listen(PORT || 8000, () => {
  console.log(`CORS Enabled Server, Listening to port: ${PORT || 8000}...`);
});

export default server;
