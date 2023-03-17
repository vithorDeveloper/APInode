const path = require('path');

module.exports = {

  development: {
    client: 'sqlite3', //banco q vai ser usado
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db') //pasta onde esta o banco q vai ser usado
    },

    pool:{
      afterCreate: (conn,cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },

    useNullDefault: true
  }
};
