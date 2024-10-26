# Calendar Event Management Backend

This project is a backend for a calendar event management system built using Node.js, Express, and MongoDB. Users can register and log in, create, update, and delete events, and view their events. This backend also integrates with Google Calendar API for seamless event synchronization(BUT currently not applied in this project as it requires my project to get validation from GOOGLE using privacy and policy page whichi dont have for this).

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Auth Routes](#auth-routes)
  - [Event Routes](#event-routes)
- [Google Calendar API Setup](#google-calendar-api-setup)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

Follow these instructions to set up the project on your local machine.

## Prerequisites
- **Node.js**: >= 12.x
- **MongoDB**: Install and run MongoDB locally or use MongoDB Atlas for a cloud database.
- **Google API Credentials**: For Google Calendar integration.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/calendar-event-management-backend.git
   cd calendar-event-management-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root of the project and add the following variables:

   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=your_google_redirect_uri
   ```

4. **Set up Google API**: Configure the Google API Console for Calendar API integration. See the [Google Calendar API Setup](#google-calendar-api-setup) section below for details.

## Running the Application

To start the server in development mode:
```bash
npm run dev
```

To start the server in production mode:
```bash
npm start
```

The application will run on the specified port (default is `5000`).

---

## API Documentation

### Auth Routes

- **Register a User**
  - **POST** `/auth/register`
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **Login a User**
  - **POST** `/auth/login`
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### Event Routes

> All routes below require authentication with a valid JWT token passed in the `Authorization` header.

- **Get All Events**
  - **GET** `/events`
  - **Response**: Returns a list of all user events.

- **Create an Event**
  - **POST** `/events/create`
  - **Body**:
    ```json
    {
      "title": "Meeting with Team",
      "start": "2024-10-30T10:00:00Z",
      "end": "2024-10-30T11:00:00Z",

    }
    ```

- **Update an Event**
  - **PUT** `/events/update/:eventId`
  - **Body**:
    ```json
    {
      "title": "Updated Title",
      "start": "2024-10-30T11:00:00Z",
      "end": "2024-10-30T12:00:00Z",
    }
    ```

- **Delete an Event**
  - **DELETE** `/events/delete/:eventId`
 


---

## Google Calendar API Setup

To enable Google Calendar API integration:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Go to **APIs & Services > Library** and enable the **Google Calendar API**.
4. In **APIs & Services > Credentials**, create OAuth 2.0 credentials:
   - Set the **Authorized redirect URIs** to your app’s URL (e.g., `http://localhost:3000` for local development).
5. Note down the **Client ID**, **Client Secret**, and **Redirect URI**.

---

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store user and event data.
- **Google Calendar API**: For Google Calendar synchronization.
- **JWT**: JSON Web Tokens for user authentication.

---

## Contributing
If you’d like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

Enjoy using the Calendar Event Management Backend!