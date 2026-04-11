const User = require('../Models/user')

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = new User({
            username,
            password
        })
        await user.save()
        res.status(201).send('register success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}