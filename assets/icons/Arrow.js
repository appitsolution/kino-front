import Svg, { Path, Rect, ClipPath, G, Defs } from "react-native-svg";

const Arrow = ({ width = 15, height = 11 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        id="Polygon 13"
        d="M7.5 11L2.01678e-08 -3.41251e-07L15 9.53674e-07L7.5 11Z"
        fill="#82807F"
      />
    </Svg>
  );
};

export default Arrow;
