# API Doumentation


## Auth Endpoints
---------------------------------------------------------------------------------------
<details close>
<summary><b>Endpoint</b>: <code>POST /auth</code></summary>
<br>

**Descripion**: Log in user

**Headers**:
     `content-type`: application/json

**Request Body**:
```
    {
      "email": "maxwell12@gmail.com",
      "password": "max1234"
    }
```

**Success Response**:
  * Code: 200 Ok
  * Content-example:
      ```
      {
        "user": {
              "message": "Login successful!",
              "loggedUser": {
                "id": "66dee88cf7456754137a8b01",
                "name": "maxwell undefined",  // firstname and lastname
                "email": "maxwell12@gmail.com",
                "dob": "25/02/1997"
              }
          }
      }
      ```

**Error Response**:
  * Code: 401
  * Content Example:
```
    {
      "error": "User Not Found"
    }
```
```
    {
      "error": "Incorrect password"
    }
```
</details>

<details close>
<summary><b>Endpoint</b>: <code>POST /auth/signup</code></summary>
<br>

**Descripion**: Create a user Object

**Headers**:
     `content-type`: application/json

**Request Body**:
```
    {
      "email": "johndoe@gmail.com",
      "firstname": "john",
      "lastname": "doe",
      "dob": "2006-06-12"
      "password": "john1234"
    }
```

**Success Response**:
  * Code: 201 Created
  * Content-example:
```
      {
        "user": {
          "id": "66e49c732d2925584e8a8e7b",
          "name": "john doe",
          "email": "johndoe@gmail.com",
          "dob": "2006-06-12"
          }
      }
```

**Error Response**:
  * `Code`: 400 `Bad Request`,
  * `Content Example`:
    - This occurs when nothing is passed to the url or request body is empty
```
    {
      "error": "Bad Request"
    }
```
  * `Code`: 403 `Forbidden`
  * `Content Example`:
    - This error occurs when the email already exist, because email address is unique
```
    {
      "error": "Email Exist"
    }
```
  * `Code`: 422 `Unprocessible entity`
  * `Content Example`:
  - This occurs when some necessary fields are empty when request is passed:
```
    {
      "error": "please fill all necessary fields"
    }

```
</details>
<details close>
<summary><b>Endpoint</b>: <code>POST /auth/logout</code></summary>
<br>

**Description**: Logs out user and destroys the session

**Success Response**:
  * Code: 200 Ok
  * Content Example:
```
  {
    "logout successfull"
  }
```
</details>


## Event Endpoints
-------------------------------------------------------------
<details close>
<summary><b>Endpoint:</b> <code>GET /events </code></summary>
<br>

**Description**: Returns all Event that involved the user

**Headers**:
     `content-type`: application/json

**Request Body**: None

**Success Response**:
  * Code: 200 Ok
  * Content-example:
```
  [
  {
    "invitedUsers": [],
    "_id": "66e34b7b6c854adbf655435e",
    "eventName": "alx",
    "eventTime": "2024-09-26T10:00:00.000Z",
    "startTime": "2024-09-26T10:00:00.000Z",
    "endTime": "2024-09-26T12:00:00.000Z",
    "isAllDay": false,
    "isPriority": false,
    "createdBy": {
      "_id": "66dee88cf7456754137a8b01",
      "email": "maxwell12@gmail.com",
      "firstname": "maxwell"
    },
    "dateCreated": "2024-09-12T20:13:47.114Z",
    "__v": 0
  },
  {
    "_id": "66e4b0700fa9802ce1ab2fb6",
    "eventName": "Alx graduation",
    "description": "Celebration of 1 year program",
    "eventTime": "2024-10-05T10:20:30.000Z",
    "startTime": "2024-10-05T10:02:45.000Z",
    "endTime": "2024-10-05T18:02:45.000Z",
    "isAllDay": false,
    "isPriority": false,
    "createdBy": {
      "_id": "66dee88cf7456754137a8b01",
      "email": "maxwell12@gmail.com",
      "firstname": "maxwell"
    },
    "invitedUsers": [],
    "dateCreated": "2024-09-13T21:36:48.875Z",
    "__v": 0
  }
  ]
```

**Error Response**:
  * `Code`: 401 `Unauthorised`
  * `Content Example`:
    - This error occurs when user is not logged in
  ```
    {
      "error": "Unauthorised"
    }
  ```
</details>

<details close>
<summary><b>Endpoint:</b> <code>POST /events </code></summary>
<br>

**Description**: Creates an Event

**Headers**:
     `content-type`: application/json

**Request Body**:
```
    {
       "eventName": "Alx graduation",
       "description": "Celebration of 1 year program",
       "eventTime": "2024-10-05T10:20:30.000Z",
       "startTime": "2024-10-05T10:02:45.000Z",
       "endTime": "2024-10-05T18:02:45.000Z",
       "isAllDay": false,
       "isPriority": false
    }
```

**Success Response**:
  * Code: 201 Created
  * Content-example:
```
      {
        "eventName": "Alx graduation",
        "description": "Celebration of 1 year program",
        "eventTime": "2024-10-05T10:20:30.000Z",
        "startTime": "2024-10-05T10:02:45.000Z",
        "endTime": "2024-10-05T18:02:45.000Z",
        "isAllDay": false,
        "isPriority": false,
        "createdBy": "66dee88cf7456754137a8b01",
        "invitedUsers": [],
        "_id": "66e4b0700fa9802ce1ab2fb6",
        "dateCreated": "2024-09-13T21:36:48.875Z",
        "__v": 0
      }
```

**Error Response**:
  * `Code`: 400 `Bad Request`,
  * `Content Example`:
    - This occurs when nothing is passed to the url or request body is empty
  ```
    {
      "error": "Bad Request" //Note: Error may vary from input validation error to server error
    }
  ```
  * `Code`: 401 `Unauthorised`
  * `Content Example`:
    - This error occurs when user is not logged in
  ```
    {
      "error": "Unauthorised"
    }
  ```
</details>