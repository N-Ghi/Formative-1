# Inventory Management System
> A comprehensive full-stack web application for efficient inventory tracking, stock management, and automated low-stock alerts

## African Context

In many African markets, small to medium-sized businesses face significant challenges in managing their inventory effectively. Traditional paper-based systems are prone to errors, making it difficult to track stock levels, identify low-stock items, and make informed purchasing decisions. This often leads to stockouts of popular items or overstocking of slow-moving products, both of which negatively impact business profitability.

Our Inventory Management System addresses these challenges by providing an accessible, user-friendly digital solution that helps African entrepreneurs and business owners modernize their operations. By automating inventory management with real-time alerts and comprehensive search capabilities, business owners can focus on growth and customer service rather than manual record-keeping, ultimately contributing to the digital transformation of African commerce.

## Team Members

- Nagasaro Ghislaine -Backend Developer 
- Kevine Umutoni -frontend developer
- Palvis Paul Ntawukamenya frontend developer

## Project Overview

The Inventory Management System is a modern full-stack web application designed to streamline inventory operations for businesses of all sizes. Built with React on the frontend and Express.js on the backend, the application provides real-time visibility into stock levels, automated alerts for low inventory, and powerful search and filtering capabilities.

The system enables business owners to maintain accurate records of their products, track stock movements, set restock thresholds, and receive proactive notifications when items fall below specified levels. With comprehensive authentication and authorization, multiple users can securely access and manage inventory data. The application's dashboard provides at-a-glance statistics and insights, helping managers make informed decisions about purchasing and stock allocation.

With an intuitive user interface, robust backend architecture using Sequelize ORM, and JWT-based security, the platform scales to accommodate growing businesses while remaining simple enough for users with minimal technical expertise. The responsive design ensures seamless operation across desktop, tablet, and mobile devices, making it ideal for busy entrepreneurs who need to manage their inventory on the go.

### Target Users

- **Small Business Owners**: Retail shop owners, pharmacies, and grocery stores looking to digitize their inventory management
- **Warehouse Managers**: Personnel responsible for tracking stock across multiple locations
- **E-commerce Entrepreneurs**: Online sellers managing product catalogs and stock levels
- **Store Managers**: Team members who need real-time access to inventory data for customer service
- **Inventory Clerks**: Staff responsible for stock updates and reordering

### Core Features

- **User Authentication & Authorization**: Secure login and registration with JWT-based authentication, protected routes, and role-based access control
- **Comprehensive Product Management**: Full CRUD operations for product catalog including name, description, category, and pricing information
- **Real-time Inventory Tracking**: Monitor current stock quantities, set customizable restock thresholds, and view stock status (In Stock, Low Stock, Out of Stock)
- **Automated Low Stock Alerts**: Intelligent alert system categorized by urgency levels (Critical, High, Medium) with visual indicators and restock recommendations
- **Advanced Search & Filter**: Multi-criteria search by product name or category, filter by quantity ranges and restock values, with real-time results
- **Interactive Dashboard**: Overview statistics, quick actions, and visual insights into inventory health and critical stock situations

## Technology Stack

- **Frontend**: React 18+ with Vite as build tool
- **Backend**: Node.js with Express.js framework (ES modules)
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **HTTP Client**: Axios for API communication
- **Styling**: Custom CSS for responsive design
- **Development Tools**: Nodemon for hot reloading

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/N-Ghi/Formative-1.git
cd Formative-1
```

2. **Backend Setup**

```bash
cd backend
npm install
```


3. **Prepare the database**

```bash
# Run migrations (using sequelize-cli)
npx sequelize-cli db:migrate

# Seed initial data (users and sample products)
npx sequelize-cli db:seed:all
```

4. **Start Backend Server**

```bash
# Development mode with nodemon
npx nodemon app.js

# Or production mode
node app.js
```

5. **Frontend Setup**

Open a new terminal window:

```bash
cd frontend
npm install
```


6. **Start Frontend Development Server**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`


### Usage

#### Getting Started

1. **Login**: Use the demo credentials or register a new account
2. **Dashboard**: View overview statistics, total products, low stock alerts, and quick action buttons
3. **Explore Features**: Navigate through Products, Inventory, and Alerts sections

#### Product Management
- **Add Products**: Click "Add New Product" and fill in name, description, category, and price
- **Edit Products**: Click the edit icon on any product card to modify details
- **Delete Products**: Remove products that are no longer needed
- **Search Products**: Use the search bar to find products by name or category

