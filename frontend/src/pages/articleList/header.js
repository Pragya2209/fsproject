import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div class="header-div">
      <div class="user-header-left">
        <img
          class="user-header-img"
          src="https://ecdn.teacherspayteachers.com/thumbitem/Accountable-Talk-Anchor-Chart-Classroom-Discussions-1500873512/original-1470861-1.jpg"
        />
       <Link to="info" style={{ textDecoration: 'none' }}><span class="user-header-text">Hi User</span></Link>
      </div>
      <span class="user-header-right">Welcome</span>
    </div>
  );
}

export default Header;
