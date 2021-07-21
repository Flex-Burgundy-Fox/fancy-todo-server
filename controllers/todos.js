const {Todo} = require('../models')

class Controller {

    static addTodo (req, res){
        let input = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        Todo.create(input)
        .then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            if(err.name === "SequelizeValidationError") res.status(400).json(err)
            else res.status(500).json(err)
        });
    }

    static viewTodo (req, res){
        Todo.findAll()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    }

    static findTodo (req, res){
        Todo.findAll(req.body, {
            where : {
                id : +req.params.id
            }
        })
        .then((result) => {
            if(!result.length) throw {message : "error not found"}
            res.status(200).json(result[0])
        }).catch((err) => {
            res.status(404).json(err)
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
            // console.log(result);
            if(!result[0]) throw {message : "error not found"}
            else res.status(200).json(result[1][0])
        }).catch((err) => {
            if(err.name === "SequelizeValidationError") res.status(400).json(err)
            if(err.message === "error not found")res.status(404).json(err)
            else res.status(500).json(err)
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
            // console.log(result);
            if(!result[0]) throw {message : "error not found"}
            else res.status(200).json(result[1][0])
        }).catch((err) => {
            if(err.name === "SequelizeValidationError") res.status(400).json(err)
            if(err.message === "error not found")res.status(404).json(err)
            else res.status(500).json(err)
        });
    }

    static deleteTodo (req, res){
        Todo.findByPk(+req.params.id)
        .then((todo) => {
            if(!todo) throw {message : "error not found"}

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
            if(err.message === "error not found")res.status(404).json(err)
            else res.status(500).json(err)
        });
    }

}

module.exports = Controller