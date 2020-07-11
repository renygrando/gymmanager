const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { age, date } = require("../utils")

exports.index = (req, res) => {
   
    return res.render("members/index", {members: data.members})
}

exports.create = (req, res) => {
    return res.render("members/create")
}

exports.post = (req, res) => {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == ""){
            return res.send("Por favor, preencha todos os campos!")
        }
    }

    let { avatar_url, birth, gender, services, name } = req.body
    
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.members.length + 1)

    data.members.push({
        id,
        avatar_url,
        name,
        birth, 
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data,null, 2), function(err){

        if (err) return res.send("ERRO!")

        return res.redirect("/members")
    })
}

exports.show = (req, res) => {
    const {id} = req.params
    const foundMember = data.members.find(function(member){

        return member.id ==id
    })

    if (!foundMember) return res.send('Ops! Instrutor não encontrado')


    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return res.render('members/show', { member })
}

exports.edit = (req, res) => {
    const {id} = req.params
    const foundMember = data.members.find(function(member){

        return member.id ==id
    })

    if (!foundMember) return res.send('Ops! Instrutor não encontrado')

    const members = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render("members/edit", { members })
}

exports.put = (req, res) => {
    const {id} = req.body
    let index = 0
    const foundMember = data.members.find(function(member, foundIndex){

        if (member.id ==id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('Ops! Instrutor não encontrado')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("write error")
        return res.redirect(`/members/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredMembers = data.members.filter((member) => {
        return member.id != id
    })
    
    data.members = filteredMembers
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write erros")

        return res.redirect("/members")

    })
}