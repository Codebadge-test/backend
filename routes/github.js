const express = require('express')
const router = express.Router();
var cookieParser = require('cookie-parser')
const Trello = require('trello')
const bodyParser = require('body-parser')
const request = require('request')

var frontend = "https://codebadge-frontend.netlify.com"
// var frontend = "http://localhost:3000/"
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
        client_id:"9a3d93461f11673e4164",
        client_secret:"3c799896323f37a83ebfc0acf208f611540998b4",
        code:code
    },
    (result)=>{
        console.log("hit");
        const data= res.data;
        console.log(code)
        res.cookie('token',code);
        res.redirect(frontend)
    })
})


module.exports = router