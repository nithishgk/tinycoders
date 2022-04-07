const { Console } = require('console');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const routes = require('./routes') 
const cors = require('cors') 
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


app.get('/',function(req,res){
    res.send("hello world");
});
    


// app.post('/questions', async (req, res) => {
//     try {
//         const { score } = req.body
//         const { category } = req.body
//         const { level } = req.body
//         const { description } = req.body
//         const { correct_answer } = req.body
//         const { incorrect_answers } = req.body
//          const question = await Question.create({
//              score,
//              category,
//              level,
//              description,
//              correct_answer,
//              incorrect_answers
//          })

//         return res.status(201).json(question)
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// })

app.get('/question', async (req, res) => {
    try {
        const questions = await Question.find();
        console.log(questions)
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

app.get('/questions/:category/:level', async (req, res) => {
    try {
        const lang1 = req.params.category
        const level1 = req.params.level

        const question = await Question.find( {"category":lang1,"level":level1})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})






//connect to mongodb

mongoose.connect(MONGO_URI,{
    useNewUrlparser:true,
    useUnifiedTopology:true
})
 .then(()=>console.log("connected to db"))
  .catch(err =>console.log(err))

const Question = require('./models/posts')
  
const port = 2001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


