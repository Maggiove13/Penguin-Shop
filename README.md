# Penguin Shop

A full-stack e-commerce application built with Go (frontend) and Node.js (backend), featuring a customer-facing online store and an administrative panel for product and order management.

## Project Description

Penguin Shop is a complete e-commerce solution that consists of two main applications:

- **Frontend (Customer Store)**: Built with Go and Gin framework, provides a user-friendly interface for customers to browse products and place orders
- **Backend (Admin Panel)**: Built with Node.js and Express, offers administrative capabilities for managing products, orders, and user accounts

Both applications use MongoDB as the database for seamless data management and real-time inventory updates.

## System Architecture

The project follows a dual-application architecture:

### Frontend Application (Go + Gin)
- **Customer-facing online store**
- **Product catalog display**
- **Order placement system**
- **Real-time inventory validation**
- **Responsive web interface**

### Backend Application (Node.js + Express)
- **Administrative dashboard**
- **Product management (CRUD operations)**
- **Order management and tracking**
- **User authentication and authorization**
- **Session management**

## 📁 Project Structure

```
Penguin-Shop/
├── frontend/                    # Go-based customer store
│   ├── controllers/            # Request handlers
│   ├── database/              # MongoDB connection
│   ├── models/                # Data models (Product, Order)
│   ├── routes/                # API routes definition
│   ├── templates/             # HTML templates
│   ├── main.go                # Application entry point
│   ├── go.mod                 # Go dependencies
│   ├── go.sum                 # Dependency checksums
│   └── onlineShopp.md         # Frontend documentation
├── backend/                    # Node.js-based admin panel
│   ├── config/                # Database configuration
│   ├── controllers/           # Request controllers
│   ├── middleware/            # Authentication middleware
│   ├── models/                # Mongoose models
│   ├── public/                # Static assets (CSS, JS, images)
│   ├── routes/                # Express routes
│   ├── views/                 # Pug templates
│   ├── server.js              # Server entry point
│   ├── package.json           # Node.js dependencies
│   └── AdminPanel-Instructions.md  # Admin panel documentation
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## ✨ Features

### Customer Store (Frontend)
- **Product Catalog**: Browse available products with descriptions and images
- **Inventory Check**: Real-time stock availability validation
- **Order Placement**: Simple and intuitive ordering process
- **Order Confirmation**: Success pages with order details
- **Responsive Design**: Works on desktop and mobile devices

### Admin Panel (Backend)
- **Product Management**: Create, read, update, and delete products
- **Inventory Control**: Manage stock levels and pricing
- **Order Management**: View and process customer orders
- **User Authentication**: Secure admin login with JWT tokens
- **Dashboard**: Overview of store statistics and recent activity

### Shared Features
- **MongoDB Integration**: Consistent data storage across both applications
- **Session Management**: Secure session handling
- **Environment Configuration**: Flexible deployment settings
- **Error Handling**: Comprehensive error management

## 🚀 Installation and Setup

### Prerequisites

- **Go** 1.18 or higher
- **Node.js** v14 or higher
- **MongoDB** v4.0 or higher
- **npm** or **yarn**

### Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd Penguin-Shop
```

### Database Setup

1. **Install and start MongoDB:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb/brew/mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community
```

2. **Start MongoDB service:**
```bash
# Linux/macOS
sudo systemctl start mongod
# or
mongod

# Windows
# Start MongoDB as a Windows service
```

### Frontend Setup (Go Application)

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install Go dependencies:**
```bash
go mod tidy
```

3. **Create environment file:**
```bash
# Create .env file
touch .env
```

4. **Configure environment variables:**
```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=penguinShop
PORT=8080
```

5. **Run the frontend application:**
```bash
go run main.go
```

The customer store will be available at: `http://localhost:8080`

### Backend Setup (Node.js Application)

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install Node.js dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
# Create .env file
touch .env
```

4. **Configure environment variables:**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/penguinShop
SESSION_SECRET=your_session_secret_here
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=yourAdminPassword
JWT_SECRET=your_jwt_secret_here
```

5. **Run the backend application:**
```bash
node server.js
```

The admin panel will be available at: `http://localhost:3000`

## Access URLs

Once both applications are running:

### Customer Store (Frontend)
- **Home Page**: http://localhost:8080
- **Product Catalog**: http://localhost:8080/products
- **Order Form**: http://localhost:8080/products/order

### Admin Panel (Backend)
- **Admin Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard
- **Product Management**: http://localhost:3000/products
- **Order Management**: http://localhost:3000/orders

## 🛠️ Usage

### For Customers
1. Visit the customer store at `http://localhost:8080`
2. Browse the product catalog at `/products`
3. Click "Order this product" on any item
4. Fill out the order form with your details
5. Submit the order and receive confirmation

### For Administrators
1. Access the admin panel at `http://localhost:3000`
2. Log in with the admin credentials from your `.env` file
3. Manage products: add, edit, delete, and update inventory
4. View and process customer orders
5. Monitor store performance through the dashboard

## Technologies Used

### Frontend (Go)
- **Go 1.23+**: Programming language
- **Gin**: Web framework
- **MongoDB Driver**: Database connectivity
- **HTML Templates**: Frontend rendering
- **godotenv**: Environment variable management

### Backend (Node.js)
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB/Mongoose**: Database and ODM
- **Pug**: Template engine
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **express-session**: Session management
- **connect-mongo**: MongoDB session store

### Database
- **MongoDB**: Document-based NoSQL database


## Security Features

- **JWT Authentication**: Secure token-based authentication for admin access
- **Password Hashing**: bcrypt encryption for admin passwords
- **Session Management**: Secure session handling with MongoDB storage
- **Environment Variables**: Sensitive data stored in environment files
- **Input Validation**: Server-side validation for all user inputs

## Deployment

### Production Environment Variables

**Frontend (.env):**
```env
MONGO_URI=mongodb://your-production-db-url
DB_NAME=penguinShop
PORT=8080
GIN_MODE=release
```

**Backend (.env):**
```env
PORT=3000
MONGO_URI=mongodb://your-production-db-url
SESSION_SECRET=your-strong-session-secret
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-strong-jwt-secret
NODE_ENV=production
```

### Build and Deploy

1. **Build Go application:**
```bash
cd frontend
go build -o penguin-shop-frontend main.go
```

2. **Deploy Node.js application:**
```bash
cd backend
npm install --production
```

3. **Use process managers like PM2 for Node.js:**
```bash
npm install -g pm2
pm2 start server.js --name "penguin-shop-backend"
```

## API Documentation

### Frontend API Endpoints
- `GET /` - Home page
- `GET /products` - Product catalog
- `GET /products/order` - Order form
- `POST /products/order` - Create order
- `GET /products/order/success/:id` - Order confirmation

### Backend API Endpoints
- `POST /login` - Admin authentication
- `GET /dashboard` - Admin dashboard
- `GET /products` - List products
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /orders` - List orders
- `PUT /orders/:id` - Update order status

## Development Workflow

1. **Start MongoDB** service
2. **Run Frontend** (Go): `go run main.go` in `/frontend`
3. **Run Backend** (Node.js): `node server.js` in `/backend`
4. **Access Applications**:
   - Customer store: http://localhost:8080
   - Admin panel: http://localhost:3000

Both applications will automatically reload during development when you make changes to the code. 