# ✈️ Flights App — Frontend

🌐 Available Languages:  
[English](README.md) | [Español](README.es.md)


User interface for Flights App, a platform to manage flights, bookings, and users.
This project consumes the backend developed with Spring Boot, protecting routes with roles and JWT, along with various features.

![App gif](./public/flights-app.gif)

---

## 🚀 Technologies Used

- **React** (^19.1.1)
- **Vite** (dev server / build)
- **React Router**
- **Axios**
- **jwt-decode**
- **SweetAlert2**
- **npm**


---

## ✨ Features & Functionality

### 🛫 Flight & Airline Management
- Full CRUD for **flights**, **users**, **airlines**, and **seats**
- Manual generation of **random seats** for a flight
- Real-time **seat reservation**
- **Automatic price calculation** based on seat class and the distance between origin and destination airports

### 💳 User Operations
- Ability to **add balance** to the user account
- **Seat purchase** based on class and availability

### 🧭 Navigation & User Experience
- Smooth and intuitive navigation between protected routes
- Custom **error / access denied page**
- Clear **validation and error messages** for every operation

### 🔐 Security & Authentication
- Secure authentication with **JWT**
- User roles: **Administrator** and **User**
- Protected routes based on permissions

---

## 🖼️ Preview
### Página de inicio
![Home page](./public/home-page.png)

### Listado de vuelos
![Flights Table](./public/flights-page.png)

### Detalle de un vuelo
![Flight detail](./public/flight-detail-page.png)

### Tickets de un usuario
![Tickets Page](./public/tickets-page.png)

---

## ⚙️ Setup & Local Execution

### 1. Clone the repository

```bash
git clone https://github.com/SantiagoS25/flights-app-frontend.git

cd flights-app-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode
```bash
npm run dev
```

The application will be available at:
```http
http://localhost:5173
```
---

## 📁 Project Structure

```
/src
  /assets          
  /components
  /context     
  /pages  
  /routes         
  /services
  App.jsx
  index.css        
  main.jsx         
```

---

## 🤝 Connecting to the Backend

* Backend repository: [flights-app-backend](https://github.com/SantiagoSpina25/flights-app-backend)

* Make sure to start the backend before using the frontend.

* Both projects must share the same CORS configuration and base URL.

---

## 🌐 Roles: User and Administrator
The application has two main roles: **user** and **administrator**.  
The key difference is that the administrator can access protected endpoints and perform restricted operations that regular users cannot.

In the UI, the user’s role is visually indicated in the footer:
If the user is an administrator, the following badge appears:

![Admin Badge](./public/admin-badge.png)

Meanwhile, standard users **won't see** the components or buttons that allow administrative actions, such as **creating an airline, deleting a user, generating seats for a flight, etc**.

---

## 🔐 Authentication (JWT)

- The system uses **JWT** (Bearer Token).

- All routes are protected except:

  -  `/login`

  -  `/register`

- When logging in, the token is stored in localStorage and automatically attached to API requests.

---

## 🧠 Upcoming Improvements

- 🔍 Advanced filtering by city or airline
- 📱 Responsive mobile version
- ✈️ Airplane seat-map view for reservations

---

## 👨‍💻 Author

**Developed by [Santiago Spina](https://github.com/SantiagoSpina25)**   
💡 Personal project to practice full-stack development with Spring Boot + React.

---

## 🛡️ License

This project is distributed under the **MIT License**.
You are free to use, modify, and share it.
