require('../../models')
const request = require("supertest")
const app = require('../../app')
const BASE_URL = '/api/v1/genres'

let genreId
const genres = {
    name:'action'
}




const genreUpdate = {
    name: 'romantic'
}

test("POST -> 'BASE_URL', should return status code 201 and res.body to be defined res.body.name === genres.name", async () => {
    const res = await request(app)
     .post(BASE_URL)
     .send(genres)
     genreId = res.body.id
 
     expect(res.status).toBe(201)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.name).toBe(genres.name)
 })
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)
   console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
})


// test GetOne
test("GET -> 'BASE_URL', should return status code 200 and res.body.name === genres.name ", async () => {
    const res = await request(app)
     .get(`${BASE_URL}/${genreId}`)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(genres.name)
     expect(res.body.id).toBe(genreId)
 })

 //test upDate
 test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.name to be genreUpdate.name ", async () => {
    const res = await request(app)
     .put(`${BASE_URL}/${genreId}`)
     .send(genreUpdate)
 
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
 
     expect(res.body.name).toBe(genreUpdate.name)
     expect(res.body.id).toBe(genreId)
 })

 //test remove

 test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
    const res = await request(app)
     .delete(`${BASE_URL}/${genreId}`)
 
     expect(res.status).toBe(204)
 
 })