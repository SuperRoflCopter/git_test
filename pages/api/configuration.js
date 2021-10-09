export const config = {
    user: 'azvbqjixesvbze', // env var: PGUSER
    database: 'd67cgqpa5nd64v', // env var: PGDATABASE
    password: '6dc193685efe3c5a6266f7bcd482bd1eeb5e9c185133e2a4d02bc53e777da37e', // env var: PGPASSWORD
    host: 'ec2-54-154-101-45.eu-west-1.compute.amazonaws.com', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    ssl: {
      rejectUnauthorized: false,
    },
  }