import axios from "axios";

const getCollisionsCount = async (req, res, next) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`https://api.jolpi.ca/ergast/f1/${year}/status/?limit=150`);
        const yearStatus = response.data.MRData.StatusTable.Status; //returns a list of all statuses for the year
        const totalCollisions = yearStatus
            .filter(item => item.status === "Accident" || item.status === "Collision")
            .reduce((sum, item) => sum + parseInt(item.count, 10), 0);
        return res.json(totalCollisions);
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}


const getYoutubeFeed = async (req, res, next) => {
    try {

        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=formula-1%20news&key=${process.env.YOUTUBE_API_KEY}`);
        const videoList = extractVideoDetails(response.data);
        return res.json(videoList);

    }
    catch (error) {
        console.error('Error fetching data from Youtube API', error);
        next(error)
    }
}

//To extract the video details from the Youtube API response
const extractVideoDetails = (apiResponse) => {
    return apiResponse.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description
    }));
};


const getCurrentYearRaceCount = async (req, res, next) => {
    try {
        const response = await (axios.get(`https://api.jolpi.ca/ergast/f1/current.json`))
        const raceCount = response.data.MRData.total
        return res.json(raceCount)
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getCountdowntoNextGP = async (req, res, next) => {
    try {
        const response = await (axios.get(`https://api.jolpi.ca/ergast/f1/current.json`))
        const nextGP = getNextRace(response.data)
        return res.json(nextGP)
    }
    catch (error) {
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const getNextRace = (raceData) => {
    const races = raceData.MRData.RaceTable.Races;

    // Get the current date and time in UTC
    const now = new Date();

    // Find the next race by filtering future races and sorting by date
    const nextRace = races
        .map(race => ({
            raceName: race.raceName,
            dateTime: new Date(`${race.date}T${race.time}`)
        }))
        .filter(race => race.dateTime > now)
        .sort((a, b) => a.dateTime - b.dateTime)[0]; // Get the nearest race

    return nextRace ? { raceName: nextRace.raceName, dateTime: nextRace.dateTime.toISOString() } : null;
};

const getSprintRaceCount = async (req, res, next) => {
    try {
        const response = await (axios.get(`https://api.jolpi.ca/ergast/f1/current.json`))
        const totalSprints = countSprintRaces(response.data)
        return res.json(totalSprints)

    }
    catch(error){
        console.error('Error fetching data from Ergast API', error);
        next(error);
    }
}

const countSprintRaces = (raceData) => {
    const races = raceData.MRData.RaceTable.Races;

    // Filter races that have a Sprint session
    const sprintRaces = races.filter(race => race.Sprint);

    return sprintRaces.length;
};

//Add SprintRaceCount and Countdown to next GP

export default { getCollisionsCount, getYoutubeFeed, getCurrentYearRaceCount, getCountdowntoNextGP, getSprintRaceCount };