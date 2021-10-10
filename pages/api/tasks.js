const pg = require('pg')
const { config } = require('./configuration')
// var connectionString = "postgres://azvbqjixesvbze:6dc193685efe3c5a6266f7bcd482bd1eeb5e9c185133e2a4d02bc53e777da37e@ec2-54-154-101-45.eu-west-1.compute.amazonaws.com:5432/d67cgqpa5nd64v"

export default async function handler(req, res) {
    const pool = new pg.Pool(config)
    const client = await pool.connect()

    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM tasks')
      client.release()
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(rows));
    }
    if(req.method === 'POST') {
      const {
        label,
        interval,
        startDate,
      } = req.body
      const result = await pool.query(`INSERT INTO tasks(label, "interval", "startDate")VALUES('${label}','${interval}',to_timestamp(${startDate}))`)
      if(result?.severity === 'ERROR') {
        res.statusCode = 500
        res.end(result.detail)
      }
      console.log("result", result)
      client.release()
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end()
    } else {
      console.log('nothing')
    }
  }

