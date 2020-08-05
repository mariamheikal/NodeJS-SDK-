const config=require('./Utils/Configure')

const GameballExceptions=require('./Exceptions/GameballExceptions')
const ExecutionError = GameballExceptions.ExecutionError
const MissingParametersError = GameballExceptions.MissingParametersError
const AuthorizationError = GameballExceptions.AuthorizationError

const hash = require('./Utils/Sha1Hash').hash
const _createRequest=require('./Utils/HttpHandler')._createRequest


/**
 * API requests handler.
 *
 * @param apikey: string
  * @constructor
  */
function Gameball(apikey, transactionKey){
  if (!apikey) {
    throw new AuthorizationError('Gameball requires an APIKey, check how to obtain your APIKey here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>', config.error_codes.DEFAULT_ERROR_CODE)
  }
  else{
  this.apikey=apikey
  this.transactionKey=transactionKey
  }
}


/**
 * Returns bot settings --- <<< Tested & Working >>>
 *
 */
Gameball.prototype.getBotSettings = function (callback) {
  _createRequest({
    path: "/api/v1.0/bots/BotSettings",
    method: 'GET',
    data: null,
  },this.apikey, "", callback)
}


/**
 * < Tested & Working >
 * 
 * InitializePlayer: creates a new player with the given player attributes.
 * ask about update
 * 
 * @param {
  * playerAttributes: {
    *  displayName: string,
    *  firstName: string,
    *  lastName: string,
    *  email: string,
    *  gender: string,
    *  mobileNumber: string,
    *  dateOfBirth: string 
    * }} PlayerRequest
  * @param {NodeCallback} callback
  */
 Gameball.prototype.InitializePlayer = function (PlayerRequest, callback) {
  PlayerRequest['playerUniqueId']=''+Date.now()
  PlayerRequest.playerAttributes['joinDate']=''+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  console.log(PlayerRequest)
     _createRequest({
     method: 'POST',
     path: "/Player",
     data: PlayerRequest
   }, this.apikey, "", callback)
  }


/**
 * < Tested & Working >
 * 
 * CreateReferral: refers a new user through player with the given player code.
 * Qs: How do I get the referral code for a player?
 * 
 * @param {
  *  playerCode: string,
  *  playerAttributes: {}
  * } ReferralRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.CreateReferral=function(ReferralRequest, callback){
  ReferralRequest['playerUniqueId']=""+Date.now()
  if(ReferralRequest.playerCode==undefined){
    return callback(new MissingParametersError('Player referral code is required', config.error_codes.MISSING_REFERRAL_CODE),
    null
  );
  }
  else{
  _createRequest({
    path: "/Referral",
    method: 'POST',
    data: ReferralRequest
  }, this.apikey, "", callback)
 }
}


/** 
 * < Tested & Working >
 * SendEvent: sends events collection introduced in the given events object.
 * 
 * @param {
  *events: {},
  *playerUniqueId: string
  * } EventRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.SendEvent=function(EventRequest, callback){
  if(EventRequest.events==undefined){
    throw new MissingParametersError('Events field is required', config.error_codes.MISSING_EVENTS_FIELD)
  }
  if(EventRequest.playerUniqueId==undefined){
    throw new MissingParametersError('Player unique id is required', config.error_codes.MISSING_PLAYER_UNIQUE_ID)
    }
  console.log('event params:')
  console.log(EventRequest)
  _createRequest({
    path: "/Event",
    method: 'POST',
    data: EventRequest,
  }, this.apikey, "", callback)
}


/**
 * < Tested & Working >
 * 
 * GetPlayerBalance: obtains the points balance of the player with the given unique id.
 * @param {
  *  playerUniqueId: string,
  * } PlayerBalanceRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.GetPlayerBalance=function(PlayerBalanceRequest, callback){
  if(!this.transactionKey){
    throw new AuthorizationError('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>', config.error_codes.MISSING_TRANSACTION_KEY)
  }
  if(PlayerBalanceRequest.playerUniqueId==undefined){
    throw new MissingParametersError('Player unique id is required', config.error_codes.MISSING_PLAYER_UNIQUE_ID)
    }
  PlayerBalanceRequest['bodyHashed']=hash(playerUniqueId=PlayerBalanceRequest.playerUniqueId, transactionTime="", amount="",this.transactionKey)
  console.log(PlayerBalanceRequest)
  _createRequest({
    path: "/Transaction/Balance",
    method: 'POST',
    data: PlayerBalanceRequest,
  }, this.apikey, "PlayerBalance", callback)
}


/**
 * < Tested & Working >
 * 
 * HoldPoints: holds a specific amount of points from the player’s points balance. 
 * This is used to guarantee availability of redemption points until the checkout process is completed.
 * @param {
  *  playerUniqueId: string,
  *  amount: string,
  * } HoldPointsRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.HoldPoints=function(HoldPointsRequest, callback){
  if(!this.transactionKey){
   throw new MissingParametersError('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>', config.error_codes.DEFAULT_ERROR_CODE)
  }
  if(HoldPointsRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null
  );
  }
  HoldPointsRequest['transactionTime']=""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  HoldPointsRequest['bodyHashed']=hash(HoldPointsRequest.playerUniqueId, HoldPointsRequest.transactionTime, HoldPointsRequest.amount, this.transactionKey)
  console.log(HoldPointsRequest)
  _createRequest({
    path: "/Transaction/Hold",
    method: 'POST',
    data: HoldPointsRequest,
  }, this.apikey,"TransactionResponse", callback)
}


/**
 * < Tested & Working >
 * 
 * ReverseHold: cancels previously held points identified by the given hold reference. 
 * @param {
  *  playerUniqueId: string,
  *  holdReference: string,
  * } ReverseHoldRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.ReverseHold=function(ReverseHoldRequest, callback){
  if(!this.transactionKey){
    throw new MissingParametersError('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>', config.error_codes.DEFAULT_ERROR_CODE)
   }
   if(ReverseHoldRequest.playerUniqueId==undefined){
     return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
     null
   );
   }
  ReverseHoldRequest['transactionTime']=""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  ReverseHoldRequest['bodyHashed']=hash(ReverseHoldRequest.playerUniqueId, ReverseHoldRequest.transactionTime, ReverseHoldRequest.amount, this.transactionKey)
  console.log(ReverseHoldRequest)
  _createRequest({
    path: "/Transaction/Hold",
    method: 'POST',
    data: ReverseHoldRequest,
  }, this.apikey,"TransactionResponse", callback)
}


/**
 * < Tested & Working >
 * 
 * ReverseTransaction: cancels a purchase reward or refund a points redemption transactions in Gameball.
 * 
 * @param {
  *  playerUniqueId: string,
  *  transactionId: string,
  *  reversedTransactionId: string
  * } tranactionParams
  * @param {NodeCallback} callback
 */
