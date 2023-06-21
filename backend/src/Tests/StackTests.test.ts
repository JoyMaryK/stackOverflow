import {describe,it,expect} from 'vitest'
import {app} from '../app'
import request from 'supertest'


describe("/user tests", async() => {
    it('should return 401 if no token is passed', async() => {
      return request(app)
        .get('/users')
        .expect(401)
        .expect('Content-Type', /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Unathorized')
                })
            )
        })
    }),
    it('Should login user (200) given valid email and password',async ()=>{
        return request(app).post('/users/login')
          .expect('Content-Type', /json/)
          .expect(200)
          .send({
            email:'joy@gmail.com',
            password:'Password@1'
          })    
      }),

    it('should get users (200) if token is valid', async()=>{
        return   request(app).get('/users')
          .expect('Content-Type', /json/)
          .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
          .expect(200)
          .then((response:request.Response)=>{
             expect(response.body).toBeTruthy()}
             )   
      }) ,
      it('should not get users (403) if token is invalid ', async ()=>{
        return   request(app).get('/users')
          .expect('Content-Type', /json/)
          .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MTYxNjA1LCJleHAiOjE2ODc1MjE2MDV9.4Ru0e6bY9idd8_SwbQJognM6egRMkLhW96Ul_by2wyI")
          .expect(403)

      }) 

    //   //,
    it.skip ('Should add User', ()=>{
        return request(app).post('/users')
        .expect(201)
        .expect("Content-Type", /json/)
        .send({   
    "username":"joymary" ,
    "email":"joymary68962@gmail.com",
    "password":"Password@1"    
        })
    .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching("user registered!!")
            })
        )
    })
    })
      
    it('Should return 500 if user email exists', async ()=>{
        return request(app).post('/users')
        .expect(500)
        .expect("Content-Type", /json/)
        .send({   
    "username":"joymary" ,
    "email":"joymary68962@gmail.com",
    "password":"Password@1"    
        })
    })
    // ,
    it('Should return 401 if user tries to delete user', async()=>{
        return request(app).delete('/users/20f7413b-d88d-4370-93ef-54f8170f5fa2')
        .expect(401)
        .expect("Content-Type", /json/)
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")

        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Admin Operation')
                })
            )
        })
    })
  })

  describe("/questions tests", () => {
    it('should return 401 if no token is passed', async() => {
      return request(app)
        .get('/questions')
        .expect(401)
        .expect('Content-Type', /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Unathorized')
                })
            )
        })
    })
    ,
  it('should return one question corresponding to the id ', () => {
    return request(app)
      .get('/questions/question/551e5dbe-feab-4ced-b8a0-29331ce6c500')
      .expect(200)
      .expect('Content-Type', /json/)
      .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")  
          .then((response:request.Response)=>{
          expect(response.body).toEqual(
              expect.objectContaining({
                "body": "a whooooolle update",
                   "date": "2023-06-17T00:00:00.000Z",
                   "tag_names": "[{\"tagname\":\"nameeee\"}]",
                   "title": "update the question",
                  "username": "joy"
              })
          )
      })
  }),

  it('should return 404 if question is not there', () => {
    return request(app)
      .get('/questions/question/551e5db3e-feab-4ced-b8a0-29331ce6c500')
      .expect(404)
      .expect('Content-Type', /json/)
      .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")  
      .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('Not Found')
            })
        )
    })
  })
    it('Should add Question if token is valid ', ()=>{
        return request(app).post('/questions/20f7413b-d88d-4370-93ef-54f8170f5fa2')
        .expect(201)
        .expect("Content-Type", /json/)
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
        .send({
          "title":"questionnnn I am testing", 
         "body":"a whooooolle" ,
         "tags":[{"tid":"t1","tagname":"name"},{"tid":"t2","tagname":"name"}]
         
         })
    .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching("question submitted")
            })
        )
    })
  })


  it('Should return 401 if user deletes a question that is not theirs ', ()=>{
    return request(app).delete('/questions/delete/427cbb36-4e56-4794-b7d9-084e7c344578')
    .expect(401)
    .expect("Content-Type", /json/)
    .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDA3ODRhZC0zZDQyLTQxMDQtYmRiNi0yNjc1NjlhZGM0NTAiLCJ1c2VybmFtZSI6ImpveW1hcnkiLCJlbWFpbCI6ImpveW1hcjg5NjJAZ21haWwuY29tIiwibG9jYXRpb24iOm51bGwsImFib3V0IjpudWxsLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0MDk0NCwiZXhwIjoxNjg3NzAwOTQ0fQ.ZigLqi2HufWlE5tG_mVXbCarhIMFJRD90Tfpes6T__Q")
.then((response:request.Response)=>{
    expect(response.body).toEqual(
        expect.objectContaining({
            message:expect.stringMatching("Unauthorized")
        })
    )
})
})
})
    
