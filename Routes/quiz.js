const express = require('express')
const { createQuiz, updateQuiz, deleteQuiz } = require('../Controllers/quiz')
const router = express.Router()

router.post('/createquiz', createQuiz)
router.put('/updatequiz', updateQuiz)
router.delete('/deletequiz', deleteQuiz)

module.exports = router