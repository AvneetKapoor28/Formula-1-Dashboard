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


const getYoutubeFeed = async (req,res, next) => {
    try{

        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=formula-1%20news&key=${process.env.YOUTUBE_API_KEY}`);
        const videoList = extractVideoDetails(response.data);
        return res.json(videoList);

    }
    catch(error){
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

export default { getCollisionsCount, getYoutubeFeed };