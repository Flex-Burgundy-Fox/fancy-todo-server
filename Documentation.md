# Todo App
## Show All Todo

- **URL**
  `/todos`

- **Method:**
  `GET`

- **Data Headers**: 
    ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoiZ3VsaXNAbWFpbC5jb20iLCJpYXQiOjE2Mjc5MDI2Njd9.tfbCRcdneH6GDdJjHN0_skBRI5P1EAvbH0aVeF1ABHA"
        }
    ```

- **URL Params**: none

- **Data Params**: none

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**

    ```json
    {
    "token": [
        {
            "id": 11,
            "title": "Nyuci piring",
            "description": "mesti kelar",
            "status": "[Open || Closed",
            "due_date": "2022-01-01T00:00:00.000Z",
            "createdAt": "2021-07-25T08:23:55.399Z",
            "updatedAt": "2021-07-25T08:23:55.399Z",
            "email": "gulis@mail.com"
        }
      ]
    }
    ```

- **Error Response:**

  - **Code:** 400 No data exist <br />
    **Content:** 
    ```json
        {
            "name": "No data exist",
            "error": []
        }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        }
    ```

## Create New Todo

- **URL**
  `/todos`

- **Method:**
  `POST`

- **Data Headers**: 
    ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoiZ3VsaXNAbWFpbC5jb20iLCJpYXQiOjE2Mjc5MDI2Njd9.tfbCRcdneH6GDdJjHN0_skBRI5P1EAvbH0aVeF1ABHA"
        }
    ```

- **URL Params**: none

