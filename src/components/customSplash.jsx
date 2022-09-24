import React from "react";
import { f7, f7ready } from "framework7-react";
const CustomSplash = () => {
  f7ready(() => {
    setTimeout(() => {
      const splash = document.querySelector(".custom-splash");
      splash.remove();
    }, 4000);
  });

  return (
    <div className="custom-splash">
      <div className="content">
        <img src="../splash-icon.png" />
        <h3>{f7.name}</h3>
      </div>
    </div>
  );
};

export default CustomSplash;
