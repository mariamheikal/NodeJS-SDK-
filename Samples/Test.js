//var gb = require("mh-nodejs-sdk")
var gameball = require("../Gameball/Gameball")
var Gameball = new gameball("7c7636658209418c9a82306a421f76a5","26e1967d89114388bdd1772587c336c8")

/**
 * Uncomment for testing
 */

/* Gameball.getBotSettings(function (err, res) {
        if(err){
                console.log(err)
        }
        console.log(res)
      }) */

      
/* Gameball.SendEvent(
        {"events":{
                "view_product_page":{}
                },
        "playerUniqueId": '1596487841748',
        "isMessageTrigger": true
      
         
})  */

/* Gameball.SendEvent(
        {
        'playerUniqueId': '1596487841748',
        'events':{
                "place_order":{
                        "total_price":2000
                 }
         }
}) */

/*   Gameball.InitializePlayer(
        {
         'playerAttributes': {
                'displayName': 'Mariam',
                'firstName': 'Mariam',
                'lastName': 'Heikal',
                'email': 'test@gmail.com',
                'gender': 'Female',
                'mobileNumber': '01223334444',
                'dateOfBirth': '1998-09-25T12:19:42.593Z'
              }
         }, function (err, res){if(err){
                console.log(err)
        }})   */

/* Gameball.GetPlayerBalance({
        'playerUniqueId': '1594653960996'
}, function (err, res){if(err){
        console.log(err)
}
else{
        console.log(res)
}}) */

/* Gameball.HoldPoints({
        'playerUniqueId': '1596487841748',
        'amount':'30'
}, function (err, res){
        if(err) console.log(err)
        else console.log(res)
}) */

/* Gameball.ReverseHold({
        "playerUniqueId": "1595633411347",
        "holdReference":"9bfbc4df-443e-4cd3-b579-6a53d4933feb"
}, function (err, res){
        if(err) console.log(err)
        else console.log(res)
}) */

/* Gameball.CreateReferral({
        "playerCode": "7oiD28174D1D1T",
        "playerAttributes":{
                displayName: "referral_",
                firstName: "testing",
                lastName:"referral nodejs"
        }
}, function (err, res){
        if(err) console.log(err)
        else console.log(res)
}) */


/* Gameball.RedeemPoints({
        "playerUniqueId":"1596487841748",
        "amount":"30",
        "holdReference":'b473c619-148b-4b44-afd8-ea71b5a3a4d2',
        "transactionOnClientSystemId":"234567900"
 },function (err, res){
        if(err) console.log(err)
        else console.log(res)
}) */

/* Gameball.ReverseTransaction({
        "playerUniqueId":"1595633411347",
        "transactionOnClientSystemId":"234567899",
   "reversedTransactionOnClientSystemId":"234567899"
 },function (err, res){
        if(err) console.log(err)
        else console.log(res)
}) */

//error: Nullable object must have a value 500 ... 'Failed to parse response'
/* gbHandler.sendPromoCode({
        "promocode":"Birthday gift",
        "value": 100,
        "playerCode": "WDFB0AB82DALF2",
        "playerUniqueId":"1595529398484"
},function (err, res){
        if(err) console.log(err)
        else console.log(res.status)
}) */


/* Gameball.GetPlayerInfo({
        "playerUniqueId":"1596487841748"
}) */


/* Gameball.SendAction({
        "playerUniqueId":"1596487841748",
        "events":{
                "place_order":{
                        "total_price":2000
                 }
         },
        "pointsTransaction":{
        "rewardAmount":"30",
        "holdReference":'b473c619-148b-4b44-afd8-ea71b5a3a4d2',
        "transactionOnClientSystemId":"234567900"
        }
}) */

/* Gameball.CreateCoupon({
        "playerUniqueId":"1596487841748",
        "code": "1",
        "value":1000.0
}) */

/* Gameball.RedeemCoupon({
        "playerUniqueId":"1596487841748",
        "code": "1"
}) */

/* Gameball.ValidateCoupon({
        "playerUniqueId":"1596487841748",
        "code":"1"
}) */
