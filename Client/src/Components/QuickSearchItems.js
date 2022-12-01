import React from "react";
import "../Style/Home.css";
import { useNavigate } from "react-router-dom";

const QuickSearchItem = (props) => {

    const { mealtype, content, image, mealtypeId } = props.data;
    const navigate = useNavigate();
    const ShowFilter = (mealtypeId) => {
        navigate(`/filter?mealtype=${mealtypeId}`)
    }

    return (

        <div>
            <div className="itemcontainar shadow " onClick={() => ShowFilter(mealtypeId)}>
                <div className="row">
                    <div className="col-5">
                        <img src={`./image/${image}`} width="138px" height="135px" />
                    </div>
                    <div className="col-7">
                        <h6 className="dish-cat">{mealtype}</h6>
                        <p className="dish-dec">{content}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default QuickSearchItem;
