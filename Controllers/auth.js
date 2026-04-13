const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body
        const Username = await User.findOne({ username })

        if (Username) {
            return res.status(400).send('username has already')
        }

        const salt = await bcrypt.genSalt(10)
        const user = new User({
            username,
            password
        })
        user.password = await bcrypt.hash(password, salt)

        await user.save()
        res.status(201).send('register success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOneAndUpdate({ username }, { new: true })
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('password Invalid')
            }

            const payload = {
                user: {
                    username: user.username
                }
            }

            jwt.sign(payload, 'jwtsecret', { expiresIn: "1d"}, (err, token) => {
                if (err) throw err

                res.json({ token, payload })
            })
        } else {
            return res.status(400).send("username is not register")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}