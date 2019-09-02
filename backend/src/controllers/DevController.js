const axios = require('axios')
const Dev = require('../models/DevModel')

module.exports = {

    async store(request, response){
        const {username} = request.body
        const githubResult = await axios.get(`https://api.github.com/users/${username}`)
        const {name, bio, avatar_url: avatar} = githubResult.data

        const userchecked = await Dev.findOne({user: username})

        if(userchecked){
            return response.json(userchecked)
        }

        const dev = await Dev.create({
            name, bio, avatar, user: username
        })
        
        return response.json(dev)
    },

    async index(request, response){

        const {user} = request.headers

        const loggedDev = await Dev.findById(user)
        const users = await Dev.find({
            $and: [
                {_id: {$ne: user}},
                {_id: {$nin: loggedDev.likes}},
                {_id: {$nin: loggedDev.dislikes}}
            ]
        })

        return response.json(users)
    }

}