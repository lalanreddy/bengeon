import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContact } from "../../actions/contacts";

const Contact = ({ addContact, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const { name, email, contact } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <form
        className="col-lg-6 offset-lg-3"
        onSubmit={(e) => {
          e.preventDefault();
          addContact(formData, history);
        }}
      >
        <h2 className="text-center">Contact us</h2>
        <div className="form-label">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your Email"
            value={email}
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <label>Why do want to contact us?</label>
          <textarea
            name="contact"
            onChange={onChange}
            value={contact}
            className="form-control"
          ></textarea>
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
Contact.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default connect(null, { addContact })(Contact);
