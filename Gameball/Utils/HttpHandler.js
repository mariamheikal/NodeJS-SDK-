const Gameball=require('../Gameball').Gameball
const config=require('./Configure')
const port = config.default_options.port
const https = require("https");
const GameballExceptions=require('../Exceptions/GameballExceptions')
const ParsingError = GameballExceptions.ParsingError
const ExecutionError = GameballExceptions.ExecutionError

/**
 * 
 * Makes a request to Gameball API.
 *
 * @param {Object} requestParams
 * @param {string} apikey
 * @param {string} returnModelName
 * @param {NodeCallback} callback
 */
function _createRequest(requestParams, apikey, returnModelName, callback) {

    console.log('req params')
    console.log(requestParams)

    const postData = JSON.stringify(requestParams.data)

    var options = {
      host: config.default_options.host,
      port: port,
      path: config.default_options.path+requestParams.path,
      method: requestParams.method,
      headers:{
        'Content-Type': 'application/json',
        APIKey: apikey
      },
    };

    console.log('options')
    console.log(options)
  
    const req = https.request(options, function (res) {
      console.log("Request processing...");
      var body = [];
      res.setEncoding("utf-8");
      res.on("data", (data) => {
        body.push(data);
      });

      res.on("end", function () {
        var payload;
        var responseText = body.join(" ");
        var titledResponse = returnModelName+": "+responseText
        if(res.statusCode!=200){
          //Can not extract message and code from responseText
          throw new ExecutionError(responseText)
        }
        console.log(res.statusCode)
        if(responseText.length!=0){
        try {
          payload = JSON.parse(responseText);
        } catch (err) { 
          throw new ParsingError(err.message)
        }
      }
      });
    }).on("error", function (err) { //error in request 
      console.log(err)
      throw new ExecutionError(err.message, config.error_codes.DEFAULT_ERROR_CODE)
    });
    
    /* req.setTimeout(5000, function () {
      console.log("Request Aborted");
      req.abort();
    }); */
    
    if (postData) {
    var data = postData;
    if (typeof data == "object") {
        data = JSON.stringify(data);
      }
      if(data!=null){
      console.log("Data written by request:");
      console.log(data);
      req.write(data);
      }
    }
      req.end();
  
  }

  module.exports={
      _createRequest:_createRequest
  }