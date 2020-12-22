import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DishItem = ({ dish }) => {
  return (
    <div className="col-lg-4 col-md-4 col-xs-4 thumb" key={dish._id}>
      <div className="col" style={styling}>
        <div className="col-sm-8 " style={styling}>
          <Link to={`/dish/${dish._id}`}>
            {dish.image != undefined && dish.image.length > 0 ? (
              <img
                src={dish.image}
                className="card-img-top w-100"
                alt="..."
                height="300"
              />
            ) : (
              <img
                src="https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg"
                className="card-img-top"
                alt="..."
                height="300"
              />
            )}
          </Link>
          <div className="card-body">
            <h5 className="card-title">{dish.name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

DishItem.propTypes = {
  dish: PropTypes.object.isRequired,
};
const styling = { margin: 0 };
export default DishItem;
