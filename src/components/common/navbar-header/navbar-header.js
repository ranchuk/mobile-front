import React from "react";

const openNavBar = () =>{ 
    const navbar = document.querySelector('.navbar')
    navbar.classList.toggle('navbar__ToggleShow');

    document.querySelector('.nav').style.width = "100vw";
    document.querySelector('.nav').style.zIndex = "9999";
  }
const NavbarHeader = (props) => {
    return(
        <div className="dashboard__humburger" onClick={openNavBar}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    )
}
export default NavbarHeader