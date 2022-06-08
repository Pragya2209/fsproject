const moment = require('moment');
var ObjectId = require('mongoose').Types.ObjectId; 
const Article = require('../models/article');
const Category = require('../models/category');
const Author = require('../models/author');

const updateArticle = async (req, res, next) => {
    try {  
        const data = {
            heading: req.body.heading,
            content: req.body.content,
            authorId: new ObjectId(req.body.authorId),
            thumbnail : req.body.thumbnail,
            categoryId : req.body.category
        };

        await Article.create(data)
        res.status(200).send({message : 'Article Added'})
    }
    catch (err) {
        console.log (err)
        res.status(500).send({message : 'Some error occured'});
    }
};

const getArticle = async (req, res) => {
    try {
        let data = await Article.find({_id : new ObjectId(req.params.articleId)})
        if (data) {
            res.status(200).send({message : 'Article found Successfully', response : data})   
        }
        else {
            res.status(200).send({message : 'User Profile not found', response : {}})   
        }
    }
    catch (err) {
        res.status(500).send({message : 'Some error occured'});
    }
}

const getAllArticles = async (req, res) => {
    try {
        let query = {}
        let sort = {createdAt : 1}
        let page = req.body.page || 1
        let limit = req.body.limit || 10

        if (req.body.filter) {
            if (req.body.filter.author) {
                let objectIds = []

                for (let filter of req.body.filter.author) {
                    objectIds.push (new ObjectId(filter))
                }
                if (!query['$and']) {
                    query['$and'] = []
                }
                query['$and'].push (
                    {authorId : {$in : objectIds}}, 
                )
            }
            if (req.body.filter.category) {
                let objectIds = []

                for (let filter of req.body.filter.category) {
                    objectIds.push (new ObjectId(filter))
                }
                if (!query['$and']) {
                    query['$and'] = []
                }
                query['$and'].push (
                    {categoryId : {$in : objectIds}}, 
                )
            }            
           
        }
        if (req.body.search) {
            let authors = await Author.find({$or : [
                {firstName : { $regex: req.body.search, $options: 'i' }},
                {lastName : { $regex: req.body.search, $options: 'i' }},   
            ]})

            let categories = await Category.find({$or : [
                {name : { $regex: req.body.search, $options: 'i' }},
            ]})

            let authorIds = []
            for (let author of authors) {
                authorIds.push (new ObjectId(author._id))
            }

            let categoryIds = []
            for (let category of categories) {
                categoryIds.push (new ObjectId(category._id))
            }
            if (!query['$or']) {
                query['$or'] = []
            }
            query['$or'].push(
                {heading : { $regex: req.body.search, $options: 'i' }},
                {content : { $regex: req.body.search, $options: 'i' }}, 
                {authorId : {$in : authorIds}},
                {categoryId : {$in : categoryIds}}
            )
        }
         if (req.body.sort) {
             if (req.body.sort === 1) {
                 sort = {createdAt : -1}
             }
        }

        let response = await Article.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)

        let total = await Article.count (query)
        let newArr = []
        for (let r of response) {
            let category = await Category.findOne({_id : new ObjectId(r.categoryId)})
            let author = await Author.findOne({_id : new ObjectId(r.authorId)})
            newArr.push ({
                ...JSON.parse(JSON.stringify(r)), 
                category : (category.name || ''),
                author : (author.firstName || '') + " " + (author.lastName || '')
            })
        }
        let result = {
            docs : newArr,
            page : page,
            limit : limit,
            total : total
        }
        res.status(200).send({message : 'Articles found', response : result})

    }
    catch (err) {
        console.log (err)
        res.status(500).send({message : 'Some error occured'});   
    }
}

const getCategories = async (req, res) => {
    try {
        let response = await Category.find()
        res.status(200).send({message : 'Ctegories found', response : response})
    }
    catch (err) {
        console.log (err)
        res.status(500).send({message : 'Some error occured'});   

    }
}

const getAuthors  = async (req, res) => {
    try {
        let response = await Author.find()
        res.status(200).send({message : 'Autors found', response : response})
    }
    catch (err) {
        console.log (err)
        res.status(500).send({message : 'Some error occured'});   

    }
}

module.exports = {
    updateArticle,
    getArticle,
    getAllArticles,
    getCategories,
    getAuthors
};
