import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <section className="navBar">
      <div className="companyTitle">
        <Link to="/" className="link">
          <h2>FOODZZ</h2>
        </Link>
      </div>
      <div className="searchBar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="userAuth">Login/SignUp</div>
    </section>
  );
};

export default NavBar;
