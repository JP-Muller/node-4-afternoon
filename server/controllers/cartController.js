const swag = require('./../models/swag.js')

module.exports = {
    add: (req, res) => {
        console.log(swag)
        let { id } = req.params
        let { user } = req.session
        id = +id

        const index = user.cart.findIndex(swag => swag.id === id)

        if (index === -1) {
            console.log(swag)
            const selectedSwag = swag.find(swag => swag.id === +id)

            user.cart.push(selectedSwag)
            user.total += selectedSwag.prices
        }
        res.status(200).send(user)
    },
    delete: (req, res) => {
        let { id } = req.params
        const { user } = req.session
        id = +id

        const index = user.cart.findIndex(swag => swag.id === id)
        const selectedSwag = swag.find(swag => swag.id === id)

        if (index !== -1) {
            user.cart.splice(index, 1)
            user.total -= selectedSwag.price
        }
        res.status(200).send(user)
    },
    checkout: (req, res) => {
        let { user } = req.session
        user.cart = []
        user.total = 0

        res.status(200).send(user)

    }
}