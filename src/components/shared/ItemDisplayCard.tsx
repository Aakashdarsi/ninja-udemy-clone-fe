import React from "react";
import { ImageCard } from "./ImageCard";
import { ShimmerCard } from "./ShimmerCard";

export const ItemDisplayCard = () => {
  return (
    <div className="card">
      <ShimmerCard btnReq={false} />
      <ShimmerCard btnReq={false} />
      <ShimmerCard btnReq={false} />
      <ShimmerCard btnReq={false} />
      <ShimmerCard btnReq={false} />
    </div>
  );
};
