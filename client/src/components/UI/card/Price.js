import React from "react";
import { BiRupee } from "react-icons/bi";


const Price = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 75px",
      }}
    >
      <BiRupee />
      {props.value}
    </div>
  );
};

export default Price;
