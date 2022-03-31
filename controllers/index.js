const authControl     = require('./auth');
const buscarControl   = require('./buscar');
const categoryControl = require('./category');
const productControl  = require('./products');
const uploadControl   = require('./uploads');
const userControl     = require('./users');
const images          = require('./img');

module.exports = {
    ...authControl,
    ...buscarControl,
    ...categoryControl,
    ...productControl,
    ...uploadControl,
    ...userControl,
    ...images
 
}