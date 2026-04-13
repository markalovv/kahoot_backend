const Quiz = require('../Models/quiz')

// exports.listQuiz = async (req, res) => {
//     try {

//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// }

exports.createQuiz = async (req, res) => {
    try {
        const newQuiz = new Quiz({
            ...req.body,
            creatorId: req.user.id
        })
        const savedQuiz = await newQuiz.save()
        res.status(201).json(savedQuiz)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedQuiz);
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.deleteQuiz = async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}