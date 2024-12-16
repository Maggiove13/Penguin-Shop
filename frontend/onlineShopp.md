# Online Store

This project is a simple online store built with **Go**, **Gin**, and **MongoDB**. It allows users to view products, place orders, and manage inventory.

## Features

- Display available products.
- Create and manage orders.
- Validate stock availability before placing an order.
- Automatically update inventory after order placement.

## Requirements

- **Go** 1.18 or higher
- **MongoDB**
- **Gin** (web framework for Go)

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/online-store.git
cd online-store
```

### Install Dependencies
Ensure Go is installed on your system, then install the project dependencies:

```bash
go mod tidy
```
### Configure MongoDB
Ensure MongoDB is installed and running locally. You can download MongoDB from here:
```bash
https://www.mongodb.com/try/download/community
```

### Set Environment Variables
Create a .env file in the root of the project and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=onlineShop
```

Run the Server
Start the server with the following command:


```bash
go run main.go
```

The server will be available at http://localhost:8080.

#### Usage
View Products
To see the list of available products, navigate to:
```bash
http://localhost:8080/products
```

#### Place an Order
Navigate to http://localhost:8080/products.

- Select a product and click "Order this product."
- Complete the order form with customer details and the required quantity.
- Submit the form to place the order.

The inventory is automatically updated after an order is placed. If stock is insufficient, an error message will be displayed.

### Technologies Used
Go
Gin (web framework)
MongoDB (database)