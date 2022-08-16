"use strict"

const userDAO = require('../model/userDAO');

const login = async (req, res) => {
    if(req.session.user_key){
        res.send("<script>location.href='/';</script>");
    } else{
        res.render('../views/login.ejs');
    }
}




const loginProcess = async (req, res) => {
    const parameters = {
        id: req.body.id,
        pw: req.body.pw
    }
    const db_data = await userDAO.userCheck(parameters);
    if(db_data.length != 0){
        req.session.user_key = db_data[0].user_key;
        req.session.save(function(){
            res.send("<script>alert('로그인 성공'); location.href='/';</script>");
        })
    } else{
        delete req.session.user_key;
        res.send("<script>alert(`로그인 실패 \n\n로그인페이지로 이동`); location.href='/login';</script>");
    }
}

const logoutProcess = async (req, res) => {
    delete req.session.user_key;

    res.send("<script>alert(`로그아웃 성공`); location.href='/login';</script>");
}

module.exports = {
    login,
    loginProcess,
    logoutProcess
}