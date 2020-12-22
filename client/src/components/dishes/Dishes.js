import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDishes } from "../../actions/dishes";
import DishItem from "./DishItem";
import { Link } from "react-router-dom";
const Dishes = ({ getDishes, dish: { dishes } }) => {
  useEffect(() => {
    getDishes();
  }, [getDishes]);
  return (
    <Fragment>
      <Link to="/adddish" className="btn btn-primary btn-block mb-5">
        <i className="fas fa-user-circle text-dark" /> Add Dish
      </Link>

      <div className="row">
        {dishes.map((dish) => dish !== null && <DishItem dish={dish} />)}
      </div>
    </Fragment>
  );
};

Dishes.propTypes = {
  getDishes: PropTypes.func.isRequired,
  dish: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dish: state.dishes,
});

export default connect(mapStateToProps, { getDishes })(Dishes);
