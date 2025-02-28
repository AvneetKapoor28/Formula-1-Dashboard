const errorHandler = (err, req, res, next) => {
    // Set default status code to 500 (Internal Server Error)
    let statusCode = err.statusCode || 500;

    // Create an error response object
    const errorResponse = {
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Something went wrong!',
    };

    // Log the error (this can be improved with a logging library)
    console.error(err);

    // Send the error response to the client
    res.status(statusCode).json(errorResponse);
};

export default errorHandler;
