const errorHandler = (err, req, res, next) => {
    let statusCode
    let message
    let error = []

    switch (err.name) {
        case 'No data exist':
            statusCode = 404
            message = 'No data exist'
            break

        case 'SequelizeValidationError':
            statusCode = 400
            message = 'Validation Error'
            for (let i = 0; i < err.errors.length; i++) {
                error.push(err.errors[i].message);
            }
            break

        case 'Data not found':
            statusCode = 404
            message = 'Data not found'
            break

        default:
            statusCode = 500
            message.push('Internal Server Error')
            error.push(err)
    }

    if (statusCode === 404) {
        res.status(statusCode).json({ message })
    } else {
        res.status(statusCode).json({ message, error })
    }

}

module.exports = errorHandler