const express = require('express')
const router = express.Router();
var cookieParser = require('cookie-parser')
const Trello = require('trello')
const bodyParser = require('body-parser')
const request = require('request')
if(process.env.NODE_ENV=="production"){
    var frontend = "https://codebadge-frontend.netlify.com"
    var clientId = "9a3d93461f11673e4164"
    var clientSecret = "3c799896323f37a83ebfc0acf208f611540998b4"
}
else{
    var frontend = "http://localhost:3000/"
    var clientId = "90483cf9b8d2f46424fa"
    var clientSecret = "52d0a00f6b20ec70425bef9126c2532b382b4bc3"
}
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser())
router.get('/auth',(req,res)=>{
    var {query} = req;
    var {code} = query;
    console.log(code)
    if(!code){
        return res.send({
            success:false,
            message:"Error: no code"
        })
    }
    request.post("https://github.com/login/oauth/access_token/",
    {
        client_id:clientId,
        client_secret:clientSecret,
        code:code
    },
    (result)=>{
        console.log("hit");
        const data= res.data;
        console.log(code)
        res.cookie('token',code,{ maxAge: 1000 * 60 * 10, httpOnly: false })
        res.redirect(frontend)
    })
})

router.get('/install',(req,res)=>{
    res.send("thanks for installing bot")
})

router.get('/',(req,res)=>{
    res.redirect(frontend+'/register')
})


module.exports = router