const errorHandler = (err, req, res, next) => {
    let statusCode
    let error = []
    let name

    switch (err.name) {
        case 'No data exist':
            statusCode = 400
            name = err.name
            break

        case 'Data not found':
            statusCode = 400
            name = err.name
            break

        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            name = err.name
            for (let i = 0; i < err.errors.length; i++) {
                error.push(err.errors[i].message);
            }
            break

        case 'Login Failed':
            statusCode = 400
            name = err.name
            error.push(err.error)
            break

        case 'Authenticaton Failed':
            statusCode = 401
            name = err.name
            error.push('Token Invalid')
            break

        case 'JsonWebTokenError':
            statusCode = 401
            name = 'Authenticaton Failed'
            error.push(err)
            break

        case 'Authorization Error':
            statusCode = 401
            name = err.name
            error.push('User not authorized')
            break

        default:
            statusCode = 500
            // console.log(err);
            name = 'Internal Server Error'
            error.push(err)
    }

    res.status(statusCode).json({ name, error })

}

module.exports = errorHandler