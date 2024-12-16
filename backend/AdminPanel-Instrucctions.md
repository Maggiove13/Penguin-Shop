# Node.js Project: Admin Panel with MongoDB

This project is an admin panel developed with **Node.js** using **Express** as the framework and **MongoDB** as the database. The panel allows:

- Product management: Create, read, update, and delete.
- Viewing and managing user orders.
- Admin authentication to access the dashboard.

## Requirements

- Node.js v14 or higher
- MongoDB v8.0 or higher (installed locally)
- An environment to manage environment variables like `.env` (e.g., [dotenv](https://www.npmjs.com/package/dotenv))


## Installation

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd project
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and define the following variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/my_database
   SESSION_SECRET=my_session_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   JWT_SECRET=my_jwt_secret
   ```

4. Ensure MongoDB is running locally.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Access the application in your browser:

   [http://localhost:3000](http://localhost:3000)

3. The default admin will be created upon server startup using the credentials configured in the `.env` file.

## Features

### Authentication
- Route: `/login`
- Allows administrators to log in and access the dashboard.
- Implements JWT for secure session handling.

### Product Management
- List products: `/products`
- Create products: `/products` (POST)
- Edit products: `/products/:id/edit`
- Delete products: `/products/:id/delete`

### Order Management
- View user orders.
- Update order statuses.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB** (with Mongoose)
- **Pug** (template engine)
- **Express-session** (for session management)
- **connect-mongo** (to store sessions in MongoDB)


