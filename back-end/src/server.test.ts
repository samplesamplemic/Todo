import supertest from "supertest";
import app from './app';

const request = supertest(app);

test('get /todos', async() => {const todo = [{}]
const response = await request
.get('/todos')
.expect(200)
.expect('Content-Type', 'application/json');

expect(response.body).toEqual(todo)})