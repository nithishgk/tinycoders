const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
        score:Number,
        category:String,
        level:String,
        qid:Number,
        description: String,
        correct_answer: String, 
        incorrect_answers: [
        {
            type: String,
            required: true   
        }
        ]
})

module.exports = mongoose.model('Question', QuestionSchema)
