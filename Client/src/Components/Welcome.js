
import React from "react";
import '../Style/Home.css';

class Welcome extends React.Component {

  handleLocationChange = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem('locationId', locationId);
  }

  render() {
    const { locationData } = this.props
  
    return (
      <div>
        <div className="wrapper">
          <div className="top-background">
            <img src="./image/Background.jpg" width="100%" className="top-bg-image" />{" "}
          </div>

        </div>

        <div className="contents-wrapper">
          <h1 className="rounded-circle"> e!</h1>
          <h1 className="heading">Find the best restaurants, cafés, and bars</h1>
          <div className="searchcontainer">
            <div className="search ">
              <form>
                <div className="row">
                  <div className="searchlocation col-lg-5 col-sm-12 col-md-6">
                    <select
                      className="form-select form-select-md mb-3 location form-control"
                      aria-label=".form-select-lg example" onChange={this.handleLocationChange}>
                      <option value="0" className="suggestion">Please type a  Location</option>
                      {locationData.map((item, index) => {
                        return (
                          <option value={item.locationId} key={index}>
                            {`${item.location}`}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  <div className="searchresturant  col-lg-7 col-sm-12 col-md-6">
                    <i className="fa fa-search"></i>
                    <div>
                      <input type="text" className="searchIn" placeholder=" Search for restaurant, foods here" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
export default Welcome;