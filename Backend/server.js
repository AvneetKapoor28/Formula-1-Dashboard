const express = require('express');
const cors = require('cors');
const pastDataRoutes = require('./Routes/pastDataRoutes');
const errorHandler = require('./Middleware/ErrorHandler');

const app = express();
app.use(cors());
const PORT = 5500;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.use('/pastData', pastDataRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});