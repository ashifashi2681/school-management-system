# School Management System [MERN Stack]

The School Management System allows role-based access control for different users such as Admin, Office Staff, and Librarian to manage various aspects of the school’s operations, including registration of staffs and librarians, student records, Fees Records and library management.

<!-- ## Roles

-   Admin
-   Office Staff
-   Librarian

### Admin Features

###

-   Registration of staffs, librarians and students
-   View, update and delete staffs, librarians and students
-   Able to create, update and delete fees and library records
-   Able to update admin credentials as well as staff and librarians

### Staff Features

-   Create, view, update and delete student records
-   Create, view, update and delete Fees records
-   View library records

### Librarian Features

-   Create, view, update and delete library records
-   View Student records

## Setup instructions.

-   Node.js
-   Express js
-   MongoDB
-   React js

### Installation

**1. Clone repository**

```bash
git clone https://github.com/ashifashi2681/school-management-system.git
```

**2. Backend setup**

-   Navigate to `server` folder and run `npm install`
-   Run `npm start` to start server

**3. Frontend setup**

-   Navigate to `client` folder and run `npm install`
-   Run `npm run dev` to start server

## List of used libraries

### Frontend

-   react
-   react-redux | @reduxjs/toolkit
-   tailwind
-   react-router-dom
-   axios
-   yup
-   react-icons
-   react-toastify

### Backend

-   express
-   mongoose
-   bcryptjs
-   jsonwebtoken
-   cookie-parser
-   nodemon
-   dotenv
-   cors

## Admin Credentials Auto-Generation

At the very beginning of the app’s initialization, if no user exists in the database, an Admin account is automatically created using the environment variables (.env file).

### How It Works

-   When the server starts, it checks if there are any users in the database.
-   If no users are found, the app generates an Admin user with the credentials provided in the .env file.
-   Later on admin can update the credentials through admin dashboard

## environment variables

**create .env file in root of server folder**

-   ADMIN_NAME = <initial_admin_name>
-   ADMIN_EMAIL = <initial_admin_email>
-   ADMIN_PASSWORD = <initial_admin_password>
-   MONGO_URL = <mongodb_url>
-   JWT_SECRET_KEY = <jwt_secrete_key> -->
