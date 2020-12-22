import React, { Fragment } from "react";
const About = () => {
  return (
    <Fragment>
      <div className="container">
        <h1>About This App</h1>
        <p>
          Restaurant app where users can check the menu and Add a dishes and
          comment over a dish and many more
        </p>
        <p className="text-dark">
          licensed by author <strong>Lalan Reddy</strong>
        </p>
        <p className="text-primary">Version:1.0.0</p>
      </div>
    </Fragment>
  );
};
export default About;
