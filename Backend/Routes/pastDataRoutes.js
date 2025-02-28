import express from 'express';
import pastData from '../Controllers/pastDataControllers.js';

const router = express.Router();

router.get('/driverstandings/:year', pastData.getDriverStandingsByYear);
router.get('/driverstandings/:year/count', pastData.getDriverCount);
router.get('/driverstandings/:year/:round', pastData.getDriverStandingsByRound);

router.get('/flag/:driverNationality/:constructorNationality', pastData.getFlagByNationality);

router.get('/constructorstandings/:year', pastData.getConstructorStandingsByYear);
router.get('/constructorstandings/:year/count', pastData.getConstructorCount);

router.get('/races/:year/count', pastData.getRaceCount);
router.get('/races/:year', pastData.getRaceDataByYear);

export default router;
