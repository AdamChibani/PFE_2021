/*import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const services = {};

fs
.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
    let temp = require('./'+file);
    services[file] = temp;
});

module.exports = services;
*/