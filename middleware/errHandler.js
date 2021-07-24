function errHandler(err, req, res, next){
    let statusCode
    let error = []
    switch (err.name) {
        case "Token Error":
            statusCode = 400
            error.push("Access token not found or invalid token")
            break; 
        case "JsonWebTokenError":
            statusCode = 400
            error.push("Access token not found or invalid token")
            break; 
        case "Authentication Error":
            statusCode = 401
            error.push("User not Found")
            break;
        case "Authorization Error":
            statusCode = 401
            error.push("User not authorized")
            break;
        case "Not Found":
            statusCode = 404
            error.push("Data not found")
            break;
        case "SequelizeValidationError":
            statusCode = 400
            error = err.errors ? err.errors.map(el => el.message) : []
            break;
        case "Login Failed":
            statusCode = 400
            error.push("Email or Password incorrect")
            break;
        default:
            statusCode = 500
            error.push("internal server error")
            break;
    }

    res.status(statusCode).json({error})
}

module.exports = errHandler