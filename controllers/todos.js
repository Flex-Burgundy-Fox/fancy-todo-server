const {Todo} = require('../models')

class Controller {

    static addTodo (req, res){
        let input = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId : req.currentUser.id
        }
        Todo.create(input)
        .then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            if(err.name === "SequelizeValidationError") next(err)
            else next(err)
        });
    }

    static viewTodo (req, res){
        Todo.findAll()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            next(err)
        });
    }

    static findTodo (req, res){
        Todo.findAll({
            where : {
                id : +req.params.id
            }
        })
        .then((result) => {
            if(!result.length) next({name : "TODO NOT FOUND"})
            res.status(200).json(result[0])
        }).catch((err) => {
            next(err)
        });
    }

    static putTodo (req, res){
        Todo.update(req.body,{
            where : {
                id : +req.params.id
            },
            returning : true
        })
        .then((result) => {
            if(!result[0]) next ({name : "TODO NOT FOUND"})
            else res.status(200).json(result[1][0])
        }).catch((err) => {
            next(err)
        });
    }

    static patchTodo (req, res){
        let input = { status : req.body.status}
        Todo.update(input,{
            where : {
                id : +req.params.id
            },
            returning : true
        })
        .then((result) => {
            if(!result[0]) next ({name : "TODO NOT FOUND"})
            else res.status(200).json(result[1][0])
        }).catch((err) => {
            next(err)
        });
    }

    static deleteTodo (req, res){
        Todo.findByPk(+req.params.id)
        .then((todo) => {
            if(!todo) next ({name : "TODO NOT FOUND"})

            Todo.destroy({
                where : {
                    id : +req.params.id
                }
            })
            .then((result) => {
                res.status(200).json({message : 'todo success to delete', deletedData : todo})
            }).catch((err) => {
                throw err
            });
            
        }).catch((err) => {
            next(err)
        });
    }

}

module.exports = Controller