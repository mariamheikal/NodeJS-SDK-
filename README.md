# **Gameball NodeJS SDK**

The Gameball NodeJS SDK provides convinient access to the Gameball API frpm applicatopns written in the JavaScript langauage. 
## Documentation

Please refer to the  [Gameball API docs](https://docs.gameball.co).
## Installation

You don't need this source code unless you want to modify the SDK. If you just
want to use the SDK, just run:
```js
npm install gameball-nodejs-sdk
```
### Requirements
## Usage

The SDK needs to be configured with your account's API & Transaction keys available in your [Gameball Dashboard](https://help.gameball.co/en/articles/3467114-get-your-account-integration-details-api-key-and-transaction-key)

Require 'gameball-nodejs-sdk' in your file
```js
var gameball = require('gameball-nodejs-sdk')
```
Create a handler using the api key and transaction key (optional field), then call commands on it.
```js
var Gameball = new gameball(apikey, transactionkey)
```
### Commands:
```js
Gameball.InitializePlayer(PlayerRequest, callback) //creates a new player with the given player attributes.

Gameball.SendEvent(EventRequest, callback) //performs action based on event triggered by users.

Gameball.CreateReferral(ReferralRequest, callback) //refers a new user through player with the given player code.

Gameball.GetPlayerBalance(PlayerBalanceRequest, callback) //obtains player's balance value.

Gameball.HoldPoints(HoldPointsRequest, callback) //holds a specific amount of points from the player’s points balance. 

Gameball.ReverseHold(ReverseHoldRequest, callback) //cancels previously held points identified by the given hold reference. 

Gameball.ReverseTransaction(ReverseTransaction, callback) //cancels a purchase reward or refund a points redemption transactions in Gameball.

Gameball.RedeemPoints(RedeemPointsRequest, callback) //enables the player to use Gameball points as a payment method since it can be substituted for monetary values.

Gameball.RewardPoints(RewardPointsRequest, callback) //rewards a player with points equivalent to the given amount.
```
### Examples
#### Sending an Event Example
```js
//Example 1
Gameball.SendEvent({
        "events":{
                "reserve":{
                        "rooms":2
                  }
        },
        "playerUniqueId":" player123",
        "playerAttributes":{
                "displayName":" Jon Snow",
                "email":"jon.snow@example.com",
                "dateOfBirth":"1980-09-19T00:00:00.000Z",
                "joinDate":"2019-09-19T21:06:29.158Z"
        }
})

//Example 2
Gameball.SendEvent({
        "events":{
                "place_order":  {
                      "total_amount":"100",
                      "category":[
                         "electronics",
                         "cosmetics"
                                 ]
                },
                "review":{}
        },
        "playerUniqueId":"1596487841748"
})
```
#### Create a Referral Example
```js
//Example 1
Gameball.CreateReferral({
        "playerCode":"CODE11",
        "playerUniqueId":"player456"
})

//Example 2
Gameball.CreateReferral({
        "playerCode":"CODE11",
        "playerUniqueId":"player456",
        "playerAttributes":{
                "displayName":" Tyrion Lannister",
                "firstName":"Tyrion",
                "lastName":"Lannister",
                "email":"tyrion@example.com",
                "gender":"M",
                "dateOfBirth":"1978-01-11T00:00:00.000Z",
                "joinDate":"2019-09-19T21:06:29.158Z",
                "custom":{
                        "location":"Miami",
                        "graduationDate":"2018-07-04T21:06:29.158Z",
                        "isMarried":false
                }
        }
})
```
#### Reward Examples
```js
//Example 1
Gameball.RewardPoints({
        "playerUniqueId":"player123",
        "amount":99.98,
        "transactionId":"tra_123456789",
})

//Example 2
Gameball.RewardPoints({
        "playerUniqueId":"player456",
        "amount":2500,
        "transactionId":"tra_123456789",
        "playerAttributes":{
                "displayName":" Tyrion Lannister",
                "firstName":"Tyrion",
                "lastName":"Lannister",
                "email":"tyrion@example.com",
                "gender":"M",
                "dateOfBirth":"1978-01-11T00:00:00.000Z",
                "joinDate":"2019-09-19T21:06:29.158Z",
                "custom":{
                        "location":"Miami",
                        "graduationDate":"2018-07-04T21:06:29.158Z",
                        "isMarried":false
                }
        },
})
```
#### Get Player Balance Example 
```js
Gameball.GetPlayerBalance({
        "playerUniqueId":"player456",
})
```
#### Hold Points Example 
```js
Gameball.HoldPoints({
        "playerUniqueId":"player456",
        "amount":98.89,
})
```
#### Redeem Example 
```js
Gameball.RedeemPoints({
        "playerUniqueId":"player456",
        "amount":10,
        "transactionId":"tra_123456789",
        "holdReference":"2342452352435234",
})
```
#### Reverse Transaction Example
```js
Gameball.ReverseTransaction({
        "playerUniqueId":"player456",
        "transactionId":"1234567890",
        "reversedTransactionId":"234567891",
})
```
#### Reverse Hold Example
```js
Gameball.ReverseHold({
        "playerUniqueId":" player456",
        "holdReference":"9245fe4a-d402-451c-b9ed-9c1a04247482",
})
```
### Handling exceptions
Unsuccessful requests raise exceptions. The raised exception will reflect the sort of error that occurred with appropriate message and error code . Please refer to the  [Gameball API docs](https://docs.gameball.co).
## Contribution

The master branch of this repository contains the latest stable release of the SDK.
## Contact

For usage questions\suggestions drop us an email at support[ at ]gameball.co. Please report any bugs as issues.

