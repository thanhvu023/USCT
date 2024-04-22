import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import React from "react";
export default function MyLoader({ active, children }) {
  return (
    <LoadingOverlay active={active} spinner={<BounceLoader />}>
      {children}
    </LoadingOverlay>
  );
}
