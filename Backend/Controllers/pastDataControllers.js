const axios = require('axios');

const getDriverStandingsByYear = async (req, res, next) => {
    try {
        const { year } = req.params;
        console.log("year requested is" + year);
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json?limit=100`);
        const driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        return res.json(driverStandings);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getConstructorStandingsByYear = async (req, res, next) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`)
        const constructorStandings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        res.json(constructorStandings);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getRaceCount = async (req, res, next) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}.json`);
        const raceCount = response.data.MRData.total;
        res.json(raceCount);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }

}

const getDriverCount = async (req, res, next) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json?limit=100`);
        const driverCount = response.data.MRData.total;
        res.json(driverCount);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getConstructorCount = async (req, res, next) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`);
        const driverCount = response.data.MRData.total;
        res.json(driverCount);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getRaceDataByYear = async (req, res, next) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}.json`);
        const raceData = response.data.MRData.RaceTable.Races;
        res.json(raceData);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getDriverStandingsByRound = async (req, res, next) => {
    try {
        const { year, round } = req.params;
        console.log("year requested is" + year + "round requested is" + round);
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`);
        const raceData = response.data.MRData.RaceTable.Races;
        res.json(raceData);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getFlagByNationality = async (req, res, next) => {
    try {
        const resObject = {};
        const { driverNationality, constructorNationality } = req.params;
        const driverResponse = await axios.get(`https://restcountries.com/v3.1/demonym/${driverNationality}`);
        resObject.driverFlag = driverResponse.data[0].flag;
        const constructorResponse = await axios.get(`https://restcountries.com/v3.1/demonym/${constructorNationality}`);
        resObject.constructorFlag = constructorResponse.data[0].flag;
        res.json(resObject);
    }
    catch (error) {
        console.error('Error fetching data from RestCountries API', error);
        next(error);
    }

}
module.exports = {
    getDriverStandingsByYear,
    getConstructorStandingsByYear,
    getRaceCount,
    getDriverCount,
    getConstructorCount,
    getRaceDataByYear,
    getDriverStandingsByRound,
    getFlagByNationality,
}