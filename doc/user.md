# User API Spec

## Register User

Endpoint: POST /api/v1/users

Request Body :

```json
{
  "username": "sendiagustian",
  "password": "rahasia",
  "name": "Sendi Agustian"
}
```

Response Body (Success)

```json
{
  "username": "sendiagustian",
  "name": "Sendi Agustian"
}
```

Response Body (Failed)

```json
{
  "errors": "username must not blank, ..."
}
```

## Login User

Endpoint: POST /api/v1/login

Request Body :

```json
{
  "username": "sendiagustian",
  "password": "rahasia"
}
```

Response Body (Success)

```json
{
  "username": "sendiagustian",
  "name": "Sendi Agustian",
  "token": "token123456789"
}
```

Response Body (Failed)

```json
{
  "errors": "username or password worng, ..."
}
```

## Get User

Endpoint: POST /api/v1/login

Request Header :

- X-API-TOKEN: token

Request Body :

```json
{
  "username": "sendiagustian",
  "password": "rahasia"
}
```

Response Body (Success)

```json
[
  {
    "username": "sendiagustian",
    "name": "Sendi Agustian"
  }
]
```

Response Body (Failed)

```json
{
  "errors": "username or password worng, ..."
}
```

## Update User

## Logout User
