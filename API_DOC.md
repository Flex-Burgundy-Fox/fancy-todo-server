# API Doc Fancy Todo App

## Todos

### Show Todoes

Mendapatkan semua data todo yang ada

- **URL**

  `/todos`

- **Method:**

  `GET`

- **Url Param:** none
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "title": "<todo name>",
        "description": "<todo desc>",
        "status": "<Done | Not Done>",
        "due_date": "2021-05-24T00:56:21.112Z",
        "createdAt": "2021-05-24T00:56:21.112Z",
        "updatedAt": "2021-05-24T00:56:21.112Z"
      },
      {
        "id": 2,
        "title": "<todo name>",
        "description": "<todo desc>",
        "status": "<Done | Not Done>",
        "due_date": "2021-05-24T00:56:21.112Z",
        "createdAt": "2021-05-24T00:56:21.112Z",
        "updatedAt": "2021-05-24T00:56:21.112Z"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Add Todoes

menambahkan data todo

- **URL**

  `/todos`

- **Method:**

  `POST`

- **Url Param:** none
- **Body:**

  ```json
  {
    "title": "<todo name>",
    "description": "<todo desc>",
    "status": "<Done | Not Done>",
    "due_date": "2021-05-24T00:56:21.112Z"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```json
    {
        "id": "<id movie>",
        "title": "<todo name>",
        "description": "<todo desc>",
        "status": "<Done | Not Done>",
        "due_date": "2021-05-24T00:56:21.112Z",
        "createdAt": "2021-05-24T00:56:21.112Z",
        "updatedAt": "2021-05-24T00:56:21.112Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 VALIDATION ERROR <br />
    **Content:**

  ```json
  {
    "message": "Validation error: Validation isAfter on due_date failed"
  }
  ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />

---

### Find Todoes

mencari data todo

- **URL**

  `/todos/:id`

- **Method:**

  `GET`

- **Url Param:**
  required: `id=[number]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
        "id": "<id movie>",
        "title": "<todo name>",
        "description": "<todo desc>",
        "status": "<Done | Not Done>",
        "due_date": "2021-05-24T00:56:21.112Z",
        "createdAt": "2021-05-24T00:56:21.112Z",
        "updatedAt": "2021-05-24T00:56:21.112Z"
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "error not found"
    }
    ```
  - **Code:** 500 INTERNAL SERVER ERROR <br />
---

### Edit Todoes

mengubah data todo

- **URL**

  `/todos/:id`

- **Method:**

  `PUT`

- **Url Param:**
  required: `id=[number]`
- **Body:**

  ```json
  {
    "title": "<todo name>",
    "description": "<todo desc>",
    "status": "<Done | Not Done>",
    "due_date": "2021-05-24T00:56:21.112Z"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
        "id": "<id movie>",
        "title": "<todo name>",
        "description": "<todo desc>",
        "status": "<Done | Not Done>",
        "due_date": "2021-05-24T00:56:21.112Z",
        "createdAt": "2021-05-24T00:56:21.112Z",
        "updatedAt": "2021-05-24T00:56:21.112Z"
    }
    ```

- **Error Response:**
  - **Code:** 400 VALIDATION ERROR <br />
    **Content:**

    ```json
    {
        "message": "Validation error: Validation isAfter on due_date failed"
    }
    ```

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "error not found"
    }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
---

### Checked Todoes

mengubah status todo

- **URL**

  `/todos/:id`

- **Method:**

  `PATCH`

- **Url Param:**
  required: `id=[number]`
- **Body:**

  ```json
  {
    "status": "<Done | Not Done>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
        "id": "<id movie>",
        "title": "<todo name>",
        "description": "<todo desc>",
        "status": "<Done | Not Done>",
        "due_date": "2021-05-24T00:56:21.112Z",
        "createdAt": "2021-05-24T00:56:21.112Z",
        "updatedAt": "2021-05-24T00:56:21.112Z"
    }
    ```

- **Error Response:**
  - **Code:** 400 VALIDATION ERROR <br />
    **Content:**

    ```json
    {
        "message": "Validation error: Validation <built-in validator> on <field1> failed"
    }
    ```

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "error not found"
    }
    ```
    
  - **Code:** 500 INTERNAL SERVER ERROR <br />
---

### Delete Todoes

menghapus data todo

- **URL**

  `/todos/:id`

- **Method:**

  `DELETE`

- **Url Param:**
  required: `id=[number]`
- **Data Param:** none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "todo success to delete",
      "deletedData" : {
        "id": "<id movie>",
        "title": "<todo name>",
        "description": "<todo desc>",
        "status": "<Done | Not Done>",
        "due_date": "2021-05-24T00:56:21.112Z",
        "createdAt": "2021-05-24T00:56:21.112Z",
        "updatedAt": "2021-05-24T00:56:21.112Z"
      }
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "error not found"
    }
    ```
  - **Code:** 500 INTERNAL SERVER ERROR <br />