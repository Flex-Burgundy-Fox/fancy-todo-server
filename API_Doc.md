# API DOC TODO

## Add Todo
----
menambahkan Todo ke dalam database

* **URL**

    ``/todos`

* **Method:**
  
    ``POST` 
  
*  **URL Params** : none

* **Data Params**
  * **Body:** <br />
    {
      "title": "<todo title> required",
      "description": "<todo description> required",
      "status": "<todo status>",
      "due_date": "<todo date> required",
    }

* **Success Response:** 
  * **Code:** 201 <br />
    **Content:** 
  ```json
  {
    "result": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "string",
        "due_date": "date",
        "UserId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
      }
  }
  ```
 
* **Error Response:**
  * **Code:** 400 VALIDATION ERRORS <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "(MESSAGE OF VALIDATION ERRORS)"
         ] 
      }
      ```

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```
--------------------------------------------------
## Show Todo
----
mengembalikan semua data Todo yang ada di dalam database

* **URL**

    ``/todos`

* **Method:**
  
    ``GET` 
  
*  **URL Params** : none

* **Data Params** : none

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "result": [
      {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "string",
        "due_date": "date",
        "UserId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
      }
    ]
  }
  ```
 
* **Error Response:**
  
  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```

--------------------------------------------------
## Show Todo by Id
----
mengembalikan data Todo yang ada di dalam database sesuai dengan IDnya

* **URL**

    ``/todos/:id`

* **Method:**
  
    ``GET` 
  
*  **URL Params** : required: TodoId=[number]

* **Data Params** : none

* **Success Response:** 
  * **Code:** 201 <br />
    **Content:** 
  ```json
  {
    "result": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "string",
        "due_date": "date",
        "UserId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
      }
  }
  ```
 
* **Error Response:**
  * **Code:** 404 Not Found <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "Data not found"
         ] 
      }
      ```

--------------------------------------------------
## Put Todo by Id
----
Edit data Todo di dalam database yang dipilih berdasarkan id

* **URL**

    ``/todos/:id`

* **Method:**
  
    ``PUT` 
  
*  **URL Params** : required: TodoId=[number]

* **Data Params**
  * **Body:** <br />
    {
      "title": "<todo title> required",
      "description": "<todo description> required",
      "status": "<todo status>",
      "due_date": "<todo date> required",
    }

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "result": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "string",
        "due_date": "date",
        "UserId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
      }
  }
  ```
 
* **Error Response:**
  * **Code:** 400 VALIDATION ERRORS <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "(MESSAGE OF VALIDATION ERRORS)"
         ] 
      }
      ```
  * **Code:** 404 Not Found <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "Data not found"
         ] 
      }
      ```

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```


--------------------------------------------------
## PATCH Todo by Id
----
Edit status Todo di dalam database yang dipilih berdasarkan id

* **URL**

    ``/todos/:id`

* **Method:**
  
    ``PATCH` 
  
*  **URL Params** : required: TodoId=[number]

* **Data Params**
  * **Body:** <br />
    {
      "status": "<todo status>"
    }

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "result": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "status": "string",
        "due_date": "date",
        "UserId": "integer",
        "updatedAt": "date",
        "createdAt": "date"
      }
  }
  ```
 
* **Error Response:**
  * **Code:** 400 VALIDATION ERRORS <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "(MESSAGE OF VALIDATION ERRORS)"
         ] 
      }
      ```
  * **Code:** 404 Not Found <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "Data not found"
         ] 
      }
      ```

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```


--------------------------------------------------
## DELETE Todo by Id
----
Edit status Todo di dalam database yang dipilih berdasarkan id

* **URL**

    ``/todos/id`

* **Method:**
  
    ``DELETE` 
  
*  **URL Params** : required: TodoId=[number]

* **Data Params**: none

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "message" : "todo success to delete"
  }
  ```
 
* **Error Response:**
  * **Code:** 404 Not Found <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "Data not found"
         ] 
      }
      ```

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "error" : "internal server error" 
    }
    ```


--------------------------------------------------
## Register User
----
add user to Database

* **URL**

    ``/users/register`

* **Method:**
  
    ``POST` 
  
*  **URL Params** : none

* **Data Params**
  * **Body:** <br />
        {
          "email": "<user email>"
          "password": "<user password>"
        }
        
* **Success Response:** 
  * **Code:** 201 <br />
    **Content:** 
  ```json
  {
    "id": "integer",
    "email": "string"
  }
  ```
 
* **Error Response:**
   * **Code:** 400 VALIDATION ERRORS <br />
      **Content:** 
      ```json
      { 
         "error" : [
           "(MESSAGE OF VALIDATION ERRORS)"
         ] 
      }
      ```


--------------------------------------------------
## Login User
----
user Login to app

* **URL**

    ``/users/login`

* **Method:**
  
    ``POST` 
  
*  **URL Params** : none

* **Data Params**
  * **Body:** <br />
      {
        "email": "<user email>"
        "password": "<user password>"
      }

* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** 
  ```json
  {
    "access_token": "string"
  }
  ```
 
* **Error Response:**
   * **Code:** 400 LOGIN FAILED <br />
      **Content:** 
      ```json
      { 
         "error" : "Email or Password incorrect"
      }
      ```

