
/* class GameballError extends Error{
  constructor(name, message, code) {
    super(message)
  this.name =  name
  this.code = code
  this.message = message
}
} */

class ValidationError extends Error{
    constructor(message, code) {
      super(message)
    this.name =  'GAMEBALL VALIDATION ERROR'
    this.code = code
    this.message = message
  }
  }
  
  
  class AuthorizationError extends Error{
    constructor(message, code) {
      super(message)
    this.name =  'GAMEBALL AUTHORIZATION ERROR'
    this.code = code
    this.message = message
  }
  }
  
  class MissingParametersError extends Error{
    constructor(message, code) {
      super(message)
    this.name =  'GAMEBALL MISSING PARAMETERS ERROR'
    this.code = code
    this.message = message
  }
  }
  class ExecutionError extends Error {
    constructor(message, code) {
      super(message)
    this.name = 'GAMEBALL EXECUTION ERROR'
    this.code = code
    this.message = message
    }
  }
  
  class ParsingError extends Error {
    constructor(message, code) {
      super(message)
      this.name = 'GAMEBALL PARSING ERROR'
      this.code = code
      this.message = message
    }
  }
  
  module.exports={
    ParsingError,
    ExecutionError,
    MissingParametersError,
    AuthorizationError
    //GameballError
  }
  
  