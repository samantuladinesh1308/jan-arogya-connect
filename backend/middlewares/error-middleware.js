const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const details = err.details || "Error from backend";

    return res.status(status).json({message, details});

}

module.exports = errorMiddleware;