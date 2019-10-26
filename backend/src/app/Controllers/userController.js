const { User } = require('../models');
var empty = require('is-empty');
module.exports = {
    async index(req, res){
        return res.json({ok : true});
    },

    async store(req, res){
        var lblname = req.body.lblNome;
        var lblemail = req.body.lblEmail;
        var lblpassword = req.body.lblSenha;
        var lblcpf = req.body.lblCpf;

        if(!empty(lblname) && !empty(lblemail) && !empty(lblpassword) && !empty(lblcpf)){
            var emailExists = await User.findOne({ where: {email: lblemail} });
            if(!emailExists){
                var cpfExists = await User.findOne({ where: {cpf: lblcpf} });
                if(!cpfExists){
                    User.create({name: lblname, email: lblemail,password: lblpassword, cpf: lblcpf});
                    res.end(JSON.stringify({message : 'Conta Criada com Sucesso !!!'}));
                }else{
                    res.end(JSON.stringify({message : 'CPF em uso no Sistema'}));
                }
            }else{
                res.end(JSON.stringify({message : 'Esse E-mail já está em uso no Sistema'}));
            }
        }else{
            res.end(JSON.stringify({message : 'Campos Vazios'}));
        }
    }
};      