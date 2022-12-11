const fs = require('fs');
const path = require('path');

const resolve = (dir) => {
    return path.join(__dirname, '../src', dir)
}
function getPackageConfig(path) {
    const packagesList = fs.readdirSync(resolve(path)),
        config = {};
    packagesList.forEach(i => {
        const itemName = i.substring(0, i.lastIndexOf('.'))
        config[`${path}/${itemName}`] = `@/${path}/${i}`
    })
    return config
}
exports.entryList = Object.assign({}, getPackageConfig('css'), getPackageConfig('utils'))