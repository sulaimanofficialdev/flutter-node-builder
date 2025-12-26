# Car Spare Parts API

Node.js/Express/Sequelize REST API for the Car Spare Parts Business Management System.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure database
3. Create PostgreSQL database
4. Run: `npm run dev`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login

### Resources (all require auth)
- `/api/vehicles` - CRUD + search
- `/api/containers` - CRUD + profit/loss
- `/api/inventory` - CRUD + search, valuation, low-stock
- `/api/customers` - CRUD + search, balance
- `/api/orders` - CRUD + payments, monthly sales
- `/api/employees` - CRUD + expenses
- `/api/properties` - CRUD + income report
- `/api/transactions` - CRUD + summary, cash flow

### Reports
- `GET /api/reports/dashboard`
- `GET /api/reports/container-profit-loss`
- `GET /api/reports/receivables`
- `GET /api/reports/payables`
