# 🌍 Wanderlust

A full-stack Airbnb-inspired travel listing platform where users can discover, list, and book unique accommodations around the world.

🔗 **Live Demo:** [https://major-project-delta-gilt.vercel.app](https://major-project-delta-gilt.vercel.app)

---

## ✨ Features

- 🔐 **User Authentication** — Sign up, login, logout with Passport.js
- 🏠 **Listings CRUD** — Create, read, update, and delete property listings
- 🔍 **Search** — Search listings by title, location, country, or description
- 🗂️ **Category Filter** — Filter by Trending, Mountains, Castles, Camping, and more
- 📅 **Booking System** — Book listings with check-in/check-out dates and live price calculator
- 👤 **My Bookings** — View and cancel your bookings
- 🏡 **Owner Dashboard** — Owners can see all guest bookings, revenue stats, and details
- ⭐ **Reviews & Ratings** — Leave star ratings and comments on listings
- 🗺️ **Interactive Maps** — Mapbox-powered location maps on every listing
- ☁️ **Image Upload** — Cloudinary-based image storage with Multer
- 📱 **Responsive Design** — Fully mobile-friendly across all screen sizes
- 🔔 **Flash Messages** — Auto-dismissing success/error notifications

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Frontend | EJS, Bootstrap 5, CSS3 |
| Authentication | Passport.js, passport-local-mongoose |
| File Upload | Cloudinary, Multer |
| Maps | Mapbox GL JS |
| Sessions | express-session, connect-mongo |
| Validation | Joi |
| Deployment | Vercel |

---

## 📁 Project Structure

```
MAJORPROJECT/
├── controllers/
│   ├── listings.js       # Listing CRUD + search + filter logic
│   ├── reviews.js        # Review create/delete logic
│   ├── users.js          # Login/signup/logout logic
│   └── bookings.js       # Booking create/cancel/owner dashboard
├── models/
│   ├── listing.js        # Listing schema with geo data
│   ├── review.js         # Review schema
│   ├── user.js           # User schema with passport
│   └── booking.js        # Booking schema
├── routes/
│   ├── listing.js        # /listings routes
│   ├── review.js         # /listings/:id/reviews routes
│   ├── user.js           # /login, /signup, /logout routes
│   └── booking.js        # /bookings routes
├── views/
│   ├── layouts/          # Boilerplate layout
│   ├── listings/         # Index, show, new, edit pages
│   ├── bookings/         # Booking show, index, owner dashboard
│   ├── users/            # Login, signup pages
│   └── includes/         # Navbar, footer, flash messages
├── public/
│   ├── css/style.css     # Custom styles
│   └── js/               # Map and client scripts
├── middleware.js          # Auth, ownership, validation middleware
├── schema.js              # Joi validation schemas
├── cloudConfig.js         # Cloudinary configuration
└── app.js                 # Main server entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vedant1486/Major-Project.git
   cd Major-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_token
   PORT=3000
   ```

4. **Run the application**
   ```bash
   node app.js
   ```
   Or with auto-restart:
   ```bash
   nodemon app.js
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `ATLASDB_URL` | MongoDB Atlas connection string |
| `SECRET` | Session secret key |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox public access token |
| `PORT` | Server port (default: 3000) |

---

## 🔒 Security

- Passwords hashed with bcrypt via passport-local-mongoose
- HTTP-only session cookies
- Input validation with Joi
- Authorization checks on all protected routes
- Environment variables for all sensitive credentials

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is for educational purposes.

---

## 👤 Author

**Vedant Lawange**
- GitHub: [@Vedant1486](https://github.com/Vedant1486)
