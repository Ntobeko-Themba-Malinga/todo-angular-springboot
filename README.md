# Todo Application Setup Guide

This repository contains two projects:
1. `todo-frontend`: An Angular project for the frontend.
2. `todo`: A Spring Boot project for the backend.

## Prerequisites
Ensure you have the following installed:
- Node.js (v18.x or later) and npm
- Angular CLI (v16.x or later)
- Java Development Kit (JDK 17 or later)
- Maven (v3.x or later)

## Backend Setup (Spring Boot)
### Steps:
1. Navigate to the backend project directory:
   ```
   cd todo
   ```
2. Build the project using Maven:
   ```
   ./mvnw clean install    # For Linux/Mac
   mvnw.cmd clean install  # For Windows
   ```
3. Run the Spring Boot application:
   ```
   ./mvnw spring-boot:run    # For Linux/Mac
   mvnw.cmd spring-boot:run  # For Windows
   ```
The backend will start on `http://localhost:8080` by default.

## Frontend Setup (Angular)
### Steps:
1. Navigate to the frontend project directory:
   ```
   cd todo-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the Angular development server:
   ```
   npm start
   ```

The frontend will start on `http://localhost:4200` by default.

![2025-02-15](https://github.com/user-attachments/assets/817a19af-d8f7-4877-870b-520fca70ec25)
