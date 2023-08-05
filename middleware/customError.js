class CustomError extends Error{
    constructor(msg,statusCode){
      super(msg);
      this.msg=msg;
      this.statusCode=statusCode;
    }
}

module.exports=CustomError;