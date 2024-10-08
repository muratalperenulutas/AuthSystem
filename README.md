﻿# AuthSystem

JWT token-based authentication application using Express, Node.js, and PostgreSQL.

## Features

- User registration and login

- JWT token generation and validation

- Password reset functionality via email

- Logout functionality

- RESTful API endpoints

- Token Refresh Mechanism

## Technologies Used

- **Node.js**

- **Express**

- **PostgreSQL**

- **JWT (JSON Web Tokens)**

## Installation

1. Clone the repository:

```bash

git clone https://github.com/muratalperenulutas/AuthSystem.git

cd AuthSystem

```

2. Install the dependencies:

```bash

npm install dotenv bcrypt crypto jsonwebtoken pg nodemailer express path

```

3. Set up PostgreSQL by executing the `postgre.sql` file:

```bash
   psql -U yourusername -d yourdatabase -f postgre.sql

```

   Replace `yourusername` with your PostgreSQL username and `yourdatabase` with the name of the database you created.

4. Update `.env` file in the root directory and configure your database connection and other environment variables.

5. Start the server :

```bash

npm start

```

## Usage

- **Register a new user**: Send a POST request to `/auth/register` with the following body:

```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
```

- **Login**: Send a POST request to `/auth/login` with the following body:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

This will return an access token , refresh token and user data.

- **Test**: Send a GET request to `/auth/test` with the authorization header (access token) to show the test page.

- **Logout**: Send a POST request to `/auth/logout` with the authorization header (access token) to log out.

- **Refresh**: Send a POST request to `/auth/refresh` with the authorization header (refresh token) to obtain a new access token.

- **Forgot Password**: Send a POST request to `/auth/forgot-password` with the email in the body to initiate the password reset process.

- **Reset Password**: The app uses the `/auth/reset-password/:token` endpoint to reset the user password.

- **Verify Email**: The app uses the `/auth/verify/:token` endpoint to verify the user email.

## Docker

To run the application using Docker, first build the Docker image:

```bash

docker build -t auth-system .

```

Then, run the Docker container:

```bash

docker run -p 7000:7000 auth-system

```

You will find your auth app on http://localhost:7000 .

## License

This project is licensed under the MIT License .