- **Data Params**:
  ```json
  {
    "title": "<todo name>",
    "description": "<todo desc>",
    "status": "[Open || Closed]",
    "due_date": "2021-07-31"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```json
    {
        "message": "Successfully created",
        "result": {
            "id": 19,
            "title": "Mandi",
            "description": "ini contoh",
            "status": "Closed",
            "due_date": "2021-07-31T00:00:00.000Z",
            "UserId": 8,
            "updatedAt": "2021-07-25T11:59:27.767Z",
            "createdAt": "2021-07-25T11:59:27.767Z"
        }
    }
    ```

- **Error Response:**

  - **Code:** 400 Validation Error <br />
    **Content:** 
    ```json
        {
          "result": [
              {
              "name": "SequelizeValidationError",
              "error": [
                    "Title can not be empty",
                    "Description can not be empty",
                    "Date must be greater than or equals to current date",
                    "Status can not be null",
                    "Status must be either 'Open' or 'Closed' or null"
                ]
        } 
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        } 
    ```

## Register

- **URL**
  `/register`

- **Method:**
  `POST`

- **URL Params**: none

- **Data Params**:

  ```json
  {
    "email": "<valid email format>",
    "password": "<minimal 6 character>"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
        {
            "message": "Successfully registered",
            "email": "ujang@mail.com"
        }
    ```

- **Error Response:**

  - **Code:** 400 Validation Error <br />
    **Content:** 
    ```json
        {
            "name": "SequelizeValidationError",
            "error": [
                "Email format is not correct",
                "Password at least have 6 characters",
                "Email format is not correct",
                "Email has been used"
            ]
        }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        } 
    ```


## Login

- **URL**
  `/login`

- **Method:**
  `POST`

- **URL Params**: none

- **Data Params**:

  ```json
  {
    "email": "<valid email format>",
    "password": "<minimal 6 character>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
        {
            "message": "Successfully logged in",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoidWphbmdAbWFpbC5jb20iLCJpYXQiOjE2MjcyMTU1MzF9.CwEvKh66pNnPuBy6kNwJs_AEq8_50IA_4EHwZOaTDzE"
        }
    ```

- **Error Response:**

  - **Code:** 400 Email not found <br />
    **Content:** 
    ```json
        {
            "name": "Login Failed",
            "error": [
                "Email not found"
            ]
        }
    ```

  - **Code:** 400 Wrong Email or password <br />
    **Content:** 
    ```json
        {
            "name": "Login Failed",
            "error": [
                "Email or password is wrong"
            ]
        }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        } 
    ```

## Get Todo Detail

- **URL**
  `/todos/:id`

- **Method:**
  `GET`

- **Data Headers**: 
    ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoiZ3VsaXNAbWFpbC5jb20iLCJpYXQiOjE2Mjc5MDI2Njd9.tfbCRcdneH6GDdJjHN0_skBRI5P1EAvbH0aVeF1ABHA"
        }
    ```

- **URL Params**: id

- **Data Params**: none

- **Success Response:**
    ```json
        {
            "result": [
                {
                    "id": 11,
                    "title": "Nyuci piring",
                    "description": "mesti kelar",
                    "status": "Open",
                    "due_date": "2022-01-01T00:00:00.000Z",
                    "email": "gulis@mail.com",
                    "createdAt": "2021-07-25T08:23:55.399Z",
                    "updatedAt": "2021-07-25T08:23:55.399Z"
                }
            ]
        }
    ```

- **Error Response:**

  - **Code:** 400 No data found <br />
    **Content:** 
    ```json
        {
            "name": "Data not found",
            "error": []
        }
    ```

  - **Code:** 401 Authenticaton Error <br />
    **Content:** 
    ```json
        {
            "name": "Authenticaton Failed",
            "error": [
                {
                    "name": "JsonWebTokenError",
                    "message": "invalid token"
                }
            ]
        }
    ```

  - **Code:** 401 Authorization Error <br />
    **Content:**
    ```json
        {
            "name": "Authorization Error",
            "error": [
                "User not authorized"
            ]
        }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        } 
    ```

## Edit Todo (PUT)

- **URL**
  `/todos/:id`

- **Method:**
  `PUT`

- **Data Headers**: 
    ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoiZ3VsaXNAbWFpbC5jb20iLCJpYXQiOjE2Mjc5MDI2Njd9.tfbCRcdneH6GDdJjHN0_skBRI5P1EAvbH0aVeF1ABHA"
        }
    ```

- **URL Params**: id

- **Data Params**:
  ```json
        {
            "title": "<todo name>",
            "description": "<todo desc>",
            "status": "[Open || Closed]",
            "due_date": "2021-07-31"
        }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
        {
            "message": "Successfully updated",
            "result": [
                {
                    "id": 11,
                    "title": "Belanja",
                    "description": "Ini deskripsi",
                    "status": "Closed",
                    "due_date": "2021-07-31T00:00:00.000Z",
                    "UserId": 8,
                    "createdAt": "2021-07-25T08:23:55.399Z",
                    "updatedAt": "2021-07-25T12:37:00.673Z"
                }
            ]
        }
    ```

- **Error Response:**

  - **Code:** 400 No data found <br />
    **Content:** 
    ```json
        {
            "name": "Data not found",
            "error": []
        }
    ```

  - **Code:** 400 Validation Error <br />
    **Content:** 
    ```json
        {
          "result": [
              {
              "name": "SequelizeValidationError",
              "error": [
                    "Title can not be empty",
                    "Description can not be empty",
                    "Date must be greater than or equals to current date",
                    "Status must be either 'Open' or 'Closed'"
                ]
        } 
    ```

  - **Code:** 401 Authenticaton Error <br />
    **Content:** 
    ```json
        {
            "name": "Authenticaton Failed",
            "error": [
                {
                    "name": "JsonWebTokenError",
                    "message": "invalid token"
                }
            ]
        }
    ```

  - **Code:** 401 Authorization Error <br />
    **Content:**
    ```json
        {
            "name": "Authorization Error",
            "error": [
                "User not authorized"
            ]
        }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        } 
    ```

## Edit Status Todo (PATCH)

- **URL**
  `/todos/:id`

- **Method:**
  `PATCH`

- **Data Headers**: 
    ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoiZ3VsaXNAbWFpbC5jb20iLCJpYXQiOjE2Mjc5MDI2Njd9.tfbCRcdneH6GDdJjHN0_skBRI5P1EAvbH0aVeF1ABHA"
        }
    ```

- **URL Params**: id

- **Data Params**:
  ```json
        {
            "status": "[Open || Closed]",
        }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
        {
            "message": "Successfully updated",
            "result": [
                {
                    "id": 11,
                    "title": "Makan Malam",
                    "description": "Ini contoh deskripsi",
                    "status": "Closed",
                    "due_date": "2021-07-31T00:00:00.000Z",
                    "UserId": 8,
                    "createdAt": "2021-07-25T08:23:55.399Z",
                    "updatedAt": "2021-07-25T12:40:10.651Z"
                }
            ]
        }
    ```

- **Error Response:**

  - **Code:** 400 No data found <br />
    **Content:** 
    ```json
        {
            "name": "Data not found",
            "error": []
        }
    ```

  - **Code:** 400 Validation Error <br />
    **Content:** 
    ```json
        {
          "result": [
              {
              "name": "SequelizeValidationError",
              "error": [
                    "Status can not be empty",
                    "Status must be either 'Open' or 'Closed'"
                ]
        } 
    ```

  - **Code:** 401 Authenticaton Error <br />
    **Content:** 
    ```json
        {
            "name": "Authenticaton Failed",
            "error": [
                {
                    "name": "JsonWebTokenError",
                    "message": "invalid token"
                }
            ]
        }
    ```

  - **Code:** 401 Authorization Error <br />
    **Content:**
    ```json
        {
            "name": "Authorization Error",
            "error": [
                "User not authorized"
            ]
        }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        } 
    ```

## Delete Todo 

- **URL**
  `/todos/:id`

- **Method:**
  `DELETE`

- **Data Headers**: 
    ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoiZ3VsaXNAbWFpbC5jb20iLCJpYXQiOjE2Mjc5MDI2Njd9.tfbCRcdneH6GDdJjHN0_skBRI5P1EAvbH0aVeF1ABHA"
        }
    ```

- **URL Params**: id

- **Data Params**: none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
        {
            "message": "Successfully deleted"
        }
    ```

- **Error Response:**

  - **Code:** 400 No data found <br />
    **Content:** 
    ```json
        {
            "name": "Data not found",
            "error": []
        }
    ```

  - **Code:** 401 Authenticaton Error <br />
    **Content:** 
    ```json
        {
            "name": "Authenticaton Failed",
            "error": [
                {
                    "name": "JsonWebTokenError",
                    "message": "invalid token"
                }
            ]
        }
    ```

  - **Code:** 401 Authorization Error <br />
    **Content:**
    ```json
        {
            "name": "Authorization Error",
            "error": [
                "User not authorized"
            ]
        }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
        {
            "name": "Internal Server Error",
            "error": [
                {}
            ]
        } 
    ```

 