const request = require('supertest')
const db = require('../database/dbConfig.js')
const server = require('../api/server.js')

describe('auth-router.js', ()=>{
    beforeEach(async () => {
        await db('users').truncate();
      });

      describe('POST to /api/auth/register', () => {
        it('responds with 201 OK', async done => {
          await request(server)
            .post('/api/auth/register')
            .send({ username: 'newuser01', password: 'pass01' })
            .expect(201);
    
          done();
        });
    
        it('responds with JSON', async done => {
          await request(server)
            .post('/api/auth/register')
            .send({ username: 'newuser01', password: 'pass01' })
            .expect('Content-Type', /json/i);
    
          done();
        });
      });
    
      describe('POST  to /api/auth/login', () => {
        it('responds with 200 OK', async done => {
          await request(server)
            .post('/api/auth/register')
            .send({ username: 'newuser01', password: 'pass01'  });
    
            request(server)
            .post('/api/auth/login')
            .send({ username: 'newuser01', password: 'pass01'  })
            .expect(200);
    
          done();
        });
    
        it('responds with JSON', async done => {
          await request(server)
            .post('/api/auth/register')
            .send({ username: 'newuser01', password: 'pass01'  });
    
             request(server)
            .post('/api/auth/login')
            .send({username: 'newuser01', password: 'pass01' })
            .expect('Content-Type', /json/i);
    
          done();
        });
      });
    });