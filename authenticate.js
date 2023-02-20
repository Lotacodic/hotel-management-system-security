const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { User, Person} = require('./Schema')
const router = express.Router()

router.use(cookieParser())

// Validating a guest 
router.post('/createUser', validateUser, async(req, res) => {
    const newUser =  new User(req.body)
    const userId = await newUser._id
    const token = jwt.sign({userId}, process.env.SECRETE, {
        expiresIn:'3h',
    })
    const user = new User()
     user.guest.push(user)
     await user.save()
    res.cookie('user', token)

    await newUser.save()
})

// Validating a admin
router.post('/create-admin', validateUser, async(req, res) => {
    const newUser =  new User(req.body)
    const userId = await newUser._id
    const token = jwt.sign({userId}, process.env.SECRETE, {
        expiresIn:'3h',
    })
    const user = new User()
    user.admin.push(user)
    await user.save()
    res.cookie('admin', token)
})


async function validateUser(req, res, next){

    const { email, password, name } = req.body
 
    if(!name){
        return res.send('please enter your name')
    }
    if( !email.includes('@gmail.com')){
        return res.send('please enter your email')
    }
    if( password.length < 3){
       return res.send('password is less 3 characters ')
    }
    const user = await Person.findOne({ email })
    if(user){
        return res.send('User already exist')
    }
    next()

}


module.exports = router