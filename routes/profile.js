const express = require('express');
const profileRouter = express.Router();
const Profile = require('../models/Profile');

/* GET users listing. */
profileRouter.route('/')
.get(async function(req, res, next) {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;
    try {
        const aProfile = await Profile.find().limit(limit).skip(skip).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(aProfile);
    } catch (error) {
        next(error);
    }
})
.post(async function(req, res, next) {
    try {
        const aProfile = await Profile.create(req.body);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(aProfile);
    } catch (error) {
        next(error);
    }
})
.put(async function(req, res, next) {  
    res.send('This route is not implemented');
})
.delete(async function(req, res, next) {
    res.send('This route is not implemented');
});



profileRouter.route('/')
.get( async function(req, res, next) {
    try {
        const aProfile = await Profile.findById(req.params.id).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(aProfile);
    } catch (error) {
        next(error); 
    }
})
.post(async function(req, res, next) {  
    res.send(' this route is not implemented');
})
.put(async function(req, res, next) {
    try {
        const aProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(aProfile);
    } catch (error) {
        next(error);
    }
})
.delete(async function(req, res, next) {
    try {
        const aProfile = await Profile.findByIdAndDelete(req.params.id).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(aProfile);
    } catch (error) {
        next(error);
    }
});

module.exports = profileRouter;
