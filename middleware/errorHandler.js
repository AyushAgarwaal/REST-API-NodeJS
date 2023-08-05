
const errorHandler = (err, req, res,next) => {
    res.status(err.statusCode).send({
      message: err.msg,
      status: err.statusCode,
      stack: err.stack
    });
  
  };
  
  
  module.exports = errorHandler;