const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('../../../config');

const connections = {};

const createConnection = async (name = 'general', fromLayouts = false) => {
    const { Low, JSONFile } = await import('lowdb');

    const dbDir = fromLayouts ? config.layouts.dataDir : config.mockServer.dbDir;

    if (!fs.existsSync(dbDir)) {
        mkdirp.sync(dbDir);
    }

    const filePath = path.join(dbDir, `${ name }.json`);

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}');
    }

    const adapter = new JSONFile(filePath);
    const db = new Low(adapter);

    await db.read();

    return db;
};

module.exports = async (name = 'general', fromLayouts = false) => {
    if (!connections[ name ]) {
        connections[ name ] = await createConnection(name, fromLayouts);
    } else {
        await connections[ name ].read();
    }

    return connections[ name ];
};
