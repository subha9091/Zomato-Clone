const Restaurant = require('../Models/restaurant');

exports.getRestaurantByLocId = (req, res) => {
    const { locId } = req.params;

    Restaurant.find({ location_id: locId }, {})
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched Successfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

exports.filterRestaurants = (req, res) => {
    let { location, cuisine, lcost, hcost, sort, page, mealtype } = req.body;

    sort = sort ? sort : 1;
    page = page ? page : 1;

    const itemsPerPage = 2;
    let startIndex = page * itemsPerPage - itemsPerPage;
    let endIndex = page * itemsPerPage;

    let filterObj = {};

    mealtype && (filterObj["mealtype_id"] = mealtype);
    location && (filterObj["city_id"] = location);
    cuisine && (filterObj["cuisine_id"] = { $in: cuisine });
    lcost && hcost && (filterObj["min_price"] = { $gte: lcost, $lte: hcost });

    console.log(filterObj);

    Restaurant.find(filterObj).sort({ min_price: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: "Restaurants Fetched Succesfully",
                restaurants: filteredResponse
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.getRestaurantDetailsById = (req, res) => {
    const { resId } = req.params;

    Restaurant.findById(resId)
        .then(response => {
            res.status(200).json({
                message: "Fetched Successfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}