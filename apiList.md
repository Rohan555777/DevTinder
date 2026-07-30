# DevTinder API's

## Auth Router
- POST / signup
- POST / login
- POST / logout

## ProfileRouter
- GET / profile/view **for viewing the profile**
- PATCH / Profile/Edit **For Editing the Profile**
- PATCH / Profile/password
 ## ConnectionRouter
- POST / request/send/intreseted/:userId
- post / request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## User ROuter
- GET /connections
- GET /request/recieved
- GET /feed - **show profile of other users**

Status : ignore , intrested , accpeted , rejected
