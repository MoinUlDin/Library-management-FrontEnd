import React from "react";
import logo from "../../assets/logo.jpeg";
// md:max-w-[138px] w-[90px] md:w-[120px]
function Logo({ css = " size-12", padding = "p-3" }) {
  return (
    <div className={`${padding} rounded-full bg-white`}>
      <img className={`${css}`} src={logo} alt="logo" />
    </div>
  );
}

export default Logo;
