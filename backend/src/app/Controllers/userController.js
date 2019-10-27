const { User } = require('../models');
var empty = require('is-empty');

module.exports = {
    async index(req, res){
        var allUser = await User.findAll();
        res.end(JSON.stringify({user : allUser}));
    },
    async indexCadastro(req, res){
        res.end(JSON.stringify({message : 'Cadastro'}));    
    },
    async cadastrar(req, res){
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
    },
    async indexUpdate(req, res){
        var idUser = req.params.id;
        var user = await User.findOne({ where: {id: idUser} });
        res.end(JSON.stringify({user : user}));
    },
    async update(req, res){

        var idUser = req.params.id;
        var lblname = req.body.lblNome;
        var lblemail = req.body.lblEmail;
        var lblpassword = req.body.lblSenha;
        var lblcpf = req.body.lblCpf;

        User.update({name: lblname, email: lblemail,password: lblpassword, cpf: lblcpf},{where: {id: idUser}});
        res.end(JSON.stringify({message : 'Usuário Atualizado'}));
    },
    async delete(req, res){
        var idUser = req.params.id;
       
        User.delete({where: {id: idUser}});
        res.end(JSON.stringify({message : 'Usuário Apagado'}));
    },
};      