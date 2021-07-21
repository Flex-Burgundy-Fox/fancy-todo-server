const e = require("express")
const {Todo} = require("../models")

class TodoController {
    static createTodo(req, res) {
        const {title, description, status, due_date} = req.body
        Todo.create({title, description, status, due_date})
        .then((data) => {
            res.status(201).json({
                result: data
            }) 
        })
        .catch((err) => {
            let error = err.message.split(":")[0]
            if (error === "Validation error") {
                res.status(400).json({error : err.message.split(": ")[1]})
            } else {
                res.status(500).json({error: "internal server error"})
            }
        })
    }

    static showTodos(req, res) {
        Todo.findAll()
        .then((data) => {
            res.status(200).json({
                result : data
            })
        })
        .catch((err) => {
            res.status(500).json({error: "internal server error"})
        })
    }

    static getTodoId(req, res) {
        Todo.findOne({
            where : {id: +req.params.id}
        })
        .then((data) => {
            if (result == null) {
                throw new Error()
            } else {
                res.status(200).json({
                    result: data
                }) 
            }
        })
        .catch((err) => {
            res.status(404).json({error: "error not found"})
        })
    }

    static putTodo (req, res) {
        const {title, description, status, due_date} = req.body
        Todo.update({title, description, status, due_date},
            {where: {id: +req.params.id},
            returning: true
        })
        .then((data) => {
            if (data[0] === 0) {
                throw new Error({name: "error", msg: "error not found"})
            } else {
                res.status(200).json({
                    result: data[1][0]
                }) 
            }
        })
        .catch((err) => {
            let error = err.message.split(":")[0]
            if (error === "Validation error") {
                res.status(400).json({error : err.message.split(": ")[1]})
            } else if (err.name === "Error"){
                res.status(404).json({error: "error not found"})
            } else {
                res.status(500).json({error: "internal server error"})
            }
        })
    }

    static patchTodo (req, res) {
        const {status} = req.body
        Todo.update({status},
            {
                where: {id: +req.params.id},
                returning: true
        })
        .then((data) => {
            if (data[0] === 0) {
                throw new Error({name: "error", msg: "error not found"})
            } else {
                res.status(200).json({
                    result: data[1][0]                
                }) 
            }
        })
        .catch((err) => {
            let error = err.message.split(":")[0]
            if (error === "Validation error") {
                res.status(400).json({error : err.message.split(": ")[1]})
            } else if (err.name === "Error"){
                res.status(404).json({error: "error not found"})
            } else {
                res.status(500).json({error: "internal server error"})
            }
        })
    }

    static deleteTodo(req, res) {
        Todo.destroy({
            where : {id : +req.params.id}
        })
        .then((data => {
            if(data === 0){
                throw new Error({name: "error", msg: "error not found"})
            } else{
                res.status(200).json({message : 'todo success to delete'})
            }
        }))
        .catch((err) => {
            if (err.name === "Error"){
                res.status(404).json({error: "error not found"})
            } else {
                res.status(500).json({error: "internal server error"})
            }
        })
    }
}

module.exports = TodoController