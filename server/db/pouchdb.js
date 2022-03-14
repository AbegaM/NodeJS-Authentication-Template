const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
PouchDB.plugin(require("pouchdb-authentication"));
const path = require("path");

const db = new PouchDB(path.join(__dirname, "../../localDatabase"));
module.exports = db;
