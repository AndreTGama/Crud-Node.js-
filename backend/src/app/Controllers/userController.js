const { User } = require('../models');
var empty = require('is-empty');
const bcrypt = require('bcrypt');


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
        if(!empty(lblname) && !empty(lblemail)){
            if(lblname){
                let updateValues = { name: lblname };
                User.update(updateValues, { where: { id: idUser } }).then(() => {
                    res.end(JSON.stringify({message : 'Usuário Atualizado'}));
                });
            }
            if(lblemail){
                var emailExists = await User.findOne({ where: {email: lblemail} });
                if(!emailExists){
                    let updateValues = { email: lblemail };
                    User.update(updateValues, { where: { id: idUser } }).then(() => {
                    res.end(JSON.stringify({message : 'Usuário Atualizado'}));
                });
                }else{
                    res.end(JSON.stringify({message : 'Esse E-mail já está em uso no Sistema'}));
                }
            }
        }else{
            res.end(JSON.stringify({message : 'Campos Vazios'}));
        }
    },

    async delete(req, res){
        var idUser = req.params.id;
        User.destroy({where: {id: idUser}});
        res.end(JSON.stringify({message : 'Usuário Apagado'}));
    },

    async updateSenha(req, res){
        //Caso queira Mudar
        var idUser = req.params.id;
        var lblOldPassword = req.body.lblSenha;
        var lblNewPassword1 = req.body.lblSenha1;
        var lblNewpassword2 = req.body.lblSenha2;
        if(!empty(lblOldPassword) && !empty(lblNewPassword1) && !empty(lblNewpassword2)){
            var user = await User.findOne({ where: {id: idUser} });
            var senha = user['password'];
            if(senha == lblOldPassword){
                if(lblNewPassword1 == lblNewpassword2){
                    if(lblNewPassword1 != lblOldPassword){
                        let updateValues = { password: lblNewPassword1 };
                        User.update(updateValues, { where: { id: idUser } }).then(() => {
                            res.end(JSON.stringify({message : 'Senha do Usuário Atualizado'}));
                        });
                    }else{
                        res.end(JSON.stringify({message : 'Senha Nova não pode ser igual a senha Antiga'}));
                    }
                }else{
                    res.end(JSON.stringify({message : 'Senha Nova não confere'}));
                }
            }else{
                res.end(JSON.stringify({message : 'Senha não confere'}));
            }
        }else{
            res.end(JSON.stringify({message : 'Campos Vazios'}));
        }
    },

    async esqueciSenha(req, res){
        //caso tenha esquecido a senha
        var idUser = req.params.id;
        var lblEmail = req.body.lblEmail;
        var lblNewPassword1 = req.body.lblSenha1;
        var lblNewpassword2 = req.body.lblSenha2;
        if(!empty(lblEmail) && !empty(lblNewPassword1) && !empty(lblNewpassword2)){
            var user = await User.findOne({ where: {id: idUser} });
            var email = user['email'];
            if(email == lblEmail){
                if(lblNewPassword1 == lblNewpassword2){
                    if(lblNewPassword1 != lblOldPassword){
                        let updateValues = { password: lblNewPassword1 };
                        User.update(updateValues, { where: { id: idUser } }).then(() => {
                            res.end(JSON.stringify({message : 'Senha do Usuário Atualizado'}));
                        });
                    }else{
                        res.end(JSON.stringify({message : 'Senha Nova não pode ser igual a senha Antiga'}));
                    }
                }else{
                    res.end(JSON.stringify({message : 'Senha Nova não confere'}));
                }
            }else{
                res.end(JSON.stringify({message : 'E-mail não confere'}));
            }
        }else{
            res.end(JSON.stringify({message : 'Campos Vazios'}));
        }
    }
};      