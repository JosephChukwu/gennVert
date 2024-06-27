const express = require('express');
const { singleLodge, createLodge, updateLodge, getAll} = require('../controllers/lodgeController.js');
const lodgeRoute = express.Router()
const verifyToken = require('../middlewares/verifyToken.js');



//get all lodges
lodgeRoute.get('/allLodges', getAll )


//geta single lodge
lodgeRoute.get('/singleLodge/:id', singleLodge)

//create a new lodge
lodgeRoute.post('/createLodge/:id',verifyToken, createLodge)
// lodgeRoute.post('/image', upload.array('image', 5), uploadImage)

//update a lodge
lodgeRoute.patch('/updateLodge/:id',verifyToken, updateLodge)

//delete a single lodge
// lodgeRoute.delete('/deleteLodge/:id',verifyToken, deleteLodge)

module.exports = lodgeRoute;