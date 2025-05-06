# Spring Boot OTP Generation and Validation with DTO Mapping, Exception Handling, Security, and JWT

This project is a complete and secure Spring Boot backend demonstrating:

- 📧 OTP generation and validation
- 🔐 JWT-based authentication
- 🧩 DTO pattern and mapping
- ⚠️ Global exception handling
- 🛡️ Role-based access control using Spring Security

## 🚀 Features

- ✅ Register/Login with JWT authentication
- ✅ OTP sent to email for verification
- ✅ Role-based access (`USER`, `ADMIN`)
- ✅ DTOs used to separate internal models from exposed data
- ✅ Centralized error and exception handling
- ✅ Secure endpoints with `@PreAuthorize`
- ✅ Token blacklisting on logout (optional)

## 🧰 Tech Stack

- **Java 17+**
- **Spring Boot 3.x**
- **Spring Security**
- **JWT (JSON Web Token)**
- **JavaMailSender (Email OTP)**
- **MapStruct (for DTO mapping)**
- **MySQL or H2 (Database)**


## 🔐 JWT Authentication Flow

1. User registers or logs in.
2. Server generates a JWT token and returns it.
3. JWT must be included in request headers:  
   `Authorization: Bearer <token>`
4. Token is validated on each request using Spring Security filters.

## 🔁 OTP Flow

1. User signs up or requests verification.
2. An OTP is generated and emailed using `JavaMailSender`.
3. User submits OTP for verification.
4. OTP is validated and status is updated.

## 📬 API Endpoints

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/api/auth/register`   | Register a new user             |
| POST   | `/api/auth/login`      | Authenticate and receive token  |
| POST   | `/api/auth/verify-otp` | Verify OTP for the user         |
| GET    | `/api/user/info`       | Access user-only data           |
| GET    | `/api/admin/info`      | Access admin-only data          |

## ⚠️ Global Exception Handling

Centralized exception handler catches:
- Invalid credentials
- Token expiration
- Unauthorized access
- OTP errors
- Validation issues



