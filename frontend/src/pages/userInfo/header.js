import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div class="user-header">
      <Link to="/"><i class="fa fa-arrow-left back-arrow" aria-hidden="true"></i></Link>
        <span class="user-profile-text">User Profile</span>
    </div>
  );
}

export default Header;
