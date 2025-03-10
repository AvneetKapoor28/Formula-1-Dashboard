import express from 'express';
import currentData from '../Controllers/currentDataControllers.js';

const currentDataRouter = express.Router();

currentDataRouter.get('/collisionCount/:year', currentData.getCollisionsCount);
currentDataRouter.get('/youtubeFeed', currentData.getYoutubeFeed);
currentDataRouter.get('/currentYearRaceCount', currentData.getCurrentYearRaceCount);
currentDataRouter.get('/countdownToNextGP', currentData.getCountdowntoNextGP);
currentDataRouter.get('/SprintRaceCount', currentData.getSprintRaceCount)

export default currentDataRouter;