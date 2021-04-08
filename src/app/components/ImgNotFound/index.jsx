import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "_metronic/_helpers";

import './index.scss';

const ImgNotFound = (props) => {
  return (
    <div className="img-not-found">
      <SVG src={toAbsoluteUrl("/media/svg/icons/Files/Pictures1.svg")}></SVG>
    </div>
  );
};

ImgNotFound.propTypes = {};

export default ImgNotFound;
