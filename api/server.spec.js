const request = require('supertest');

const server = require('./server.js');

it('should set db ENV to testing', function() {
    expect(process.env.DB_ENV)
    .toBe('testing')
})




