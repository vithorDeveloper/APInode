const {Router} = require('express')
const multer = require('multer')
const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/userAvatarController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const uploadConfig = require('../config/upload')

const usersRoutes = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated ,usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated , upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes


// function myMiddleware(req, res, next) {             
//   console.log('hello world, im middleware')

//   if(req.body.isAdm){
//     return res.status(401).json({message: 'not authorized'})
//   }

//   next()
// }