const express = require('express')
const router = express.Router();

const Trello = require('trello')
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

function getToken(orgName){
    return new Promise((resolve,reject)=>{
        trello = new Trello("d310c6ebba1f855c5afc093dc7ef6170", "adce159ea83a6cd0f11dc8f5d5038cd961d52e65f91d8730cc64171b284ebee5");
        if(trello){
            resolve(trello);
        }
        else{
            reject("trello authentication error");
        }
    })
    return trello;
}

function getuserBoards(trello,useremail){
    return new Promise((resolve,reject)=>{
        trello.getBoards(useremail,
            function (error, trelloboards) {
                if (error) {
                    console.log('Could not add board:', error);
                    reject(error)
                }
                else {
                    resolve(trelloboards);
                }
            }
        );   
    })
}

function getBoardDetail(trello,boardName,useremail){
    return new Promise((resolve,reject)=>{
    getuserBoards(trello,useremail)
        .then(boardList=>{            
            for(let board of boardList){
                if(board.name==boardName){
                    resolve(board);
                }
            }
            return "need new board";
        })
        .then(message=>{
            console.log("message:- ",message)
            if(message=="need new board"){
                addBoard(trello,boardName,useremail)
                    .then(board=>{
                        console.log(board);
                        resolve(board);
                    })
                    .catch(error=>reject(error))
            }
            else{
                resolve(message)
            }
        })
        .catch(error=>reject(error))
    })
}

function getLists(trello,boardId){
    return new Promise((resolve,reject)=>{
        trello.getListsOnBoard(boardId)
            .then(lists=>resolve(lists))
            .catch(error=>reject(error))
    })
}

function getListDetail(trello,boardId,listName){
    return new Promise((resolve,reject)=>{
        getLists(trello,boardId)
            .then(lists=>{
                for (const list of lists) {
                    if(list.name == listName){
                        resolve(list);
                    }
                }
                reject("list not found");
            })
            .catch(error=>reject("lists on board not fetched"))
    })  
}

function getCards(trello,boardId,listId){
    return new Promise((resolve,reject)=>{

        trello.getCardsOnList(listId)
            .then((cards) => {
                //do stuff
                for (const card of cards) {
                    resolve(card)
                }
                reject("error")
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }

function getCardDetail(trello, boardId, listId, cardTitle) {
    return new Promise((resolve,reject)=>{
        trello.getCardsOnList(list.id)
            .then((cards) => {
                for (const card of cards) {
                    resolve(card)
                }
            })
            .catch(error => {
                return reject(error);
            })
        });
}


function addCard(trello,list,cardTitle,cardDetails){
    console.log("test addCard")
    return new Promise((resolve,reject)=>{
        if(list.name==listName){
            trello.addCardWithExtraParams(cardTitle,cardDetails, list.id)
                .then(card=>{
                    resolve(card);
                })
                .catch(error=>{
                    reject(error)
                })
        }
    });
}

function moveCard(trello,listId){
    return new Promise((resolve,reject)=>{
        getCardDetail(trello, board.id, listId, cardName)
            .then((card)=>{
                trello.updateCardList(card.id,newlist.id,(error,updatedCard)=>{
                    console.log("updated card list",updatedCard)
                    })
                })
            })
}

function addlist(trello,listName,boardId){
    return new Promise((resolve,reject)=>{
        trello.addListToBoard(boardId,listName,
            function (error, trellolist) {
                if (error) {
                    console.log('Could not add board:', error);
                    reject(error);
                }
                else{
                    console.log("list added:- ",trellolist);
                    resolve("added");
                }
            }
        )
    })
}

function addBoard(trello,boardName,useremail){
    return new Promise((resolve,reject)=>{
        console.log("test")
        trello.addBoard(boardName,useremail)
            .then(trelloBoard=>{
                    console.log("added trelloboard:- ",trelloBoard)
                    resolve("board added");
            })
            .catch(err=>{
                console.log("could not add board:-",err);
                reject(err);
            })
    })
}

router.post('/addcard',(req,res)=>{
    var orgName = "codeuino";
    var useremail = req.body.useremail;
    var boardName = req.body.boardname;
    var listName = req.body.list;
    var cardTitle = req.body.cardtitle;
    var cardDetails = req.body.carddetails;
    getToken(orgName)
        .then((trello)=>{
            getBoardDetail(trello,boardName,useremail)
                .then(board=>{
                    console.log(board)
                    getListDetail(trello,board.id,listName)
                        .then(list=>{
                            console.log(list)
                            addCard(trello,list,cardTitle,cardDetails)
                                .then(card=>{console.log(card);res.sendStatus(200)})
                                .catch(error=>{console.log(error);res.sendStatus(500)})
                        })
                        .catch(error=>res.send(error))
                })
                .catch(error=>{console.log(error);res.send(error)})
        })
        .catch(error=>res.send(error))
})

router.get('/movecard',(req,res)=>{
    var orgName = req.body.orgname;
    var useremail = req.body.useremail;
    var boardName = req.body.boardname;
    var newList = req.body.newlist;
    var cardDetails = req.body.carddetails;
    getToken(orgName)
        .then(trello=>{
            getBoardDetail(trello,boardName,useremail)
                .then(board=>{
                    getListDetail(trello,board.id,newList)
                        .then(newlist=>{
                            moveCard(trello.board.id,newlist.id,cardDetails)
                                .then(card=> res.sendStatus(200))
                                .catch(error=> res.sendStatus(500))
                    })
                    .catch(error=>res.sendStatus(404))
                })
                .catch(error=>res.sendStatus(404))
        })
        .catch(error=>res.sendStatus(401))
})

router.post('/addboard',(req,res)=>{
    var orgName = req.body.orgname;
    var useremail = req.body.useremail;
    getToken(orgName)
        .then(trello=>{
            var boardName = req.body.boardname;
            addBoard(trello,boardName,useremail)
                .then(added=>res.sendStatus(200))
                .catch(error=>res.sendStatus(500))
        })
        .catch(error=>res.sendStatus(401))
})

router.get('/addlist',(req,res)=>{
    var useremail = "an431999@gmail.com";
    var orgName = "codeuino";
    var boardName = "test board";
    var listName = "test list2";
    getToken(orgName)
        .then(trello=>{
            getBoardDetail(trello,boardName,useremail)
                .then(board=>{
                    addlist(trello,listName,board.id)
                        .then(added=>res.send(added))
                        .catch(error=>res.send(error))
                    }
                )
                .catch(error=>res.sendStatus(500))
            }
        )
        .catch(error=>res.sendStatus(401))
})

router.get('/',(req,res)=>{
    res.send("hello trello")
})

module.exports = router;
