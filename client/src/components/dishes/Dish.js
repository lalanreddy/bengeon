import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDishById, addComment } from "../../actions/dishes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const Dish = ({ getDishById, addComment, dish, match }) => {
  useEffect(() => {
    getDishById(match.params.id);
  }, [getDishById, match.params.id]);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });
  const [buttonName, setButtonName] = useState("place order");
  const [buttonColor, setButtonColor] = useState("blue");

  const { name, comment } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(match.params.id, formData);
    setFormData({ ...formData, name: "", comment: "" });
  };
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <Link to={`/dish/${dish.id}`}>
            {dish.image != undefined && dish.image.length > 0 ? (
              <img
                src={dish.image}
                className="card-img-top"
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

          <div className="card-header">
            <p className="lead">
              {dish.name}
              <span>
                <br />
                <br />$<strong>{dish.price}</strong>
              </span>
            </p>
          </div>
          <div className="card-body">
            <p className="lead">{dish.description}</p>
          </div>

          <button
            className="btn btn-primary btn-block"
            style={{ backgroundColor: buttonColor }}
            onClick={() => {
              setButtonName("Order Placed");
              setButtonColor("	#008000");
            }}
          >
            {buttonName}
          </button>
        </div>
      </div>
      <div className="col-md-8">
        <h2>Add a comment</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-3">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Comment: </label>
            <textarea
              className="form-control"
              name="comment"
              value={comment}
              onChange={(e) => onChange(e)}
              rows="3"
              required
            ></textarea>
          </div>
          <button className="btn btn-primary btn-block" type="submit">
            Submit
          </button>
        </form>
        <div className="mt-3">
          <h4>Comments</h4>
          <Fragment>
            {dish.comments.length > 0 &&
              dish.comments.map((coment) => (
                <div>
                  <p>Author : {coment.name}</p>
                  <p>Comment : {coment.comment}</p>
                  <p>
                    Created on :{" "}
                    <Moment format="YYYY/MM/DD hh:mm:ss">{coment.date}</Moment>
                  </p>
                  <hr />
                </div>
              ))}
          </Fragment>
        </div>
      </div>
    </div>
  );
};

Dish.propTypes = {
  getDishById: PropTypes.func.isRequired,
  dish: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dish: state.dishes.dish,
});

export default connect(mapStateToProps, { getDishById, addComment })(Dish);
