import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import {
  payload1,
  payload2,
  payload3,
  payload4,
  validateRule,
} from './test-data';

chai.should();
chai.use(chaiHttp);

describe('Test if all endpoints works as expected', async () => {
  describe('/ Should display candidate information', () => {
    it('it should get candidate info details', (done) => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/validate-rule should validate data sent to server', () => {
    it('should check if nested data is validated by rule', (done) => {
      chai
        .request(server)
        .post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          done();
        });
    });
    it('should check if unested data is validated by rule', (done) => {
      chai
        .request(server)
        .post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload4)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          done();
        });
    });
    it('should check validation is passed', (done) => {
      chai
        .request(server)
        .post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          done();
        });
    });
    it('should check rule is validated', (done) => {
      chai
        .request(server)
        .post('/validate-rule')
        .set('Accept', 'application/json')
        .send(validateRule)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          done();
        });
    });
    it('should check if data is validated by rule', (done) => {
      chai
        .request(server)
        .post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload3)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql('error');
          done();
        });
    });
  });
});
