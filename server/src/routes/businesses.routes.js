import { Router } from "express";
import {
  getFeaturedBusinesses,
  getBusiness,
  getSearchedBusinesses,
} from "../controllers/businesses.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import {
  BusinessSlugSchema,
  SearchBusinessesSchema,
} from "../schemas/businesses.schemas.js";
import { paginationSchema } from "../schemas/query.schemas.js";
import {
  paramsValidator,
  queryValidator,
  bodyValidator,
} from "../middleware/validators.js";

const businessesRouter = Router();

// Get Featured Businesses
// businessesRouter.get(
//   "/featured",
//   serverErrorCatcherWrapper(getFeaturedBusinesses)
// );




export default businessesRouter;
