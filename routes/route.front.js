 
let express = require('express');
let router = express.Router();
/**
 * Landing page router
 */
router.get('/', (req, res, next) => {
    res.json({name: ' reach Acada'});
})

module.exports = router;