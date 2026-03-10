import { Router } from "express";
import itemsRoutes from "./modules/items/itemsRoutes.js";
<<<<<<< DB_users_Victor
import usersRoutes from "./modules/users/usersRoutes.js";
=======
import ticketsRoutes from "./modules/tickets/ticketsRoutes.js";
>>>>>>> dev

const router = Router();

router.use("/api/items", itemsRoutes);
<<<<<<< DB_users_Victor
router.use("/api/users", usersRoutes);
=======
router.use("/api/tickets", ticketsRoutes);
>>>>>>> dev

export default router;
