# JWT Authentication Service

A Node.js-based backend service for managing user authentication and authorization using JWT (JSON Web Tokens). This project is built with **Express.js**, **Sequelize ORM**, and **MariaDB**, following a modular and scalable architecture.

---

## **Features**
- **User Authentication**
  - User registration (signup)
  - User login with JWT issuance
- **JWT Authorization**
  - Middleware to protect routes and verify tokens
- **CRUD Operations**
  - View user details (excluding password)
  - Update user details
  - Delete user account
- **Error Handling**
  - Centralized error management with meaningful responses
- **Logging**
  - Request logging for debugging and monitoring
- **Database**
  - User data managed with MariaDB using Sequelize ORM

---

## **Folder Structure**

```
project-root/
├── config/
│   ├── db.config.js      # Database configuration
│   ├── jwt.config.js     # JWT configuration
├── controllers/
│   ├── auth.controllers.js  # Handles HTTP operations
├── middlewares/
│   ├── errorhandler.js   # Centralized error handling
│   ├── logger.js         # Logging middleware
│   ├── notfound.js       # 404 handler
│   ├── verifytoken.js    # JWT token verification
├── models/
│   ├── user.model.js     # User model for Sequelize
├── routes/
│   ├── auth.routes.js    # Authentication routes
├── schema/
│   ├── schema.sql        # SQL file for creating database and tables
├── services/
│   ├── auth.services.js  # Handles database operations
├── shared/
│   ├── apierror.js       # Custom error handling class
│   ├── httpstatuscodes.js # HTTP status codes
├── .env                  # Environment variables
├── .gitignore            # Github gitignore file
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
```

---

## **Setup Instructions**

### **Prerequisites**
1. Node.js (v14 or later)
2. MariaDB or MySQL
3. Postman or another API testing tool (optional)

### **Environment Variables**
Create a `.env` file in the root directory and define the following variables:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
JWT_SECRET=yourjwtsecret
```

### **Install Dependencies**
Run the following command to install all required packages:
```bash
npm install
```

### **Database Setup**
Use the `schema/schema.sql` file to create the database and `users` table.

### **Start the Server**
Run the server in development mode:
```bash
npm run dev
```

---

## **API Endpoints**

### **Base URL**
```
http://localhost:8000/api/v1/auth
```

### **Authentication Routes**

| Method | Endpoint        | Description                     | Requires Token |
|--------|-----------------|---------------------------------|----------------|
| POST   | `/api/v1/auth/register`  | Register a new user             | No    |
| POST   | `/api/v1/auth/login`   | Authenticate user and get a JWT   | No    |
| GET    | `/api/v1/auth/profile`    | Get user details               | Yes   |
| PUT    | `/api/v1/auth/profile`    | Update user details            | Yes   |
| DELETE | `/api/v1/auth/profile`    | Delete user account            | Yes   |

---

## **Technologies Used**
- **Backend Framework**: Express.js
- **Database**: MariaDB (via Sequelize ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Logging**: Custom middleware
- **Error Handling**: Centralized with custom error classes

---

## **How to Contribute**
1. Fork this repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push the branch: `git push origin feature-name`
5. Submit a pull request.

---

## **Future Enhancements**
- Add unit and integration tests.
- Improve input validation with libraries like `Joi` or `Yup`.
- Add password reset functionality.
- Implement roles and permissions for users.
