import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import pastDataRoutes from './Routes/pastDataRoutes.js';
import errorHandler from './Middleware/ErrorHandler.js';
import connectDB from './config/mongodb.js';

const app = express();
const PORT = process.env.PORT || 5500;
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.use('/pastData', pastDataRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
