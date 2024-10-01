# MERN Chat Application Backend

This is the backend server for the real-time chat application built using Node.js and Express.js. It handles user authentication, message storage, and real-time communication with Socket.io. The backend communicates with a MongoDB database to store user and chat data.

### Features

- **User Authentication**: Login and register functionality using JWT (JSON Web Tokens) for secure authentication.
- **Real-Time Messaging**: Supports real-time communication with the help of Socket.io.
- **Database**: MongoDB is used to store user details, chat messages, and other relevant information.
- **RESTful API**: Provides endpoints for user management, chat management, and more.

### Prerequisites

Before running this backend application, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

### Frontend Repository

The Frontend code is hosted at:  
[MERN-ChatApp-Fronted](https://github.com/abubakarchaudhary731/MERN-ChatApp-Frontend)

### Installation

1. Clone the backend repository:

    ```bash
    git clone git@github.com:abubakarchaudhary731/MERN-ChatApp-Backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MERN-ChatApp-Backend
    ```

3. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

4. Create a `.env` file in the root directory.

5. Use the `.env.example` file to set up the environment variables in the newly created `.env` file. Example:

    ```bash
    MONGO_URI=mongodb://localhost:27017/chatapp
    JWT_SECRET=your_jwt_secret_key
    SOCKET_PORT=5000
    ```

    Make sure to replace the example values with your actual MongoDB connection string and JWT secret key.

### Running the Backend Server

To start the backend server, use the following command:

```bash
nodemon ./index.js
```