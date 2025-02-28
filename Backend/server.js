import express from 'express';
import cors from 'cors';
import pastDataRoutes from './Routes/pastDataRoutes.js';
import errorHandler from './Middleware/ErrorHandler.js';

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.use('/pastData', pastDataRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
