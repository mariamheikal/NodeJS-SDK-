var crypto = require("crypto");
const Gameball=require('../gameball').Gameball

/**
 * 
 * SHa1 Hashing Function
 *
 * @param {string} playerUniqueId //Player's unique id
 * @param {string} transactionTime //UTC transaction datetime
 * @param {string} transactionKey //Transaction key required for generated the hash
 * <returns type="string">The generated hash.</returns>
 */

function hash(playerUniqueId,transactionTime,amount, transactionKey){
    var yyMMddHHmmss=""
    function pad2(n) {
      return n < 10 ? "0" + n : n;
    }
    if(amount==undefined){
      console.log('undefined')
      amount="";
    }

    console.log(transactionTime.length)
    if(transactionTime!==""){
      var date = new Date(transactionTime);
      yyMMddHHmmss =
      date
      .getFullYear()
      .toString()
      .match(/\d{2}$/) +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours() - 2) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds());

    console.log('yyMMddHHmmss')
    console.log(yyMMddHHmmss)
    console.log(amount)
    console.log(transactionKey);
    console.log(`${playerUniqueId}:${yyMMddHHmmss}:${amount}:${transactionKey}`);
    console.log(crypto.createHash("sha1").update(`${playerUniqueId}:${yyMMddHHmmss}:${amount}:${transactionKey}`).digest("hex"))
    }
    console.log(`${playerUniqueId}:${yyMMddHHmmss}:${amount}:${transactionKey}`);
    console.log(crypto.createHash("sha1").update(`${playerUniqueId}:${yyMMddHHmmss}:${amount}:${transactionKey}`).digest("hex"))
    return crypto.createHash("sha1").update(`${playerUniqueId}:${yyMMddHHmmss}:${amount}:${transactionKey}`).digest("hex")
  }

  module.exports={
      hash: hash
    }
