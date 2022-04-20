const { Console } = require('console');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const routes = require('./routes') 
const cors = require('cors') 
const logger=require('./logger');
const mongoose =require('mongoose');
const { MONGO_URI } = require('./config');
//const Question = require('./models/posts');
mongoose.set('debug', true);

//middleware
app.use(bodyParser.json());


app.use(
    cors({
      origin:"*"
    })
  )

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//     });

app.get('/',function(req,res){
    res.send("hello world");
});
app.post('/questions', async (req, res) => {
    try {
        const { score,category,level,qid,description,correct_answer,incorrect_answers } = req.body
        const question = await Question.create({
             score,
             category,
             level,
             qid,
             description,
             correct_answer,
             incorrect_answers
         })
         //logging:(message)=>{logger.info(message)}
         //logger.info(JSON.stringify(question))
        return (res.status(201).json(question))
        //logger.info(JSON.stringify(question))
    } catch (error) {
        logger.info(JSON.stringify(error));
        return (res.status(500).json({"error":error}))
        //logger.info(JSON.stringify(error));
    }
})

app.get('/question', async (req, res) => {
    try {
        const questions = await Question.find();
        //logger.info(questions)
        logger.info(JSON.stringify(questions))
        return (res.status(200).json(questions))
        //logger.info(JSON.stringify(questions))
    } catch (error) {
        //return res.status(500).json({"error":error})
        logger.error(JSON.stringify(error));
        return res.status(500).json({"error":error})
        //logger.error(error);
    }
})

app.get('/questions/:category/:level', async (req, res) => {
    try {
        const lang1 = req.params.category
        const level1 = req.params.level

        const question = await Question.find( {"category":lang1,"level":level1})        
        if(!question){
            logger.info(JSON.stringify())
            return res.status(404).json({})
            //logger.info(JSON.stringify())
        }else{
            logger.info(JSON.stringify({lang1,level1}))
            return res.status(200).json(question)
            //logger.info(JSON.stringify(question))
        }
    } catch (error) {
        logger.info(JSON.stringify(error));
        return res.status(500).json({"error":error})
        //logger.info(JSON.stringify(error));
    }
})
//connect to mongodb
app.post('/score',async (req, res) => {
    try{

        var dict = req.body.dict
        var level= req.body.level
        var category= req.body.category
        const question = await Question.find( {"category":category,"level":level})
        
        //console.log(dict[question[0]].qid);
        console.log(question);
        console.log(dict);
        var score=0;
        for(var i=0;i<question.length;i++){
            if(dict[question[i].qid] == question[i].correct_answer){
                score=score+1;
            }
        }
        console.log(score);
        return res.json(score);
    } catch(error){
        return res.status(505).json({"error":error})
    }

})

mongoose.connect(MONGO_URI,{
    useNewUrlparser:true,
    useUnifiedTopology:true
})
 .then(()=>logger.info("connected to db"))
  .catch(err =>logger.error(err))

const Question = require('./models/posts')
  
logger.error('error');
logger.warn('warn');
logger.info('info');
// logger.silly('silly');
// logger.verbose('verbose');
const port = 2001;
app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`)
});


