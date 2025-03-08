import axios from "axios";

const getCollisionsCount = async (req, res, next) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}/status/?limit=150`);
        const yearStatus = response.data.MRData.StatusTable.Status; //returns a list of all statuses for the year
        const totalCollisions = yearStatus 
            .filter(item => item.status === "Accident" || item.status === "Collision")
            .reduce((sum, item) => sum + parseInt(item.count, 10), 0);
        return res.json( totalCollisions );
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

export default { getCollisionsCount };