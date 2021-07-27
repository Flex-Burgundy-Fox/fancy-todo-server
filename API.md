# API Doc Todo App

## Todo

### Show Todo

Mendapatkan semua data todo yang ada

- **URL**

  `/todos`

- **Method:**

  `GET`

- **Url Param:** none
- **Auth:** Diperlukan access_token di header
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
   {
    "result": [
        {
            "id": 12,
            "title": "Learn Swift",
            "description": "iOS Language",
            "status": "",
            "due_date": "2021-09-06T00:00:00.000Z",
            "createdAt": "2021-07-21T12:19:38.131Z",
            "updatedAt": "2021-07-21T13:33:57.028Z"
        },
        {
            "id": 10,
            "title": "Learn Vue",
            "description": "Front End",
            "status": "",
            "due_date": "2021-09-06T00:00:00.000Z",
            "createdAt": "2021-07-21T12:03:28.726Z",
            "updatedAt": "2021-07-21T13:53:57.011Z"
        },
        {
            "id": 1,
            "title": "Learn REST api",
            "description": "Server side part",
            "status": "done",
            "due_date": "2020-07-29T00:00:00.000Z",
            "createdAt": "2021-07-21T09:31:29.232Z",
            "updatedAt": "2021-07-21T14:10:10.544Z"
        },
        {
            "id": 16,
            "title": "Learn Product Excellence",
            "description": "Learning basics of Designing Product",
            "status": "",
            "due_date": "2021-10-30T00:00:00.000Z",
            "createdAt": "2021-07-21T14:24:04.350Z",
            "updatedAt": "2021-07-21T14:24:04.350Z"
        },
        {
            "id": 17,
            "title": "Learn Product Management",
            "description": "Learning basics of Designing Product",
            "status": "",
            "due_date": "2021-10-30T00:00:00.000Z",
            "createdAt": "2021-07-21T14:24:11.613Z",
            "updatedAt": "2021-07-21T14:24:11.613Z"
        }
    ]
}
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
    {error: 'Internal Server Error'} <br/>



---

### Add Todo

menambahkan data Todo

- **URL**

  `/todos`

- **Method:**

  `POST`

- **Url Param:** none
- **Auth:** Diperlukan access_token di header
- **Body:**

  ```json
  {
    "result": {
        "id": 17,
        "title": "Learn Product Management",
        "description": "Learning basics of Designing Product",
        "due_date": "2021-10-30T00:00:00.000Z",
        "updatedAt": "2021-07-21T14:24:11.613Z",
        "createdAt": "2021-07-21T14:24:11.613Z",
        "status": ""
    }   
    }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```json
    {
    "result": {
        "id": 17,
        "title": "Learn Product Management",
        "description": "Learning basics of Designing Product",
        "due_date": "2021-10-30T00:00:00.000Z",
        "updatedAt": "2021-07-21T14:24:11.613Z",
        "createdAt": "2021-07-21T14:24:11.613Z",
        "status": ""
    }   
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "Validation Error!"
  }
  ```
  - **Code:** 404 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "data not found"
  }
  ```

  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
  ```json
    {
        "error": "Internal Server Error"
    }
    ``` 
    <br />

---

### Show Todo by Id

Mendapatkan data todo yang ada sesuai Id

- **URL**

  `/todo/:id`

- **Method:**

  `GET`

- **Url Param:** none
- **Auth:** Diperlukan access_token di header
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
   {
    "result": [
        {
            "id": 1,
            "title": "Learn REST api",
            "description": "Server side part",
            "status": "done",
            "due_date": "2020-07-29T00:00:00.000Z",
            "createdAt": "2021-07-21T09:31:29.232Z",
            "updatedAt": "2021-07-21T14:10:10.544Z"
        }
    ]
}
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:**
   ```json
    {
        "error": "Internal Server Error"
    }
    ``` 
  - **Code:** 404 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "data not found"
  }
  ```
    
    
     <br/>



---

### PUT Todo

Mengganti data todo yang ada

- **URL**

  `/todos/:id`

- **Method:**

  `PUT`

- **Url Param:** none
- **Auth:** Diperlukan access_token di header
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
   {
    "result": [
        {
            "id": 12,
            "title": "Learn Swift",
            "description": "iOS Language",
            "status": "",
            "due_date": "2021-09-06T00:00:00.000Z",
            "createdAt": "2021-07-21T12:19:38.131Z",
            "updatedAt": "2021-07-21T13:33:57.028Z"
        }
    ]
}
    ```

- **Code:** 400 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "Validation Error!"
  }
  ```
  - **Code:** 404 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "data not found"
  }
  ```

  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
  ```json
    {
        "error": "Internal Server Error"
    }
    ```   
    <br/>



---

### PATCH Todos

Mengganti Status dari data Todos

- **URL**

  `/todos/:id`

- **Method:**

  `PATCH`

- **Url Param:** none
- **Auth:** Diperlukan access_token di header
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
   {
    "result": [
        {
            "id": 1,
            "title": "Learn REST api",
            "description": "Server side part",
            "status": "done",
            "due_date": "2020-07-29T00:00:00.000Z",
            "createdAt": "2021-07-21T09:31:29.232Z",
            "updatedAt": "2021-07-21T14:10:10.544Z"
        }
    ]
}
    ```

- **Code:** 400 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "Validation Error!"
  }
  ```
  - **Code:** 404 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "data not found"
  }
  ```

  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
  ```json
    {
        "error": "Internal Server Error"
    }
    ```   
     <br/>

---

### DELETE Todos

Mendelete data todos

- **URL**

  `/todos/:id`

- **Method:**

  `DELETE`

- **Url Param:** none
- **Auth:** Diperlukan access_token di header
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
   {
    "result": [
        {
            "result": "todo success to delete"
        }
    ]
}
    ```

  - **Code:** 404 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "data not found"
  }
  ```

  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
  ```json
    {
        "error": "Internal Server Error"
    }
    ```   
---

## User

### Register User

Meregister User kedalam database

- **URL**

  `/users/register`

- **Method:**

  `POST`

- **Url Param:** none
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
  {
    "email": "user2@mail.com"
  }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
   ```json
    {"error": "Internal Server Error"} 
  ```
    
  - **Code:** 400 BAD REQUEST <br />
  **Content:**

  ```json
  {
    "error" : "Validation Error!"
  }
  ```
  <br/>

---

### Login User

Meloginkan user dan mendapatkan token

- **URL**

  `//users/login`

- **Method:**

  `POST`

- **Url Param:** none

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```json
    
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGFzc3dvcmQiOiIkMmIkMTAkQ3Z4NUd5RHBlVEk4eVpaSGxNMnJDZWhjMjdZeUhsYm1wR3BzYTdaak4zNDF1N2xNcUFvL1ciLCJpYXQiOjE2MjczNzQwNDR9.bwLrQXKXSFh9BgsjrCGviRaFtiVjj_cMsDdwPNg2Rz0"
    }
    
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

  ```json
  {
    "error" : "Wrong Email or Password"
  }
  ```
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** 
  ```json
    {
        "error": "Internal Server Error"
    }
    ``` 
    <br />

---