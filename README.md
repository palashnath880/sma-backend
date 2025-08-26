# School Management API

A NestJS-based REST API for managing school operations including authentication, student management, and class enrollment.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Students](#students)
  - [Classes](#classes)
- [Running with Docker](#running-with-docker)
- [Environment Variables](#environment-variables)
- [Prisma Setup](#prisma-setup)

## Features

- User authentication (signup, login, refresh token)
- Role-based access control (admin, teacher, student)
- Student management (create, list, view details)
- Class management (create, enroll students)
- PostgreSQL database with Prisma ORM
- Docker support for easy deployment

## API Endpoints

### Authentication

| Method | Endpoint              | Description          | Access |
| ------ | --------------------- | -------------------- | ------ |
| POST   | `/auth/signup`        | User signup          | Public |
| POST   | `/auth/login`         | User login           | Public |
| GET    | `/auth/refresh-token` | Refresh access token | Public |

### Students

| Method | Endpoint        | Description          | Access         |
| ------ | --------------- | -------------------- | -------------- |
| POST   | `/students`     | Create a new student | Admin only     |
| GET    | `/students`     | List all students    | Admin, Teacher |
| GET    | `/students/:id` | Get student details  | All authorized |

### Classes

| Method | Endpoint                | Description             | Access         |
| ------ | ----------------------- | ----------------------- | -------------- |
| POST   | `/classes`              | Create a new class      | Admin only     |
| POST   | `/classes/:id/enroll`   | Enroll student in class | Admin, Teacher |
| GET    | `/classes/:id/students` | Get students in a class | All authorized |

## Running with Docker

This project includes Docker configuration for easy deployment.

### Using Docker Compose

1. Clone the repository:

   ```bash
   git clone https://github.com/palashnath880/sma-backend
   cd school-management-api
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

This will start both the application and PostgreSQL database. The API will be available at `http://localhost:3000`.

## Environment Variables

The following environment variables are required:

| Variable           | Description               | Default Value (Docker)                                   |
| ------------------ | ------------------------- | -------------------------------------------------------- |
| DATABASE_URL       | PostgreSQL connection URL | postgresql://admin:admin@postgres:5432/sma?schema=public |
| JWT_ACCESS_SECRET  | Secret for access tokens  | Your Secret Code                                         |
| JWT_REFRESH_SECRET | Secret for refresh tokens | Your Secret Code                                         |
| NODE_ENV           | Application environment   |                                                          |

## Postman URL

https://www.postman.com/palashnath880/school-management/collection/mvqy3cm/school-management-api?action=share&creator=46651304

## Authors

- [Palash Nath](https://www.github.com/palashnath880)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://palashnath.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/palashnath880/)
