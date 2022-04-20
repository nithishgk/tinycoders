const { Console } = require('console');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const cors = require('cors') 
const logger=require('./logger');
const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
//const authRoute=require('./routes/auth');
const Question = require('./models/posts');
const User=require('./models/User');
const Scores=require('./models/Scores');
const Joi=require('@hapi/joi');
const jwt=require('jsonwebtoken');
const { MONGO_URI } = require('./config');

mongoose.set('debug', true);

//middleware
app.use(bodyParser.json());


app.use(
    cors({
      origin:"*"
    })
  )



app.get('/',function(req,res){
    res.send("hello world");
});

app.post('/questions', async (req, res) => {
    try {
        const { score } = req.body
        const { category } = req.body
        const { level } = req.body
        const { qid } = req.body
        const { description } = req.body
        const { correct_answer } = req.body
        const { incorrect_answers } = req.body
         const question = await Question.create({
             score,
             category,
             level,
             qid,
             description,
             correct_answer,
             incorrect_answers
         })
         
         logger.info(JSON.stringify(question))
        return (res.status(201).json(question))
        
    } catch (error) {
        logger.info(JSON.stringify(error));
        return (res.status(500).json({"error":error}))
        
    }
})

app.get('/question', async (req, res) => {
    try {
        const questions = await Question.find();
        
        return (res.status(200).json(questions))
        
    } catch (error) {
        
        logger.error(`Error in retrieving questions ${error}`)
        res.json(error)
        

        
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
           
        }else{
            logger.info(JSON.stringify({lang1,level1}))
            res.json(question)
           
        }
    } catch (error) {
        logger.error(`Error in retrieving questions ${error}`)
        res.json(error)
       
    }
})


//signup

// const signupSchema=Joi.object({
//     name:Joi.string().min(6).required(),
//     email:Joi.string().email().required(),
//     password:Joi.string().min(6).required(),

// });

app.post('/signup', async (req, res) => {
    var email = req.body.mailId;
    var password = req.body.password;
    var name = req.body.fullName;
    var isvalid = false;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=new User({
        name : name,
        email : email,
        password: hashedPassword
    });
    try{
        const emailExist=await User.findOne({"email":email})
        if(!emailExist){
            isvalid = true;
            const savedUser =await user.save();
            res.status(400).send(isvalid);
        }
        else{
            isvalid = false;
            return res.status(400).send(isvalid);
        }
    }    
    catch(error){
        res.status(400).send(error);
    }
})

//login
// const loginSchema=Joi.object({
    
//     email:Joi.string().email().required(),
//     password:Joi.string().min(6).required(),

// });


app.post('/login', async (req, res) => {
    try{
        var email = req.body.userName;
        var password = req.body.password;
        var isvalid = true;
        const user= await User.findOne({"email":email});
        const validPassword=await bcrypt.compare(password,user.password);
        if(!user || !validPassword){
            isvalid=false
            return res.status(400).send(isvalid);
        }
        else{
            return res.status(400).send(isvalid);
        }
    }
    catch(error){
        return res.status(400).send(error);
    }
    
})


app.post('/score',async (req, res) => {
    try{
        var dict = req.body.dict
        var level= req.body.level
        var category= req.body.category
        const question = await Question.find( {"category":category,"level":level})
        const passpercent = await Scores.find({"category":category,"level":level})
        //console.log(passpercent)
        var dynamic = passpercent[0].pass;
        //console.log(passpercent.pass);
        //console.log(dict[question[0]].qid);
        //console.log(question);
        //console.log(dict);
        var score=0;
        for(var i=0;i<question.length;i++){
            if(dict[question[i].qid] == question[i].correct_answer){
                score=score+1;
            }
        }
        //console.log(score);
        return res.status(500).send({"score":score,"dynamic":dynamic});
    } catch(error){
        return res.status(505).json({"error":error})
    }

})

//dynamic pass percentages

app.post('/percentages', async (req, res) => {
    try {
        const { category } = req.body
        const { level } = req.body
        const { pass } = req.body
         const  scores = await Scores.create({
             category,
             level,
             pass,
         })
         
         logger.info(JSON.stringify(scores))
        return (res.status(201).json(scores))
        
    } catch (error) {
        logger.info(JSON.stringify(error));
        return (res.status(500).json({"error":error}))
        
    }
});

//getscores 

app.get('/getScores', async (req, res) => {
    try {
        const levels= await Scores.find();
        
        return (res.status(200).json(levels))
        
    } catch (error) {
        
        logger.error(`Error in retrieving level scores ${error}`)
        res.json(error)
    }
});

//users data 

app.get('/data', async (req, res) => {
    try {
        const myDB = await User.find();
        return (res.status(200).json(myDB))
        
    } catch (error) {
        logger.error(`Error in retrieving questions ${error}`)
        res.json(error)
    }
})

//connect to mongodb

mongoose.connect(MONGO_URI,{
    useNewUrlparser:true,
    useUnifiedTopology:true
})
 .then(()=>logger.info("connected to db"))
  .catch(err =>logger.error(err))

const { join } = require('path');


//import routes

//app.use('/api/user',authRoute);
//app.get('/datab',authRoute);
  
logger.error('error');
logger.warn('warn');
logger.info('info');
const port = 2001;
app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`)
});


