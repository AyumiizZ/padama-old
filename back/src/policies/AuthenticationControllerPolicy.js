const Joi = require('joi')

module.exports = {
    async register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'th'] } }),
            password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9@]{8,32}$'))
        })
        // const schema = {
        //     email: Joi.string().email(),
        //     password: Joi.string().regex(
        //         new RegExp('^[a-zA-Z0-9@]{8,32}$')
        //     )
        // }

        try {
            const value = await schema.validateAsync(req.body)
            // res.send(value)
            next()
        }
        catch (err) {
            switch (err.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: 'Wrong Email'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'Wrong Password'
                    })
                    break
                default:
                    res.status(400).send({
                        error: err
                    })

            }
        }
    }
}