import React from "react";

const ProduceIcon = props => {
  return props.food ? (
    <img
      src={require(`../images/produce-icons/${props.food}.svg`)}
      className="produce-icon"
    />
  ) : null;
};

export default ProduceIcon;
