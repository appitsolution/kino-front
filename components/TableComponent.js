import { ScrollView, View, Text } from "react-native";
import styles from "../styles/statistics";

const TableComponent = ({ arrayHead = [], arrayBody = [], style = {} }) => {
  const filterBody = () => {
    const totalItems = 1000;
    const numberOfGroups = 5;
    const itemsPerGroup = totalItems / numberOfGroups;

    const groups = [];
    let currentItem = 1;

    Array(numberOfGroups)
      .fill()
      .forEach((_, i) => {
        const group = [];
        for (let j = currentItem; j <= currentItem + itemsPerGroup - 1; j++) {
          group.push(j);
        }
        groups.push(group);
        currentItem += itemsPerGroup;
      });

    console.log(groups);
  };

  return (
    <View style={{ ...styles.resultSearchBlock, ...style }}>
      <ScrollView
        contentContainerStyle={{}}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.resultSearchTable}>
          <View style={styles.resultSearchWrapper}>
            {arrayHead.map((item, indexFirst) => (
              <View style={{ flexDirection: "column" }} key={indexFirst}>
                <>
                  <View style={styles.resultSearchHead}>
                    <Text
                      style={styles.resultSearchHeadText(
                        arrayHead.length === indexFirst - 1
                      )}
                    >
                      {item}
                    </Text>
                  </View>
                  {arrayBody.map((list, index) => (
                    <Text
                      style={styles.resultSearchRowText(
                        arrayBody.length === index - 1
                      )}
                      key={index}
                    >
                      {list[indexFirst]}
                    </Text>
                  ))}
                </>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TableComponent;
