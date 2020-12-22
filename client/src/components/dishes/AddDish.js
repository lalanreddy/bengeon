import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDish } from "../../actions/dishes";

const AddDish = ({ addDish, history }) => {
  const [formData, setformData] = useState({
    name: "",
    price: "",
    label: "",
    category: "",
    description: "",
    file: "",
    filename: "choose a file",
  });

  const [uploadedFile, setUploadedFile] = useState({
    fileName: "",
    filePath: "",
  });

  const {
    name,
    price,
    label,
    category,
    description,
    file,
    filename,
  } = formData;

  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onFileChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
      filename: e.target.files[0].name,
      file: e.target.files[0],
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formValues = new FormData();
    formValues.append("name", name);
    formValues.append("label", label);
    formValues.append("price", price);
    formValues.append("category", category);
    formValues.append("description", description);
    formValues.append("file", file);
    formValues.append("filename", filename);
    addDish(formValues, history);
  };

  return (
    <Fragment>
      <form className="col-lg-6 offset-lg-3" onSubmit={onSubmit}>
        <h2 className="text-center">Add Dish</h2>
        <div className="form-label">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter dish name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Price ($):</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter price in Dollors"
            value={price}
            onChange={onChange}
            name="price"
          />
        </div>
        <div className="form-group">
          <select name="label" value={label} onChange={(e) => onChange(e)}>
            <option>Label</option>
            <option value="hot">HOT</option>
            <option value="cool">COOL</option>
            <option value="spicy">SPICY</option>
            <option value="sweet">SWEET</option>
          </select>
        </div>
        <div className="form-group">
          <select
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
          >
            <option>Category</option>
            <option value="snacks">SNACKS</option>
            <option value="lunch">LUNCH</option>
            <option value="dinner">DINNER</option>
            <option value="break fast">BREAK FAST</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            onChange={onChange}
            className="form-control"
            placeholder="Write something about dish"
            value={description}
          ></textarea>
        </div>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onFileChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary btn-block"
          ></input>
        </div>
      </form>
    </Fragment>
  );
};

AddDish.propTypes = {
  addDish: PropTypes.func.isRequired,
};

export default connect(null, { addDish })(AddDish);
