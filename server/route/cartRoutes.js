import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  syncCart,
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.route("/").post(auth, addToCart).get(auth, getCart);
cartRouter.route("/sync").post(auth, syncCart);
cartRouter.route("/clear").delete(auth, clearCart);
cartRouter
  .route("/:partId")
  .put(auth, updateCartItem)
  .delete(auth, removeFromCart);

import admin from "../middleware/Admin.js";
import { cleanupStaleCarts } from "../controllers/cartController.js";

cartRouter.delete("/admin/cleanup", auth, admin, cleanupStaleCarts);

export default cartRouter;
