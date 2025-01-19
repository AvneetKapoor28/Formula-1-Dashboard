const express = require('express');
const router = express.Router();
const pastData = require('../Controllers/pastDataControllers');

router.get('/driverstandings/:year', pastData.getDriverStandingsByYear);
router.get('/driverstandings/:year/count', pastData.getDriverCount);
router.get('/driverstandings/:year/:round', pastData.getDriverStandingsByRound);

router.get('/flag/:driverNationality/:constructorNationality', pastData.getFlagByNationality);

router.get('/constructorstandings/:year', pastData.getConstructorStandingsByYear);
router.get('/constructorstandings/:year/count', pastData.getConstructorCount);


router.get('/races/:year/count', pastData.getRaceCount);
router.get('/races/:year', pastData.getRaceDataByYear);


module.exports = router;