const Booking = require("../models/booking");
const Listing = require("../models/listing");

// Create booking
module.exports.createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Prevent owner from booking their own listing
    if (listing.owner.equals(req.user._id)) {
      req.flash("error", "You cannot book your own listing!");
      return res.redirect(`/listings/${id}`);
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      req.flash("error", "Check-out must be after check-in!");
      return res.redirect(`/listings/${id}`);
    }

    if (checkInDate < new Date()) {
      req.flash("error", "Check-in date cannot be in the past!");
      return res.redirect(`/listings/${id}`);
    }

    // Check for conflicting bookings
    const conflict = await Booking.findOne({
      listing: id,
      status: "confirmed",
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
      ],
    });

    if (conflict) {
      req.flash("error", "These dates are already booked. Please choose different dates!");
      return res.redirect(`/listings/${id}`);
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    const booking = new Booking({
      listing: id,
      user: req.user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      nights,
      totalPrice,
    });

    await booking.save();
    req.flash("success", "Booking confirmed!");
    res.redirect(`/bookings/${booking._id}`);
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

// Show booking confirmation
module.exports.showBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("listing")
      .populate("user");

    if (!booking || !booking.user._id.equals(req.user._id)) {
      req.flash("error", "Booking not found!");
      return res.redirect("/listings");
    }

    res.render("bookings/show", { booking });
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

// Show user's all bookings
module.exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.render("bookings/index", { bookings });
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

// Cancel booking
module.exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || !booking.user.equals(req.user._id)) {
      req.flash("error", "Not authorized!");
      return res.redirect("/bookings");
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Booking cancelled successfully!");
    res.redirect("/bookings");
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/bookings");
  }
};

// Owner dashboard - see all bookings for their listings
module.exports.ownerBookings = async (req, res) => {
  try {
    // Find all listings owned by current user
    const listings = await Listing.find({ owner: req.user._id });
    const listingIds = listings.map(l => l._id);

    // Find all bookings for those listings
    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate("listing")
      .populate("user")
      .sort({ createdAt: -1 });

    res.render("bookings/owner", { bookings, listings });
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};
