export const globalErrorHandler = (err,req,res,next) => {
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode: 500;
    const message = err?.message;

    res.status(statusCode).json({
        stack,
        message
    })
}
//not found error
export const notFound = (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = "failed";
    err.statusCode = 404;
    next(err);
  };