import Svg, { G, Path, Rect, Circle, Line } from "react-native-svg";

const PopcornError = () => {
  return (
    <Svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G id="Group 145">
        <Rect
          id="Rectangle 278"
          x="0.5"
          y="0.785645"
          width="15"
          height="15"
          rx="2.5"
          fill="#F20808"
          stroke="black"
        />
        <G id="Group 143">
          <Line
            id="Line 4"
            x1="3.36997"
            y1="2.94931"
            x2="13.37"
            y2="13.9493"
            stroke="black"
          />
          <Line
            id="Line 5"
            x1="13.37"
            y1="2.62198"
            x2="3.36997"
            y2="13.622"
            stroke="black"
          />
        </G>
      </G>
    </Svg>
  );
};

export default PopcornError;
