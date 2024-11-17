import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <ThreeDots
        visible={true}
        height="30"
        width="40"
        color="#A9A9A9"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
