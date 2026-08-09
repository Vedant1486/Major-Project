const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

router.post("/listings/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));
router.get("/bookings", isLoggedIn, wrapAsync(bookingController.myBookings));
router.get("/bookings/owner-dashboard", isLoggedIn, wrapAsync(bookingController.ownerBookings));
router.get("/bookings/:id", isLoggedIn, wrapAsync(bookingController.showBooking));
router.post("/bookings/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
