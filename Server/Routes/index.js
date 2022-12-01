const express = require('express');

const locationController = require('../Controller/location');
const mealtypeController = require('../Controller/mealtypes');
const restaurantController = require('../Controller/restaurant');
const userController = require('../Controller/user');
const menuItemsController = require('../Controller/menuItems');

const route = express.Router();

route.get('/locations', locationController.getLocations);
route.get('/mealtypes', mealtypeController.getMealtypes);
route.get('/restaurants/:locId', restaurantController.getRestaurantByLocId);
route.post('/signup', userController.Sighnup);
route.post('/login', userController.userLogin);
route.post('/filter', restaurantController.filterRestaurants);
route.get('/restaurant/:resId', restaurantController.getRestaurantDetailsById);
route.get('/menuitems/:resID', menuItemsController.getMenuItemsByResId);

module.exports = route;