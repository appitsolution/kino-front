import Svg, { G, Path, Rect, Circle, Line } from "react-native-svg";

const PopcornGood = () => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G id="Group 144">
        <Rect
          id="Rectangle 278"
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="2.5"
          fill="#2BAB0B"
          stroke="black"
        />
        <G id="Group 143">
          <Line
            id="Line 4"
            x1="3.41603"
            y1="6.72265"
            x2="7.41603"
            y2="12.7227"
            stroke="black"
          />
          <Line
            id="Line 5"
            x1="13.416"
            y1="3.27735"
            x2="7.41603"
            y2="12.2774"
            stroke="black"
          />
        </G>
      </G>
    </Svg>
  );
};

export default PopcornGood;
