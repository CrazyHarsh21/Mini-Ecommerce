# Mini E‑Commerce Website

A full‑stack e‑commerce application built with React, Node.js, Express, and MySQL.
Designed as a B.Tech mini project – simple, modular, and production‑ready.

## Features

- **User** – Register, Login, Browse products, Search & filter, Add to cart, Update cart, Dummy checkout, Order history.
- **Admin** – Login, Dashboard with stats, Manage products (CRUD), View all orders, Update order status.

## Technology Stack

- **Frontend**: React (Vite), React Router, Bootstrap, Context API, Axios
- **Backend**: Node.js, Express, JWT, bcrypt, MySQL2
- **Database**: MySQL

## Installation

### Prerequisites
- Node.js (v16+)
- MySQL (v8+)

### 1. Clone or extract the project

```bash
git clone <repository-url>
cd mini-ecommerce
```

### 2. Database Setup

Create a MySQL database named `ecommerce_db`.

Import the SQL script from `database/database.sql`:

```bash
mysql -u root -p ecommerce_db < database/database.sql
```

### 3. Backend Setup

```bash
cd server
cp .env.example .env   # fill in your DB credentials and JWT secret
npm install
npm run dev            # starts on http://localhost:5000
```

### 4. Frontend Setup

```bash
cd client
cp .env.example .env   # set VITE_API_BASE_URL (default: http://localhost:5000/api)
npm install
npm run dev            # starts on http://localhost:5173
```

### 5. Access the application

Open http://localhost:5173

Admin credentials: admin@shop.com / admin123

User credentials: john@example.com / user123 (or register a new user)

## API Documentation

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login, returns JWT | No |
| GET | /api/auth/profile | Get logged‑in user profile | Yes |
| GET | /api/products | List products (search/filter) | No |
| GET | /api/products/:id | Get product details | No |
| GET | /api/categories | List categories | No |
| POST | /api/cart | Add item to cart | Yes |
| GET | /api/cart | Get cart | Yes |
| PUT | /api/cart/:id | Update cart item quantity | Yes |
| DELETE | /api/cart/:id | Remove cart item | Yes |
| DELETE | /api/cart | Clear cart | Yes |
| POST | /api/orders | Place order (checkout) | Yes |
| GET | /api/orders | Get user's orders | Yes |
| POST | /api/admin/products | Create product | Admin |
| PUT | /api/admin/products/:id | Update product | Admin |
| DELETE | /api/admin/products/:id | Delete product | Admin |
| GET | /api/admin/orders | Get all orders | Admin |
| PUT | /api/admin/orders/:id/status | Update order status | Admin |
| GET | /api/admin/stats | Dashboard stats | Admin |

## Deployment

- **Backend**: Render / Railway – set environment variables, build command `npm install`, start `npm start`.
- **Frontend**: Vercel / Netlify – build command `npm run build`, output `dist`.

## Future Enhancements

- Image upload for products
- Pagination on product listing
- Refresh token rotation
- Real payment gateway integration

## License

MIT
