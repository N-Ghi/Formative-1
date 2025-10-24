# Inventory Management Frontend

A React-based frontend application for managing inventory with comprehensive CRUD operations, search functionality, and low stock alerts.

## Features

### ✅ Part 1 - Authentication & Basic Setup
- User authentication (login/register)
- Protected routes
- Clean, responsive UI
- API integration with backend

### ✅ Part 2 - Core Inventory Management
- **Dashboard**: Overview with statistics and quick actions
- **Products Management**: Full CRUD operations for product catalog
- **Inventory Management**: Track stock levels and restock thresholds
- **Low Stock Alerts**: Monitor and alert on low inventory items
- **Search & Filter**: Find products and filter by various criteria

## Key Components

### Authentication
- `AuthContext.jsx` - Authentication state management
- `LoginForm.jsx` - User login interface
- `RegisterForm.jsx` - User registration interface

### Core Features
- `Navigation.jsx` - Main navigation bar
- `Dashboard.jsx` - Overview dashboard with statistics
- `Products.jsx` - Product catalog management
- `Inventory.jsx` - Inventory tracking and management
- `LowStockAlerts.jsx` - Low stock monitoring and alerts

### Services
- `api.js` - API service layer with axios configuration

## API Integration

The frontend integrates with the backend API endpoints:

- **Products**: `/api/products` - CRUD operations for product management
- **Inventory**: `/api/inventory` - CRUD operations for inventory tracking
- **Authentication**: `/api/auth` - User authentication

## Usage

1. **Login**: Use existing credentials or register a new account
2. **Dashboard**: View overview statistics and quick actions
3. **Products**: Manage your product catalog (add, edit, delete products)
4. **Inventory**: Track stock levels and set restock thresholds
5. **Alerts**: Monitor low stock and out-of-stock items

## Demo Data

The application includes sample data:
- Test products in Electronics and Sports categories
- Inventory items with different stock levels
- Low stock alerts for demonstration

## Technology Stack

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API calls
- **Custom CSS** - Styling without external dependencies

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://127.0.0.1:4000/api)

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open http://localhost:5173 in your browser
4. Login with test credentials:
   - Username: `johndoe`
   - Password: `password123`

## Features Demo

### Products Management
- Add new products with name, description, category, and price
- Edit existing products
- Delete products
- Search products by name or category

### Inventory Management
- Track current stock quantities
- Set restock thresholds
- Filter inventory by quantity ranges
- View stock status (In Stock, Low Stock, Out of Stock)

### Low Stock Alerts
- Monitor items at or below restock threshold
- Categorized alerts by urgency (Critical, High, Medium)
- Visual indicators for different alert levels
- Restock recommendations

### Search & Filter
- Search products by name or category
- Filter inventory by quantity ranges
- Filter by restock value ranges
- Real-time filtering and search results

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Error Handling

- Comprehensive error handling for API calls
- User-friendly error messages
- Loading states for better UX
- Form validation and feedback