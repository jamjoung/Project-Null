require('dotenv').config()

const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://bymaxobtrjbrig:14fc060cf577713b7b9fd68f374069fac34e98b7ed7336bf38168ff7fbd2f11d@ec2-3-228-114-251.compute-1.amazonaws.com:5432/d1945k2sqfb0rn`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports = {pool}
