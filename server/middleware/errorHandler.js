const errorHandler = (err, req, res, next) => {
  const isDatabaseError = err && (err.code || err.sqlMessage);

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  if (res.headersSent) {
    return next(err);
  }

  return res.status(isDatabaseError ? 503 : 500).json({
    success: false,
    message: isDatabaseError
      ? 'The database is temporarily unavailable. Please try again shortly.'
      : 'Something went wrong on the server. Please try again.'
  });
};

module.exports = errorHandler;
