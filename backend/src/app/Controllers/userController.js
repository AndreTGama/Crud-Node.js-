const {User} = require('../models/user');

module.exports = {
    async index(req, res){
        return res.json({ok : true});
    },

    async store(req, res){
        console.log(req.body);
        // const user = await User.create(req.body);
        // res.json(user);
    }
};      