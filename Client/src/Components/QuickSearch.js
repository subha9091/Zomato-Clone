import React from "react";
import "../Style/Home.css";
import QuickSearchItem from "./QuickSearchItems";

class QuickSearch extends React.Component {
  render() {
    const { mealtypesData } = this.props;

    return (
      <div>
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="quick-search-heading">Quick Search</h1>
                <p className="quick-search-subheading">
                  Discover resturant by type of meals
                </p>
              </div>
            </div>

            <div className="item">
              {mealtypesData?.map((items) => {
                return (
                  <QuickSearchItem data={items} />
                )
              })}

            </div>

          </div>
        </div>
      </div>
    );
  }
};
export default QuickSearch;
