require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const ItemRoute = require('./Routes/ItemsRoutes')
const MovingItemRoute = require('./Routes/MovingItemsRoutes')
const ResolvingRoute = require('./Routes/ResolvingRoutes')
const UserRoute = require('./Routes/UserRoutes')
const errorHandler = require('./middleware/errorHandler')
const path = require('path');

const server = express();

// Security middleware
server.use(helmet());
server.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'https://lostandfound-frontend-y3v6.onrender.com'
  ].filter(Boolean),
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // Increased limit for development
});
server.use(limiter);

server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ limit: '10mb', extended: true }));

server.use('/products', ItemRoute)
server.use('/movingitem', MovingItemRoute)
server.use('/resolving', ResolvingRoute)
server.use('/user', UserRoute);

// Error handling middleware (must be last)
server.use(errorHandler);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Database Connected");
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