Gameball.prototype.ReverseTransaction=function(ReverseTransactionRequest, callback){

  if(ReverseTransactionRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(ReverseTransactionRequest.transactionOnClientSystemId==undefined){
    return callback(new MissingParametersError('Transaction id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(ReverseTransactionRequest.reversedTransactionOnClientSystemId==undefined){
    return callback(new MissingParametersError('Reversed transaction id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  ReverseTransactionRequest['transactionTime']= ""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  ReverseTransactionRequest['bodyHashed']=hash(ReverseTransactionRequest.playerUniqueId, ReverseTransactionRequest.transactionTime, ReverseTransactionRequest.amount, this.transactionKey)
  _createRequest({
    path: "/Transaction/Cancel",
    method: 'POST',
    data: ReverseTransactionRequest
  }, this.apikey, "PurchaseRewardResponse", callback)
 }


/**
 * < Tested & Working >
 * 
 * RewardPoints: rewards a player with points equivalent to the given amount.
 * 
 * @param {
  *  playerAttributes: {},
  *  playerUniqueId: string,
  *  amount: string,
  *  transactionOnClientSystemId: string,
  * } RewardPointsRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.RewardPoints=function(RewardPointsRequest, callback){
  if(RewardPointsRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(RewardPointsRequest.transactionOnClientSystemId==undefined){
    return callback(new MissingParametersError('Transaction id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  RewardPointsRequest['transactionTime']= ""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  RewardPointsRequest['bodyHashed']=hash(RewardPointsRequest.playerUniqueId, RewardPointsRequest.transactionTime, RewardPointsRequest.amount, this.transactionKey)
  _createRequest({
    path: "/Transaction/Reward",
    method: 'POST',
    data: RewardPointsRequest
  }, this.apikey,"", callback)
 }


/**
 * < Tested & Working >
 * 
 * RedeemPoints: enables the player to use Gameball points as a payment 
 *               method since it can be substituted for monetary values.
 * 
 * @param {
  *  holdReference: string,
  *  playerUniqueId: string,
  *  amount: string,
  *  transactionId: string,
  * } RedeemPointsRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.RedeemPoints=function(RedeemPointsRequest, callback){
  if(RedeemPointsRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(transactionParams.holdReference==undefined){
    return callback(new MissingParametersError('Hold reference field is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(RedeemPointsRequest.amount==undefined){
    return callback(new MissingParametersErr4or('Amount field is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(RedeemPointsRequest.transactionOnClientSystemId==undefined){
    return callback(new MissingParametersError('Transaction id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null
  );
  }
  RedeemPointsRequest['transactionTime']= ""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  RedeemPointsRequest['bodyHashed']=hash(RedeemPointsRequest.playerUniqueId, RedeemPointsRequest.transactionTime, RedeemPointsRequest.amount, this.transactionKey)
  _createRequest({
    path: "/Transaction/Redeem",
    method: 'POST',
    data: RedeemPointsRequest
  }, this.apikey,"TransactionResponse", callback)
 }


/**
 * < Tested & Working >
 *
 * GetPlayerInfo: gets Player's information such as name, level, rank and score balance. 
 * 
 * @param {
  *  playerUniqueId: string
} PlayerInfoRequest
* @param {NodeCallback} callback
*/
Gameball.prototype.GetPlayerInfo = function (PlayerInfoRequest, callback) {
  if(PlayerInfoRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  PlayerInfoRequest["bodyHashed"]=hash(PlayerInfoRequest.playerUniqueId, "", "", this.transactionKey)
   _createRequest({
   method: 'POST',
   path: "/player/info",
   data: PlayerInfoRequest
 }, this.apikey, "PlayerInfo", callback)
}


/** 
 * < Tested & Working >
 * 
 * SendAction: redeems\rewards, and sends event all at once.
 * 
 * @param {
  *
  *playerUniqueId: string
  * } ActionRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.SendAction=function(ActionRequest, callback){
  if(ActionRequest.playerUniqueId==undefined){
    throw new MissingParametersError('Player unique id is required', config.error_codes.MISSING_PLAYER_UNIQUE_ID)
    }
  ActionRequest.pointsTransaction['transactionTime']=""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  ActionRequest.pointsTransaction["bodyHashed"]=hash(ActionRequest.playerUniqueId, ActionRequest.pointsTransaction.transactionTime, ActionRequest.pointsTransaction.rewardAmount, this.transactionKey)

  console.log('action params:')
  console.log(ActionRequest)
  _createRequest({
    path: "/Action",
    method: 'POST',
    data: ActionRequest,
  }, this.apikey, "ActionResponse", callback)
}


/**
 * < Tested & Working >
 * 
 * CreateCoupon: creates a discount code.
 * 
 * @param {
  *  code: string
  *  playerUniqueId: string,
  * } CreateCouponRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.CreateCoupon=function(CreateCouponRequest, callback){
  if(CreateCouponRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  CreateCouponRequest['transactionTime']=""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  CreateCouponRequest['hash']=hash(CreateCouponRequest.playerUniqueId, "", "", this.transactionKey)
  _createRequest({
    path: "/Coupon",
    method: 'POST',
    data: CreateCouponRequest
  }, this.apikey, "CreateCouponResponse", callback)
 }


 /**
 * < Tested & Working >
 *
 * ValidateCoupon: returns discount code details if exists and attached to player.
 * 
 * @param {
  *  playerUniqueId: string
} ValidateCouponRequest
* @param {NodeCallback} callback
*/
Gameball.prototype.ValidateCoupon = function (ValidateCouponRequest, callback) {
  if(ValidateCouponRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(ValidateCouponRequest.code==undefined){
    return callback(new MissingParametersError('Coupon code is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  ValidateCouponRequest["hash"]=hash(ValidateCouponRequest.playerUniqueId, "", "", this.transactionKey)
   _createRequest({
   method: 'POST',
   path: "/Coupon",
   data: ValidateCouponRequest
 }, this.apikey, "ValidateCouponResponse", callback)
}


 /**
 * < Tested & Working >
 * 
 * RedeemCoupon: retrieves a discount code.
 * 
 * @param {
  *  promocode: number,
  *  value: number,
  *  playerUniqueId: string,
  * } RedeemCouponRequest
  * @param {NodeCallback} callback
 */
Gameball.prototype.RedeemCoupon=function(RedeemCouponRequest, callback){
  if(RedeemCouponRequest.playerUniqueId==undefined){
    return callback(new MissingParametersError('Player unique id is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  if(RedeemCouponRequest.code==undefined){
    return callback(new MissingParametersError('Coupon code is required', config.error_codes.DEFAULT_ERROR_CODE),
    null);
  }
  RedeemCouponRequest['transactionTime']=""+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  RedeemCouponRequest['hash']=hash(RedeemCouponRequest.playerUniqueId, "", "", this.transactionKey)
  _createRequest({
    path: "/Coupon/Redeem",
    method: 'POST',
    data: RedeemCouponRequest
  }, this.apikey, "", callback)
 }

module.exports = Gameball