describe("/answers tests", () => {
  it('should return 401 if no token is passed', () => {
    return request(app)
      .get('/answers/551e5dbe-feab-4ced-b8a0-29331ce6c500')
      .expect(401)
      .expect('Content-Type', /json/)
      .then((response:request.Response)=>{
          expect(response.body).toEqual(
              expect.objectContaining({
                  message:expect.stringMatching('Unathorized')
              })
          )
      })
  })

  it('should return 200 and answers if token exists ', () => {
    return request(app)
      .get('/answers/551e5dbe-feab-4ced-b8a0-29331ce6c500')
      .expect(200)
      .expect('Content-Type', /json/)
      .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDA3ODRhZC0zZDQyLTQxMDQtYmRiNi0yNjc1NjlhZGM0NTAiLCJ1c2VybmFtZSI6ImpveW1hcnkiLCJlbWFpbCI6ImpveW1hcjg5NjJAZ21haWwuY29tIiwibG9jYXRpb24iOm51bGwsImFib3V0IjpudWxsLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0MDk0NCwiZXhwIjoxNjg3NzAwOTQ0fQ.ZigLqi2HufWlE5tG_mVXbCarhIMFJRD90Tfpes6T__Q")
      .then((response:request.Response)=>{
        expect(response.body).toBeTruthy()}
        ) 
  })

  it('should return 201 and add answer ', () => {
    return request(app)
      .post('/answers/551e5dbe-feab-4ced-b8a0-29331ce6c500')
      .expect(201)
      .expect('Content-Type', /json/)
      .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
      .send({
        "answer": "the looong answer pt 2 ",
        "uid":"004a4795-8edb-41c3-b77e-f987f8b65f38"
       })
       .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('answer submitted')
            })
        )
    }) 
  })

  it('should return 200 and mark answer as preferred ', () => {
    return request(app)
      .post('/answers/prefer/c0e2b4d2-3e49-452b-a234-935b454ab2a0')
      .expect(200)
      .expect('Content-Type', /json/)
      .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
      .send({
        "qid":"551e5dbe-feab-4ced-b8a0-29331ce6c500" 
       })
       .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('marked as preferred')
            })
        )
    }) 
  })


  
})

describe("/comments tests", () => {
 it("should add a comment (201) given the token and answer id", ()=>{
    return request(app)
    .post('/comments/6a00655e-915c-42e0-8c44-e900c8b9dc9d')
    .expect('Content-Type', /json/)
    .expect(201)
    .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
    .send({
     comment:'the new comment',
          })    

 })

 it("should return (401) if no token is passed", ()=>{
  return request(app)
  .post('/comments/6a00655e-915c-42e0-8c44-e900c8b9dc9d')
  .expect('Content-Type', /json/)
  .expect(401)
  .then((response:request.Response)=>{
  expect(response.body).toEqual(
      expect.objectContaining({
          message:expect.stringMatching('Unathorized')
      })
  )
})

 })

 it("should return (200) and comments for the answer ", ()=>{
  return request(app)
  .get('/comments/6a00655e-915c-42e0-8c44-e900c8b9dc9d')
  .expect(200)
  .expect('Content-Type', /json/)
  .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
  .then((response:request.Response)=>{
    expect(response.body).toBeTruthy()}
    ) 
 })

})

describe("/tags tests", () => {
  it('should return 401 if no token is passed', () => {
    return request(app)
      .get('/tags')
      .expect(401)
      .expect('Content-Type', /json/)
      .then((response:request.Response)=>{
          expect(response.body).toEqual(
              expect.objectContaining({
                  message:expect.stringMatching('Unathorized')
              })
          )
      })
  })
  it('should get users (200) if token is valid', ()=>{
    return   request(app).get('/tags')
      .expect('Content-Type', /json/)
      .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
      .expect(200)
      .then((response:request.Response)=>{
         expect(response.body).toBeTruthy()}
         )   
  }) 
})


describe("/votes tests", () => {
  it('should return 401 if no token is passed to upvote ', () => {
    return request(app)
      .post('/votes/upvote/6a00655e-915c-42e0-8c44-e900c8b9dc9d')
      .expect(401)
      .expect('Content-Type', /json/)
      .then((response:request.Response)=>{
          expect(response.body).toEqual(
              expect.objectContaining({
                  message:expect.stringMatching('Unathorized')
              })
          )
      })
  }),
  it('should return 401 if no token is passed to downvote ', () => {
    return request(app)
      .post('/votes/downvote/6a00655e-915c-42e0-8c44-e900c8b9dc9d')
      .expect(401)
      .expect('Content-Type', /json/)
      .then((response:request.Response)=>{
          expect(response.body).toEqual(
              expect.objectContaining({
                  message:expect.stringMatching('Unathorized')
              })
          )
      })
  })

})