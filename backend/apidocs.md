# API Doumentation


## Auth Endpoints

*Endpoint* `POST /auth`
*Descripion*: Log in user
*Headers*:
    * `content-type`: application/json
*Request Body*:
    ```
    {
      "email": "maxwell12@gmail.com"
      "password": "max1234"
    }
    ```
*Success Response*:
  * Code: 200 Ok
  * Content-example:
      ```
      {
        "user": {
              "_id": "66dee88cf7456754137a8b01",
              "email": "maxwell12@gmail.com",
              "password": "$2b$10$JE2clzSBjfbp0/o0RjxZruSVdYxdt.B0nf6aCCpns5ASf1cBKzWdW",
              "firstname": "maxwell",
              "lastname": "frank"
              "dob": "25/02/1997",
              "__v": 0
              }
      }
      ```
*Error Response*:
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
