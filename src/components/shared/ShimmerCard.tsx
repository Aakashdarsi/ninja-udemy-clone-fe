import React from "react";
import type { ShimmerCardProps } from "../../interfaces/index";
export const ShimmerCard = ({ btnReq }: ShimmerCardProps) => {
  return (
    <div>
      <>
        <div className="card w-25" aria-hidden="true">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
            {btnReq && (
              <a
                className="btn btn-primary disabled placeholder col-6"
                aria-disabled="true"
              ></a>
            )}
          </div>
        </div>
      </>
    </div>
  );
};
