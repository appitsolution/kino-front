import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";

const GraphicsComponent = ({ label = [], data = [], dataAlt = [] }) => {
  if (data.length === 0) {
    return <></>;
  } else {
    if (dataAlt.length === 0) {
      return (
        <View style={{}}>
          <LineChart
            data={{
              labels: label,
              datasets: [
                {
                  data: data,
                },
              ],
            }}
            width={Dimensions.get("window").width - 26} // from react-native
            height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "white",
              //   backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={{}}>
          <LineChart
            data={{
              labels: label,
              datasets: [
                {
                  data: data,
                  color: (opacity = 1) => `#655CE5`,
                },
                {
                  data: dataAlt,
                  color: (opacity = 1) => `#59CFA4`,
                },
              ],
            }}
            width={Dimensions.get("window").width - 26} // from react-native
            height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "white",
              //   backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      );
    }
  }
};

export default GraphicsComponent;
