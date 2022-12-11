How To
======

1. Set owntracks to publish on a mqtt topic with your user selector


Todos
=====

1. Real life test

Known issues
============

At gladys server startup
------------------------
<error> index.js:15 (process.<anonymous>) unhandledRejection catched: Promise {
 <rejected> NotFoundError: User not found
     at User.getBySelector (/server/lib/user/user.getBySelector.js:19:11)
     at OwntracksHandler.handleMqttMessage (server/services/owntracks/lib/handleMqttMessage.js:21:20)
}
2022-12-11T18:24:17+0100 <error> index.js:16 (process.<anonymous>) NotFoundError: User not found
   at User.getBySelector (server/lib/user/user.getBySelector.js:19:11)
   at OwntracksHandler.handleMqttMessage (server/services/owntracks/lib/handleMqttMessage.js:21:20)


Improvments
===========

*
