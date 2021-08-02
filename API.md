**Add Todo**
----
  `Add todo data to database can be via json or x-www-form-urlencoded.`

* **URL**

  `/todos`

* **Method:**
  
  `POST`
  
*  **URL Params**

    `None`

* **Data Params**

  ```json
    {
      "title": "Minum obat",
      "description": "Minum obat batuk biar cepat sembuh",
      "status": "belum dikerjakan",
      "due_date": "2021-07-21"
    }
  ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
      "todo": {
          "id": 17,
          "title": "Minum obat",
          "description": "Minum obat batuk biar cepat sembuh",
          "status": "belum dikerjakan",
          "due_date": "2021-07-21T00:00:00.000Z",
          "updatedAt": "2021-07-21T08:39:50.820Z",
          "createdAt": "2021-07-21T08:39:50.820Z"
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    { "message": "Only allow today's date or the date after this" }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "message": "SequelizeConnectionError" }
    ```

**Show Todos**
----
  `Display all todo data from database.`

* **URL**

  `/todos`

* **Method:**
  
  `GET`
  
*  **URL Params**

    **Required:**
  
    `id=[integer]`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "todos": [
        {
            "id": 1,
            "title": "Mengerjakan challenge Hacktiv8",
            "description": "Challenge Todo deadline akhir minggu",
            "status": "sudah dikerjakan",
            "due_date": "2021-07-21T00:00:00.000Z",
            "createdAt": "2021-07-21T04:34:18.668Z",
            "updatedAt": "2021-07-21T07:50:14.964Z"
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "message": "SequelizeConnectionError" }
    ```

**Show Todo By ID**
----
  `Display single todo data from database based on req.params.id.`

* **URL**

  `/todos/:id`

* **Method:**
  
  `GET`
  
*  **URL Params**

    **Required:**
  
    `id=[integer]`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "todo": {
          "id": 17,
          "title": "Minum obat",
          "description": "Minum obat batuk biar cepat sembuh",
          "status": "belum dikerjakan",
          "due_date": "2021-07-21T00:00:00.000Z",
          "updatedAt": "2021-07-21T08:39:50.820Z",
          "createdAt": "2021-07-21T08:39:50.820Z"
      }
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    { "message": "Data not found" }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "message": "SequelizeConnectionError" }
    ```

**Update Todo By ID**
----
  `Updating todo data from database based on req.params.id.`

* **URL**

  `/todos/:id`

* **Method:**
  
  `PUT`
  
*  **URL Params**

    **Required:**
  
    `id=[integer]`

* **Data Params**

  ```json
    {
      "title": "Charge powerbank",
      "description": "Charge powerbank sampai full biar aman kalau keluar rumah",
      "status": "belum dikerjakan",
      "due_date": "2021-07-21"
    }
  ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "todo": {
          "id": 6,
          "title": "Charge powerbank",
          "description": "Charge powerbank sampai full biar aman kalau keluar rumah",
          "status": "belum dikerjakan",
          "due_date": "2021-07-21T00:00:00.000Z",
          "createdAt": "2021-07-21T04:49:49.329Z",
          "updatedAt": "2021-07-21T13:06:19.421Z"
      }
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    { "message":  "Data not found" }
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    { "message": "Only allow today's date or the date after this" }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "message": "SequelizeConnectionError" }
    ```

**Update Status Todo By ID**
----
  `Updating "status" todo data from database based on req.params.id.`

* **URL**

  `/todos/:id`

* **Method:**
  
  `PATCH`
  
*  **URL Params**

    **Required:**
  
    `id=[integer]`

* **Data Params**

  ```json
    {
      "status": "Sudah dikerjakan",
    }
  ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "todo": {
          "id": 6,
          "title": "Charge powerbank",
          "description": "Charge powerbank sampai full biar aman kalau keluar rumah",
          "status": "Sudah dikerjakan",
          "due_date": "2021-07-21T00:00:00.000Z",
          "createdAt": "2021-07-21T04:49:49.329Z",
          "updatedAt": "2021-07-21T13:06:19.421Z"
      }
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    { "message":  "Data not found" }
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    { "message": "Only allow today's date or the date after this" }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "message": "SequelizeConnectionError" }
    ```

**Update Todo By ID**
----
  `Updating todo data from database based on req.params.id.`

* **URL**

  `/todos/:id`

* **Method:**
  
  `PUT`
  
*  **URL Params**

  **Required:**
 
  `id=[integer]`

* **Data Params**

  ```json
    {
      "title": "Charge powerbank",
      "description": "Charge powerbank sampai full biar aman kalau keluar rumah",
      "status": "belum dikerjakan",
      "due_date": "2021-07-21"
    }
  ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "todo": {
          "id": 6,
          "title": "Charge powerbank",
          "description": "Charge powerbank sampai full biar aman kalau keluar rumah",
          "status": "belum dikerjakan",
          "due_date": "2021-07-21T00:00:00.000Z",
          "createdAt": "2021-07-21T04:49:49.329Z",
          "updatedAt": "2021-07-21T13:06:19.421Z"
      }
    }```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    { "message":  "Data not found" }
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    { "message": "Only allow today's date or the date after this" }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "message": "SequelizeConnectionError" }
    ```

**Delete Todo By ID**
----
  `Delete todo data from database based on req.params.id.`

* **URL**

  `/todos/:id`

* **Method:**
  
  `DELETE`
  
*  **URL Params**

    **Required:**
  
    `id=[integer]`

* **Data Params**

  `None`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "message": "Success, data has been deleted"
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    { "message":  "Data not found" }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { "message": "SequelizeConnectionError" }
    ```