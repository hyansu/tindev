const express = require('express')
const DevController = require('./controllers/DevController')
const LikesController = require('./controllers/LikeController')
const DislikesController = require('./controllers/DislikeController')

const routes = express.Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.post('/devs/:devId/likes',LikesController.store)
routes.post('/devs/:devId/dislikes',DislikesController.store)

module.exports = routes