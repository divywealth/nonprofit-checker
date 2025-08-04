## 📋 Requirements
- Node.js >= 18
- npm >= 9
- PostgreSQL installed & running

## 🔧 Setup
1. Copy `.env.example` to `.env` and set your environment variables:
```env
DATABASE_URL=postgres://user:password@localhost:5432/myapp
PORT=3000
JWT_SECRET=your_jwt_secret

## Starting application
git clone 
npm install
npm run start:dev

##Prod
npm run build
npm run start:prod
