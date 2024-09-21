import request from 'supertest';
import server from '../../server_test.js';

describe('Login Page', () => {
  it('should render the login page', async () => {
    const response = await request(server).get('/login');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Log in')
  });
});

describe('Main page', () => {
  it('should render the main page', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Log in');
  });
});

describe('Register page', () => {
    it('should render the register page', async () => {
      const response = await request(server).get('/register');
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('Sign up');
    });
  });
  
  