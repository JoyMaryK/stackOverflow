import {describe,it,expect} from 'vitest'
import app from '../server'
import request from 'supertest'

describe("/user tests", () => {
    it('should return 401 if no token is passed', () => {
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
    it('Should login user (200) given valid email and password',()=>{
        return request(app).post('/users/login')
          .expect('Content-Type', /json/)
          .expect(200)
          .send({
            email:'joy@gmail.com',
            password:'Password@1'
          })    
      }),

    it('should get users (200) if token is valid', ()=>{
        return   request(app).get('/users')
          .expect('Content-Type', /json/)
          .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE")
          .expect(200)
          .then((response:request.Response)=>{
             expect(response.body).toBeTruthy()}
             )   
      }) ,
      it('should not get users (403) if token is invalid ', ()=>{
        return   request(app).get('/users')
          .expect('Content-Type', /json/)
          .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MTYxNjA1LCJleHAiOjE2ODc1MjE2MDV9.4Ru0e6bY9idd8_SwbQJognM6egRMkLhW96Ul_by2wyI")
          .expect(403)

      }) 
    //   //,
    // // it('Should add User', ()=>{
    // //     return request(app).post('/users')
    // //     .expect(201)
    // //     .expect("Content-Type", /json/)
    // //     .send({   
    // // "username":"joymary" ,
    // // "email":"joymary68962@gmail.com",
    // // "password":"Password@1"    
    // //     })
    // // .then((response:request.Response)=>{
    // //     expect(response.body).toEqual(
    // //         expect.objectContaining({
    // //             message:expect.stringMatching("user registered!!")
    // //         })
    // //     )
    // // })
    // // })
    //   //,
    it('Should return 500 if user email exists', ()=>{
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
    it('should return 401 if no token is passed', () => {
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
  //   ,
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

})
    