import React from 'react';
import '../Style/Filter.css';
import axios from 'axios';
import withNavigateHook from './HOC';
const queryString = require('query-string');


class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: [],
      locations: [],
      mealtype: undefined,
      location: undefined,
      cuisine: [],
      lcost: undefined,
      hcost: undefined,
      sort: 1,
      page: 1
    }
  }
  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { mealtype, location } = qs;

    const filterObj = {
      mealtype: mealtype,
      location: location
    };

    axios({
      url: 'http://localhost:8000/filter',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(res => {
        this.setState({ restaurant: res.data.restaurants, mealtype, location })
      })
      .catch(err => console.log(err))

    axios({
      url: 'http://localhost:8000/locations',
      method: 'GET',
      headers: { 'Content-Type': 'application/JSON' }
    })
      .then(res => {
        this.setState({ locations: res.data.locations })
      })
      .catch(err => console.log(err))
  }
  handleSortChange = (sort) => {
    const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

    const filterObj = {
      mealtype: mealtype,
      cuisine: cuisine.length != 0 ? cuisine : undefined,
      location: location,
      lcost,
      hcost,
      page,
      sort
    };
    axios({
      url: 'http://localhost:8000/filter',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(res => {
        this.setState({ restaurant: res.data.restaurants, sort })
      })
      .catch(err => console.log(err))
  }

  handleCostChange = (lcost, hcost) => {
    const { cuisine, mealtype, location, sort, page } = this.state;

    const filterObj = {
      mealtype: mealtype,
      cuisine: cuisine.length != 0 ? cuisine : undefined,
      location: location,
      lcost,
      hcost,
      page,
      sort
    };
    axios({
      url: 'http://localhost:8000/filter',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(res => {
        this.setState({ restaurant: res.data.restaurants, lcost, hcost })
      })
      .catch(err => console.log(err))
  }

  handlePageChange = (page) => {
    /* This function will be invoked on pagination value change from filter page,
     and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */


    const { location, cuisine, mealtype, hcost, lcost, sort } = this.state;

    // making the input object for filter API basis changed pagination
    let filterObj = {
      location: location,
      mealtype: mealtype,
      cuisine_id: cuisine.length != 0 ? cuisine : undefined,
      hcost,
      lcost,
      sort,
      page
    };


    axios({
      method: 'POST',
      url: 'http://localhost:8000filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(res => this.setState({ restaurantList: res.data.restaurant, pageCount: res.data.pageCount, page: page }))
      .catch(err => console.log(err))
  }
  handleCuisineChange = (cuisineId) => {
    /* This function will be invoked on cuisine value change from filter page,
     and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */

    const { cuisine, location, mealtype, hcost, lcost, sort, page } = this.state;

    // pushing and poping the cuisines values from array
    if (cuisine.indexof(cuisineId) == -1) {
      cuisine.push(cuisineId);
    }
    else {
      var index = cuisine.indexOf(cuisineId);
      cuisine.splice(index, 1);
    }

    // making the input object for filter API basis changed cuisine
    let filterObj = {
      mealtype: mealtype,
      location: location,
      cuisine: cuisine.length != 0 ? cuisine : undefined,
      lcost,
      hcost,
      page,
      sort
    };


    axios({
      url: 'http://localhost:8000/filter',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(res => this.setState({ restaurant: res.data.restaurants, cuisine: cuisine }))
      .catch(err => console.log(err))
  }

  handleLocationChange = (event) => {
    const location = event.target.value;
    const { mealtype, cuisine, sort, lcost, hcost, page } = this.state;

    const filterObj = {
      mealtype: mealtype,
      cuisine: cuisine,
      location: location,
      lcost,
      hcost,
      page,
      sort
    };
    axios({
      url: 'http://localhost:8000/filter',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    })
      .then(res => {
        this.setState({ restaurant: res.data.restaurants, location })
      })
      .catch(err => console.log(err))
  }
  handleNavigate = (resId) => {
    console.log(resId);
    this.props.navigation(`/details?restaurant=${resId}`)
  }

  render() {
    const { restaurant, locations, pageCount } = this.state;
    // const { navigation } = this.props;
    return (
      <div>

        {/* New start */}
        <div>
          <div id="myId" className="heading_filter">Break fast place in mumbai</div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-md-3 col-lg-2 filter-options">
                <div className="filter-heading">Filters / Sort</div>
                <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                  data-target="#filter"></span>
                <div id="filter" className="collapse show">
                  <div className="Select-Location">Select Location</div>
                  <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                    <option default>Select Location</option>
                    {
                      locations.map((item) => {
                        return (
                          <option value={item.locationId} >
                            {`${item.location}`}
                          </option>
                        )
                      })
                    }

                  </select>
                  <div className="Cuisine">Cuisine</div>
                  <div style={{ display: 'block' }}>
                    <input type="checkbox" value="1" onChange={() => this.handleCuisineChange(1)} />
                    <span className="checkbox-items">North Indian</span>
                  </div>
                  <div>
                    <input type="checkbox" onChange={() => this.handleCuisineChange(2)} />
                    <span className="checkbox-items">South Indian</span>
                  </div>
                  <div>
                    <input type="checkbox" onChange={() => this.handleCuisineChange(3)} />
                    <span className="checkbox-items">Chineese</span>
                  </div>
                  <div>
                    <input type="checkbox" onChange={() => this.handleCuisineChange(4)} />
                    <span className="checkbox-items">Fast Food</span>
                  </div>
                  <div>
                    <input type="checkbox" onChange={() => this.handleCuisineChange(5)} />
                    <span className="checkbox-items">Street Food</span>
                  </div>
                  <div className="Cuisine">Cost For Two</div>
                  <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} />
                    <span className="checkbox-items">Less than &#8377; 500</span>
                  </div>
                  <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                  </div>
                  <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                  </div>
                  <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                  </div>
                  <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 5000)} />
                    <span className="checkbox-items">&#8377; 2000 +</span>
                  </div>
                  <div className="Cuisine">Sort</div>
                  <div>
                    <input type="radio" name="sort" onChange={() => this.handleSortChange(1)} />
                    <span className="checkbox-items">Price low to high</span>
                  </div>
                  <div>
                    <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} />
                    <span className="checkbox-items">Price high to low</span>
                  </div>
                </div>
              </div>
              {/* Filter Results */}
              <div className="col-sm-7 col-md-7 col-lg-7">
                {restaurant.length != 0 ? restaurant.map((item) => {
                  return (
                    <div className="Item" onClick={() => this.handleNavigate(item._id)}>
                      <div>
                        <div className="small-item vertical">
                          <img className='img' src={`./image/${item.image}`} width="135px" height="130px" />
                        </div>
                        <div className="big-item">
                          <div className="rest-name">{item.name}</div>
                          <div className="rest-location">{item.city}</div>
                          <div className="rest-address">{item.locality}</div>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <div className="margin-left">
                          <div className="Bakery">CUISINES : {item.cuisine.map((data) => `${data.name}, `)}</div>
                          <div className="Bakery">COST FOR TWO : ₹{item.min_price} </div>
                        </div>
                      </div>
                    </div>
                  )
                }) : <div className='no-elements'> No Results found .... </div>}


                {restaurant.length != 6 ?
                  < div className="pagination">
                    <a href="#">&laquo;</a>
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">6</a>
                    <a href="#">&raquo;</a>
                  </div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withNavigateHook(Filter);