#### Inventory Operations
- **Track Stock**: View current quantities for all products
- **Set Thresholds**: Configure restock thresholds to trigger automatic alerts
- **Update Quantities**: Adjust stock levels as items are sold or restocked
- **Filter Inventory**: Apply filters by quantity ranges or restock values
- **Monitor Status**: Visual indicators show In Stock, Low Stock, or Out of Stock status

#### Low Stock Alert Management
- **View Alerts**: Monitor items at or below restock threshold
- **Alert Levels**: 
  - 🔴 **Critical**: 0 stock (Out of Stock)
  - 🟠 **High**: 1-5 items remaining
  - 🟡 **Medium**: 6-10 items remaining
- **Take Action**: Click on alert cards to quickly navigate to restock items

#### Search & Filter Features
- **Product Search**: Find products by name or category in real-time
- **Quantity Filters**: Filter inventory by specific quantity ranges
- **Restock Filters**: View items within certain restock threshold ranges
- **Combined Filters**: Use multiple filters simultaneously for precise results

## Project Structure

```
Formative-1/
├── backend/
│   ├── config/
│   │   └── database.js           # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── productController.js  # Product CRUD operations
│   │   └── inventoryController.js # Inventory management
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Product.js            # Product model
│   │   └── Inventory.js          # Inventory model
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── protectedRoutes.js    # All other endpoints
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification
│   ├── migrations/                # Database migrations
│   ├── seeders/                   # Sample data seeders
│   ├── utils/                     # Utility functions
│   ├── .env.example               # Environment template
│   ├── app.js                     # Express app entry
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── RegisterForm.jsx
│   │   │   ├── Dashboard.jsx      # Main dashboard
│   │   │   ├── Navigation.jsx     # Navigation bar
│   │   │   ├── Products.jsx       # Product management
│   │   │   ├── Inventory.jsx      # Inventory tracking
│   │   │   └── LowStockAlerts.jsx # Alert monitoring
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── App.css                # Global styles
│   ├── .env.example
│   ├── .gitignore                 # NPM default
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── .gitignore                     # Global gitignore file
├── LICENSE
└── README.md                      # This file
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Inventory Endpoints
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get single inventory item
- `POST /api/inventory` - Create inventory item (protected)
- `PUT /api/inventory/:id` - Update inventory (protected)
- `DELETE /api/inventory/:id` - Delete inventory item (protected)
- `GET /api/inventory/alerts` - Get low stock alerts (protected)

For detailed API documentation, check out the Swagger UI at `http://127.0.0.1:{Your port}/api-docs` (when backend is running)

## Features in Detail

### Responsive Design
- **Desktop**: Full-featured layout with sidebar navigation
- **Tablet**: Optimized touch-friendly interface
- **Mobile**: Streamlined mobile view with hamburger menu

### Error Handling
- Comprehensive error handling for all API calls
- User-friendly error messages and notifications
- Loading states and spinners for better UX
- Form validation with real-time feedback
- Network error recovery

### Security Features
- JWT-based authentication with secure token storage
- Protected routes requiring authentication
- Password hashing with bcrypt
- CORS configuration for API security
- Environment-based configuration management

## Development

### Backend Development
```bash
cd backend
npx nodemon app.js
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

The optimized production build will be in `frontend/dist/`

## Troubleshooting

### Common Issues

**Database Connection Failed**

- Make sure you run migrations fro the tables to be created

**Backend Won't Start**

- Check if your specified port is available
- Verify all environment variables are set
- Run `npm install` to ensure dependencies are installed

**Frontend Can't Connect to Backend**

- Verify backend is running on `http://127.0.0.1:{Your port}`
- Check `VITE_API_URL` in frontend `.env` file
- Clear browser cache and restart dev server

**Authentication Issues**

- Ensure JWT_SECRET is set in backend `.env`
- Check token expiration settings
- Clear browser localStorage and login again

**Migration/Seeding Failures**

- Verify table names match model definitions
- Check column constraints and data types
- Ensure database user has proper permissions

## Future Enhancements

- [ ] Multi-location inventory tracking
- [ ] Barcode scanning support
- [ ] Export reports (PDF, Excel)
- [ ] Email notifications for low stock
- [ ] Supplier management
- [ ] Purchase order system
- [ ] Inventory forecasting with analytics
- [ ] Mobile app (React Native)

## Links

- [GitHub Repository](https://github.com/N-Ghi/Formative-1)
- [Project Board](https://github.com/N-Ghi/Formative-1/projects)
- [Issues](https://github.com/N-Ghi/Formative-1/issues)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


