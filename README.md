# E-Commerce Backend API

## Description

A RESTful E-Commerce Backend API built with Node.js, Express.js, MongoDB Atlas, and Mongoose. The project provides CRUD operations for categories and products, shopping cart management, and order processing.

---

## GitHub Repository

https://github.com/Yousef-github-2010/ecommerce-backend

---

## Features

- Categories CRUD
- Products CRUD
- Shopping Cart Management
- Order Management
- MongoDB Atlas Integration
- RESTful API Design
- Centralized Error Handling
- Environment Variables Support
- Postman Collection & Environment Included

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Yousef-github-2010/ecommerce-backend.git
```

### 2. Navigate to the project directory

```bash
cd ecommerce-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Start the development server

```bash
npm run dev
```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| MONGO_URI | MongoDB Atlas connection string | mongodb+srv://... |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check server status |
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |
| POST | `/api/categories` | Create a category |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/cart` | Get shopping cart |
| POST | `/api/cart` | Add product to cart |
| PATCH | `/api/cart/:productId` | Update cart item quantity |
| DELETE | `/api/cart/:productId` | Remove product from cart |
| POST | `/api/orders` | Create an order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |
| PATCH | `/api/orders/:id` | Update order status |

---

## Project Structure

```text
ecommerce-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── cartController.js
│   ├── categoryController.js
│   ├── orderController.js
│   └── productController.js
├── middleware/
│   ├── errorHandler.js
│   └── notFound.js
├── models/
│   ├── Cart.js
│   ├── Category.js
│   ├── Order.js
│   └── Product.js
├── postman/
│   ├── E-Commerce API.postman_collection.json
│   └── E-Commerce API DEV.postman_environment.json
├── routes/
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── seed/
│   └── seed.js
├── utils/
│   ├── AppError.js
│   ├── asyncHandler.js
│   └── generateResponse.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## Postman

The Postman Collection and Environment files are available in the `postman` directory.

---

## Author

**Yousef Ibrahim**

GitHub Account: https://github.com/Yousef-github-2010