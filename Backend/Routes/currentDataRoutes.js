import express from 'express';
import currentData from '../Controllers/currentDataControllers.js';

const currentDataRouter = express.Router();

currentDataRouter.get('/collisionCount/:year', currentData.getCollisionsCount);
currentDataRouter.get('/youtubeFeed', currentData.getYoutubeFeed);

export default currentDataRouter;