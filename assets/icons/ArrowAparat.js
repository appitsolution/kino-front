import Svg, { G, Path, Rect, Circle, Line } from "react-native-svg";

const ArrowAparat = ({ width = 18 }) => {
  return (
    <Svg
      width={width}
      height="30"
      viewBox="0 0 18 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G id="&#240;&#159;&#166;&#134; icon &#34;nav arrow right&#34;">
        <Path
          id="Vector"
          d="M3.08203 3L15.082 15L3.08203 27"
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default ArrowAparat;
