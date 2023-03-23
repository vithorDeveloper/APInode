const knex = require('knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class userAvatarController{

  async update(request, response){
    const user_id = request.user.id
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({id: user_id}).first()

    if(!user){
      throw new AppError("Somente usuarios autenticados podem mudar o avatar")
    }
    
    if(user.avatar){
      await diskStorage.deleteFile(user.avatar)
    }

  await diskStorage.saveFile(avatarFileName)
  user.avatar = avatarFileName

  await knex("users").update(user).where({id: user_id})

  return response.json(user)

  }
}

module.exports = userAvatarController