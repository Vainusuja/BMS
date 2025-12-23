// const express = require('express');
// const router = express.Router();
// const showController = require('../controllers/showController');

// router.get('/:showId', showController.getAllSeats);
// router.post('/create', showController.createShow);
// router.post('/hold', showController.holdSeat);
// router.post('/checkout', showController.checkoutSeat);
// router.post('/cancel', showController.cancelHold);

// module.exports = router;


const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

router.post('/create', showController.createShow);
router.get('/:showId/seats', showController.getAllSeats);
router.post('/hold', showController.holdSeat);
router.post('/checkout', showController.checkoutSeat);
router.post('/cancel', showController.cancelHold);

module.exports = router;
