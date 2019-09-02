const Dev = require('../models/DevModel')

module.exports = {

    async store(request, response){
        
        const {devId} = request.params
        const {user} = request.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if(!targetDev){
            return response.status(400).json({error: 'Dev not exist'})
        }

        if(targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = request.connectedUsers[user]
            const targetSokect = request.connectedUsers[devId]

            if(loggedSocket){
                request.io.to(loggedSocket).emit('match', targetDev)
            }

            if(targetSokect){
                request.io.to(targetSokect).emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetDev._id)
        await loggedDev.save()

        return response.json(loggedDev)
    }
}