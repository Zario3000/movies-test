require('../../models')
const request = require("supertest")
const app = require('../../app')
const BASE_URL = '/api/v1/actors'



let actorId
//1)post
//2)GETAll
//3)getOne
//4)upDate
//5)delete

const actors = {
    firstName: 'Todd Phillips',
    lastName: ' Bunzl',
    nationality:'American',
    image:'https://es.wikipedia.org/wiki/Todd_Phillips#/media/Archivo:Todd_Phillips-64847.jpg', 
    birthday:'1970-12-20'

}

const actorUpdate = {
    firstName: 'Miguel'
}

test("POST -> 'BASE_URL', should return status code 201 and res.body to be defined res.body.firstName === actors.firstName", async () => {
    const res = await request(app)
     .post(BASE_URL)
     .send(actors)
     actorId = res.body.id
 
     expect(res.status).toBe(201)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(actors.firstName)
 })
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)
   //console.log(res.body)
   //movies: []
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
    expect(res.body[0].movies).toBeDefined()
    expect(res.body[0].movies).toHaveLength(0)


})


// test GetOne
test("GET -> 'BASE_URL', should return status code 200 and res.body.firstName === actor.firstName ", async () => {
    const res = await request(app)
     .get(`${BASE_URL}/${actorId}`)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(actors.firstName)
     expect(res.body.id).toBe(actorId)
     expect(res.body.movies).toBeDefined()
    expect(res.body.movies).toHaveLength(0)
 })

 //test upDate
 test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.firstName to be actorUpdate.firstName ", async () => {
    const res = await request(app)
     .put(`${BASE_URL}/${actorId}`)
     .send(actorUpdate)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(actorUpdate.firstName)
     expect(res.body.id).toBe(actorId)
 })


 //test remove

 test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
    const res = await request(app)
     .delete(`${BASE_URL}/${actorId}`)
 
     expect(res.status).toBe(204)
 
 })
/*
test("GET -> 'BASE_URL', should return status code 200 and res.body to havent length === 0", async () => {
   const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)

    expect(res.body).toBeDefined()

    expect(res.body).toHaveLength()
})
*/
/*test("GET -> 'BASE_URL', should return status code 200 and res.body.firstName to be actor.firstName ", async () => {
    const res = await request(app)
     .get(`${BASE_URL}/${actorId}`)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(actor.firstName)
 })
 test("UPDATE -> 'BASE_URL', should return status code 200 and res.body.name to be actorUpdate.firstName ", async () => {
    const res = await request(app)
     .put(`${BASE_URL}/${actorId}`)
     .send(actorUpdate)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.firstName).toBe(actorUpdate.firstName)
 })

 test("delete -> 'BASE_URL', should return status code 204 ", async () => {
    const res = await request(app)
     .delete(`${BASE_URL}/${actorId}`)
 
     expect(res.status).toBe(204)
 
 })*/