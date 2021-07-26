function errorHandlers(err, req, res, next) {
  let statusCode
  let messages = []

  switch (err.name) {
    case "Authentification Error":
      statusCode = 401
      messages.push("User Not Found")
      break;
    case "Missing Access Token":
      statusCode = 401
      messages.push("Access Token Not Found")
      break;
    case "SequelizeValidationError":
      statusCode = 400
      messages = err.errors ? err.errors.map((el) => el.message) : []
      break;
    case "Not Found":
      statusCode = 404
      messages.push("Todo Not Found")
      break;
    case "Authorization Error":
      statusCode = 401
      messages.push("User Not Authorized")
      break;
    case "LoginFailed":
      statusCode = 400
      messages.push("Wrong Email or Password")
      break;
    default:
      statusCode = 500
      messages.push("Internal Server Error")
      break;
  }

  res.status(statusCode).json({ messages })
}

module.exports = errorHandlers