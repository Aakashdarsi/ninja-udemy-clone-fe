import React from "react";
import { Toast } from "react-bootstrap";

export const Toaste = (props) => {
  return (
    <div>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.event}</strong>
        </Toast.Header>
        <Toast.Body>{props.msg}</Toast.Body>
      </Toast>
    </div>
  );
};
