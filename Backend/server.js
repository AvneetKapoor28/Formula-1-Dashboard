import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import pastDataRoutes from './Routes/pastDataRoutes.js';
import errorHandler from './Middleware/ErrorHandler.js';
import connectDB from './config/mongodb.js';
import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRoutes.js';
import currentDataRouter from './Routes/currentDataRoutes.js';

const app = express();
const PORT = process.env.PORT || 5500;
connectDB();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://www.formula1-dashboard.xyz'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/pastData', pastDataRoutes);
app.use('/currentData', currentDataRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
