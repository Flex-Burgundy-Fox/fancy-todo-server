module.exports = (err, req, res, next) => {
    let statusCode
    let errors = []

    switch (err.name) {
        case 'JWT invalid':
            statusCode = 401
            errors.push(err.name)
            break;
        case 'Missing JWT':
            statusCode = 401
            errors.push(err.name)
            break;
    
        default:
            statusCode = 500
            errors.push('Internal Server Error')
            break;
    }

    res.status(statusCode).json({ errors })
}