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
-------------------------------------------------------------------------------------------------------------
<details close>
<summary><b>Endpoint</b>: <code>POST /auth/signup</code></summary>
<br>

**Descripion**: Create a user Object

**Headers**:
     `content-type`: application/json

**Request Body**:
```
    {
      "email": "anthonymax",
      "password": "anto1234"
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
          "dob": "1/01/1999"
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
---------------------------------------------------------------------------------------------------------
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
<summary><b> </b> <code>POST /events </code></summary>
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