require('../../models')
const request = require("supertest")
const app = require('../../app')
const BASE_URL = '/api/v1/movies'
//genres

let genreId

beforeAll(async()=>{
    const genres = {
        name: 'comedy'
    
    }

   const res = await request(app)
    .post('/api/v1/genres')
    .send(genres)

    genreId = res.body.id
})

afterAll(async()=>{
    await request(app)
    .delete(`/api/v1/genres/${genreId}`)
})

//director
let directorId

beforeAll(async()=>{
    const directors = {
        firstName: 'Nima',
        lastName: ' Nourizadeh',
        nationality:'British',
        image:'https://es.wikipedia.org/wiki/Todd_Phillips#/media/Archivo:Todd_Phillips-64847.jpg', 
        birthday:'1977-11-12'
    
    }

   const res = await request(app)
    .post('/api/v1/directors')
    .send(directors)

    directorId = res.body.id
})

afterAll(async()=>{
    await request(app)
    .delete(`/api/v1/directors/${directorId}`)
})

// actor
let actorId

beforeAll(async()=>{
    const actors = {
        firstName: 'Todd Phillips',
        lastName: ' Bunzl',
        nationality:'American',
        image:'https://es.wikipedia.org/wiki/Todd_Phillips#/media/Archivo:Todd_Phillips-64847.jpg', 
        birthday:'1970-12-20'
    
    }

   const res = await request(app)
    .post('/api/v1/actors')
    .send(actors)

    actorId = res.body.id
})

afterAll(async()=>{
    await request(app)
    .delete(`/api/v1/actors/${actorId}`)
})

let movieId
//1)post
//2)GETAll
//3)getOne
//4)upDate
//5)delete

const movies = {
    name: 'project x',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Thomas_Mann_%2830703712211%29_%28cropped%29.jpg/330px-Thomas_Mann_%2830703712211%29_%28cropped%29.jpg',
    synopsis:'It is a comedy movie',
    releaseYear:'2012'
}

const movieUpdate = {
    name: 'one night',
}

test("POST -> 'BASE_URL', should return status code 201 and res.body to be defined res.body.name === movies.name", async () => {
    const res = await request(app)
     .post(BASE_URL)
     .send(movies)
     movieId = res.body.id
 
     expect(res.status).toBe(201)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.name).toBe(movies.name)
 })
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async()=>{
    const res = await request(app)
    .get(BASE_URL)
/*
 actors: [],
        directors: [],
        genres: []
      }
*/

   // console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].actors).toHaveLength(0)
    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].directors).toHaveLength(0)
    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)
    

})
// test GetOne
test("GET -> 'BASE_URL', should return status code 200 and res.body.name === movie.name ", async () => {
    const res = await request(app)
     .get(`${BASE_URL}/${movieId}`)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.name).toBe(movies.name)
     expect(res.body.id).toBe(movieId)

     expect(res.body.actors).toBeDefined()
    expect(res.body.actors).toHaveLength(0)
    expect(res.body.directors).toBeDefined()
    expect(res.body.directors).toHaveLength(0)
    expect(res.body.genres).toBeDefined()
    expect(res.body.genres).toHaveLength(0)
 })

 //test upDate
 test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.name to be movieUpdate.name ", async () => {
    const res = await request(app)
     .put(`${BASE_URL}/${movieId}`)
     .send(movieUpdate)
 
     expect(res.status).toBe(200)
 
     expect(res.body).toBeDefined()
 
     expect(res.body.name).toBe(movieUpdate.name)
     expect(res.body.id).toBe(movieId)
 })

 // test en los seteos

 test("POST -> '/movies/:id/actors', should return status code 200, and res.body to be defined", async ()=>{
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actorId])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(actorId)

    expect(res.body[0].movieActor.actorId).toBeDefined()
    expect(res.body[0].movieActor.actorId).toBe(actorId)
 })
 test("POST -> '/movies/:id/directors', should return status code 200, and res.body to be defined", async ()=>{
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([directorId])
    //console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(directorId)

    expect(res.body[0].movieDirector.directorId).toBeDefined()
    expect(res.body[0].movieDirector.directorId).toBe(directorId)
 })
 //test genres
 test("POST -> '/movies/:id/genres', should return status code 200, and res.body to be defined", async ()=>{
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genreId])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(genreId)

    expect(res.body[0].movieGenre.genreId).toBeDefined()
    expect(res.body[0].movieGenre.genreId).toBe(genreId)
 })

 //test remove

 test("Delete -> 'BASE_URL/:id', should return status code 204 ", async () => {
    const res = await request(app)
     .delete(`${BASE_URL}/${movieId}`)
 
     expect(res.status).toBe(204)
 
 })