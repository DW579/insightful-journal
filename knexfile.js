module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/capstone-database'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
