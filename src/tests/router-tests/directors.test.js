require('../../models')
const request = require("supertest")
const app = require('../../app')
const BASE_URL = '/api/v1/directors'



let directorId

const directors = {
    firstName: 'Nima',
    lastName: ' Nourizadeh',
    nationality:'British',
    image:'https://es.wikipedia.org/wiki/Todd_Phillips#/media/Archivo:Todd_Phillips-64847.jpg', 
    birthday:'1977-11-12'
}

const directorUpdate = {
    firstName: 'Whill'
}

test("POST -> 'BASE_URL', should return status code 201 and res.body to be defined res.body.firstName === directors.firstName", async () => {
    const res = await request(app)
     .post(BASE_URL)
     .send(directors)
     directorId = res.body.id
     expect(res.status).toBe(201)
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(directors.firstName)
 })
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)
   //console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
})

// test GetOne
test("GET -> 'BASE_URL', should return status code 200 and res.body.firstName === directors.firstName ", async () => {
    const res = await request(app)
     .get(`${BASE_URL}/${directorId}`)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(directors.firstName)
     expect(res.body.id).toBe(directorId)
 })

 //test upDate
 test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.firstName to be directorUpdate.firstName ", async () => {
    const res = await request(app)
     .put(`${BASE_URL}/${directorId}`)
     .send(directorUpdate)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(directorUpdate.firstName)
     expect(res.body.id).toBe(directorId)
 })


 //test remove

 test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
    const res = await request(app)
     .delete(`${BASE_URL}/${directorId}`)
 
     expect(res.status).toBe(204)
 
 })