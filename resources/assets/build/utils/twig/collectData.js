const fs = require('fs');
const path = require('path');
const glob = require('glob');
const colors = require('colors/safe');

const config = require('../../../config');

module.exports = () => {
    let result = {};

    if (!fs.existsSync(config.layouts.dataDir)) {
        return result;
    }

    glob.sync(`${ config.layouts.dataDir }/*.json`, {}).forEach(file => {
        const name = path.basename(file, '.json');

        try {
            if (name === '_global') {
                result = {
                    ...JSON.parse(
                        fs.readFileSync(file).toString()
                    ),

                    ...result
                };
            } else {
                result[ name ] = JSON.parse(
                    fs.readFileSync(file).toString()
                );
            }
        } catch (e) {
            console.log(`[${ colors.red('%s') }] ${ colors.magenta('%s') }`, 'Can\'t parse file', file);
        }
    });

    return result;
};
