const exxpress = require('express');
const roouter = exxpress.Router();
const QuotesController = require('../controllers/QuotesController');

router.post('/', QuotesController);

module.exports = roouter;
