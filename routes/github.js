const express = require('express')
const router = express.Router();
var cookieParser = require('cookie-parser')
const Trello = require('trello')
const bodyParser = require('body-parser')
const request = require('request')
const axios = require("axios")
var querystring = require('querystring');
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
    console.log(req)
    var {code} = query;
    console.log(code)
    if(!code){
        return res.send({
            success:false,
            message:"Error: no code"
        })
    }
    axios.post("https://github.com/login/oauth/access_token/",
    {
        client_id:clientId,
        client_secret:clientSecret,
        code:code
    })
    .then((result)=>{
        const data= result.data;
        var token = querystring.parse(data).access_token
        res.header('Access-Control-Allow-Origin','*')
        res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,COntent-Type,Accept');
        res.header("Access-Control-Allow-Credentials",true)
        res.cookie('token',token,{ maxAge: 1000 * 60 * 10, httpOnly: false })
        res.redirect(frontend+`user`)
    })
        .catch(err => {
            console.log(err)
            res.send(err)
        });
     })
    
     router.post('/user',(req,res)=>{
        var token = req.body.token;
        var userData = {
            username:null,
            orgs:[],
            avatar:null
        }
        console.log("hiting github/user")
        axios.get("https://api.github.com/user",header={Authorization: `token ${token}`})
            .then(resp=>{
                var data = resp.data
                userData.username= data.login
                userData.avatar = data.avatar
                if(!userData.username){
                    return data;
                }
            })
            .then(resp1=>{
                axios.get(resp.orgs,header={Authorization: `token ${token}`})
                    .then(resp=>{
                        var data = resp.data
                        userData.orgs= data
                        if(!userData.username){
                            res.json(userData);
                        }
                    })
            })
            .catch(err=>res.send(err))
    })


router.get('/install',(req,res)=>{
    res.redirect(frontend+'/register')
})

router.get('/',(req,res)=>{
    res.send("hello github")
})


module.exports = router