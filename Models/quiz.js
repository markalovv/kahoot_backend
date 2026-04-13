const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desciption: {
        type: String
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: [{
        questionText: {
            type: String,
            required: true
        },
        questionType: {
            type: String,
            enum: ['quiz', 'true-false'],
            default: 'quiz'
        },
        options: [{
            text: { type: String, required: true},
            isCorrect: { type: Boolean, required: true, default: false }
        }],
        timeLimit: {
            type: Number,
            default: 20
        },
        points: {
            type: Number,
            default: 1000
        }
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Quiz', quizSchema)