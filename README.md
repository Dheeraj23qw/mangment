
# 🎟️ EventManager – Event Management & Registration Platform  

*A full-stack web application for managing and attending events*

**EventManager** is a modern, role-based **event management system** that allows **organizers** to create and manage events while **users** can browse, register, and track them in real time.  
It is designed to be fast, scalable, and easy to use for both event creators and attendees.

---

<div align="center">
  <h3>Core Experience</h3>
  <table style="width: 100%;">
    <tr>
      <td width="33.3%"><img src="screenshots/home.png" alt="Home"><br><sub><b>Home Page</b></sub></td>
      <td width="33.3%"><img src="screenshots/login.png" alt="Login"><br><sub><b>Login</b></sub></td>
      <td width="33.3%"><img src="screenshots/signup.png" alt="Signup"><br><sub><b>Sign Up</b></sub></td>
    </tr>
  </table>

  <h3>Event Creation & Discovery</h3>
  <table style="width: 100%;">
    <tr>
      <td width="33.3%"><img src="screenshots/eventcreate.png" alt="Create Event"><br><sub><b>Create Event</b></sub></td>
      <td width="33.3%"><img src="screenshots/eventform.png" alt="Event Form"><br><sub><b>Details Form</b></sub></td>
      <td width="33.3%"><img src="screenshots/searchevent.png" alt="Search"><br><sub><b>Search Events</b></sub></td>
    </tr>
  </table>

  <h3>Management & Payments</h3>
  <table style="width: 100%;">
    <tr>
      <td width="25%"><img src="screenshots/my_creation.png" alt="My Creation"><br><sub><b>My Events</b></sub></td>
      <td width="25%"><img src="screenshots/mybooking.png" alt="My Booking"><br><sub><b>My Bookings</b></sub></td>
      <td width="25%"><img src="screenshots/payment.png" alt="Payment"><br><sub><b>Checkout</b></sub></td>
      <td width="25%"><img src="screenshots/history.png" alt="History"><br><sub><b>History</b></sub></td>
    </tr>
  </table>

  <h3>UI Components</h3>
  <table style="width: 100%;">
    <tr>
      <td width="33.3%"><img src="screenshots/sidebar.png" alt="Sidebar"><br><sub><b>Sidebar Menu</b></sub></td>
      <td width="33.3%"><img src="screenshots/joinevent.png" alt="Join"><br><sub><b>Join Event UI</b></sub></td>
      <td width="33.3%"><img src="screenshots/notfound.png" alt="404"><br><sub><b>404 Error Page</b></sub></td>
    </tr>
  </table>
</div>




## 🚀 Key Features  

### 🧑‍💼 1. Organizer Dashboard  
Organizers can:
- Create, update, and delete events  
- Upload event images & banners  
- View how many users have registered in real time  
- Manage event details from a single dashboard  

### 👥 2. User Experience  
Users can:
- Browse all available events  
- View full event details  
- Register for events  
- See live registration counts  

### 🔐 3. Authentication System  
- Secure user login & signup  
- Role-based access (Organizer / User)  
- Protected routes and dashboards  

### 📊 4. Real-Time Registration Updates  
- Event pages update automatically as users register  
- Organizers can see growing interest live  

### 🔔 5. Notification System *(In Progress)*  
- Upcoming event reminders  
- Registration deadline alerts  

---

## 🛠️ Tech Stack  

| Category  | Technologies Used |
|---------|------------------|
| Frontend | React.js, tailwind, Swiper.js, Firebase |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth & Forms | React Hook Form, Firebase Auth |
| File Uploads | Multer, Cloudinary |
| API & Networking | Axios |
| Utilities | Morgan, Dotenv, CORS |

---

## 📦 Frontend Dependencies  

```json
{
  "axios": "^1.7.7",
  "bootstrap": "^5.3.3",
  "firebase": "^12.7.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.53.0",
  "react-router-dom": "^6.26.2",
  "swiper": "^12.0.3"
}
```

---

## 🧱 Backend Dependencies  

```json
{
  "bcryptjs": "^2.4.3",
  "cloudinary": "^2.8.0",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "mongoose": "^8.7.0",
  "morgan": "^1.10.1",
  "multer": "^2.0.2",
  "multer-storage-cloudinary": "^4.0.0",
  "nodemon": "^3.1.7"
}
```

---

## 📁 Project Structure  

```
eventmanager/
├── fronted/              # React Frontend
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── ...
├── backend/              # Node.js + Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
├── .env
├── README.md
└── package.json
```

---

## ⚙️ Getting Started  

### Prerequisites  
- Node.js v20+  
- MongoDB (local or Atlas)  


---

### Installation  

```bash
# Clone repository
git clone https://github.com/your-username/eventmanager.git
cd eventmanager

# Setup frontend
cd fronted
npm install
npm run dev

# Setup backend
cd backend
npm install
nodemon
```

---

### Environment Variables  

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_url
port = 4001
```

---

## 🧩 Future Enhancements  

- 🔔 Complete notification system  
- 💳 Payment integration for paid events  
- 📱 Mobile-friendly UI improvements  
- 🎫 QR-code based event check-in  
- 📊 Organizer analytics dashboard  

---

## 🏁 Conclusion  

**EventManager** makes organizing and attending events simple, fast, and digital.  
It brings together event creation, user registration, and real-time engagement into one powerful platform.

---

