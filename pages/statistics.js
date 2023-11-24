import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import Logo from "../assets/icons/Logo";
import styles from "../styles/statistics";
import MenuIcon from "../assets/icons/MenuIcon";
import backgroundStatistics from "../assets/images/background-statistics.jpg";
import Arrow from "../assets/icons/Arrow";
import dateIcon from "../assets/images/date.png";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MenuMobile from "../components/Menu";
import { Dropdown } from "react-native-element-dropdown";
import { useIsFocused } from "@react-navigation/native";
import useVerify from "../components/hooks/useVerify";
import axios from "axios";
import { SERVER } from "../constants/async";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TableComponent from "../components/TableComponent";
import GraphicsComponent from "../components/GraphicsComponent";
import { useTranslation } from "react-i18next";
import useGuard from "../components/hooks/useGuard";

const Statistics = () => {
  const { t, i18n } = useTranslation();
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenApparat, setIsOpenApparat] = useState(false);
  const [isOpenParamSearch, setIsOpenParamSearch] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dateGlobal, setDateGlobal] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);

  function parseDateToCustomFormat(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}:${month}:${year}`;
  }
  function parseDateToCustomFormat2(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    Platform.OS === "android" && setShow(false);
    setDate(currentDate);
  };

  const onChangeGlobal = (event, selectedDate) => {
    const currentDate = selectedDate;
    Platform.OS === "android" && setShowGlobal(false);
    setDateGlobal(currentDate);
  };

  const [selectApparat, setSelectApparat] = useState("");
  const [selectTypeSearch, setSelectTypeSearch] = useState({
    label: t("По апаратам"),
    value: "aparat",
  });
  const [selectApparatGlobal, setSelectApparatGlobal] = useState("");
  const [selectApparatGlobalAlt, setSelectApparatGlobalAlt] = useState("");
  const [selectDataType, setSelectDataType] = useState({
    label: t("Продажі"),
    value: "sell",
  });
  const [selectDays, setSelectDays] = useState({
    label: t("День"),
    value: "day",
  });
  const [selectTable, setSelectTable] = useState({
    label: t("Таблиця (сирі)"),
    value: "table",
  });

  const changeSelect = (selected) => {
    setSelectApparat(selected.value);
  };

  const [startData, setStartData] = useState({});
  const [dataProfit, setDataProfit] = useState({});
  const [dataStatTableRow, setDataStatTableRow] = useState([
    "Id",
    t("Дата"),
    t("Час"),
    t("Текст помилки"),
  ]);

  const [dataStatTable, setDataStatTable] = useState([]);
  const [dataGraphics, setDataGraphics] = useState([]);
  const [dataGraphicsLabel, setDataGraphicsLabel] = useState([]);
  const [dataGraphicsAlt, setDataGraphicsAlt] = useState([]);
  const [dataGraphicsLabelAlt, setDataGraphicsLabelAlt] = useState([]);

  const [data, setData] = useState([]);

  const [dataTypeSearch] = useState([
    { label: t("По апаратам"), value: "aparat" },
    { label: t("Порівняння (графік)"), value: "graph" },
  ]);

  const [dataType] = useState([
    { label: t("Продажі"), value: "sell" },
    { label: t("Помилки"), value: "error" },
  ]);

  const [dataDays] = useState([
    { label: t("День"), value: "day" },
    { label: t("Тиждень"), value: "week" },
    { label: t("Місяць"), value: "month" },
    { label: t("Рік"), value: "year" },
  ]);

  const [dataTable] = useState([
    { label: t("Таблиця (сирі)"), value: "table" },
    { label: t("Таблиця (агрег)"), value: "table_agre" },
    { label: t("Графік"), value: "graph" },
  ]);

  const getStartData = async (user_id) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const result = await axios.get(
        `${SERVER}/stat/start?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStartData(result.data);

      const apparatus = result.data.apparatus.map((item) => {
        if (item.name) {
          return {
            label: item.name,
            value: item.name,
            type: "serial_number",
            serial_number: item.serial_number,
          };
        } else {
          return {
            label: item.serial_number,
            value: item.serial_number,
            type: "serial_number",
            serial_number: item.serial_number,
          };
        }
      });

      const groups = result.data.groups.map((item) => {
        return {
          label: item.group_name,
          value: item.group_name,
          type: "group",
        };
      });
      apparatus.sort((a, b) => a.serial_number.localeCompare(b.serial_number));
      setData([...apparatus, ...groups]);
    } catch (err) {
      console.log(err);
    }
  };

  const checkStatProfit = async () => {
    if (!selectApparat || !date) {
      return;
    }

    const token = await AsyncStorage.getItem("token");
    try {
      const checkType = data.find((item) => item.value === selectApparat);

      const result = await axios.get(
        `${SERVER}/stat/quick?date=${parseDateToCustomFormat2(date)}&user_id=${
          userData.id
        }&${
          checkType.type === "serial_number"
            ? `serial_number=${checkType.serial_number}`
            : `group_name=${selectApparat}`
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataProfit(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const groupStat = (data, groupingType) => {
    const groupedData = {};

    data.forEach((item) => {
      let key;

      switch (groupingType) {
        case "day":
          key = `${item.date} ${item.time.slice(0, 2)}:00`;
          break;
        case "week":
          const date = new Date(item.date);
          const weekStartDate = new Date(date);
          weekStartDate.setDate(date.getDate() - date.getDay()); // Нахождение начала недели
          key = weekStartDate.toISOString().split("T")[0]; // Использование начала недели в качестве ключа
          break;
        case "month":
          key = item.date;
          break;
        case "year":
          key = item.date.slice(0, 7);
          break;
        default:
          key = `${item.date} ${item.time.slice(0, 2)}:00`;
      }

      if (!groupedData[key]) {
        groupedData[key] = [];
      }

      const existingItem = groupedData[key].find(
        (groupedItem) => groupedItem.date === item.date
      );

      if (!existingItem) {
        groupedData[key].push({
          date: item.date,
          time: `${item.time.slice(0, 2)}:00`,
          portions: item.portions,
          price: item.price,
        });
      } else {
        existingItem.portions += item.portions;
        existingItem.price += item.price;
      }
    });

    let result = Object.values(groupedData).flat();

    // Если groupingType "year", группировать данные по месяцам
    if (groupingType === "year") {
      const monthlyGroupedData = {};

      result.forEach((item) => {
        const monthKey = item.date.slice(0, 7);

        if (!monthlyGroupedData[monthKey]) {
          monthlyGroupedData[monthKey] = {
            date: monthKey,
            time: "",
            portions: 0,
            price: 0,
          };
        }

        monthlyGroupedData[monthKey].portions += item.portions;
        monthlyGroupedData[monthKey].price += item.price;
      });

      result = Object.values(monthlyGroupedData);
    }

    return result;
  };

  const groupStatGraph = (data, groupingType) => {
    const groupedData = {};

    data.forEach((item) => {
      let key;

      switch (groupingType) {
        case "day":
          key = `${item.date} ${item.time.slice(0, 2)}:00`;
          break;
        case "week":
          const date = new Date(item.date);
          const weekStartDate = new Date(date);
          weekStartDate.setDate(date.getDate() - date.getDay()); // Нахождение начала недели

          const hours = parseInt(item.time.slice(0, 2), 10);
          const interval = Math.floor(hours / 6) * 6; // Группировка по интервалам по 6 часов

          weekStartDate.setHours(interval);
          key = weekStartDate.toISOString().split("T")[0]; // Использование начала недели с интервалом в 6 часов в качестве ключа
          break;
        case "month":
          key = item.date;
          break;
        case "year":
          key = item.date.slice(0, 7);
          break;
        default:
          key = `${item.date} ${item.time.slice(0, 2)}:00`;
      }

      if (!groupedData[key]) {
        groupedData[key] = [];
      }

      const existingItem = groupedData[key].find(
        (groupedItem) => groupedItem.date === item.date
      );

      if (!existingItem) {
        groupedData[key].push({
          date: item.date,
          time: `${item.time.slice(0, 2)}:00`,
          portions: item.portions,
          price: item.price,
        });
      } else {
        existingItem.portions += item.portions;
        existingItem.price += item.price;
      }
    });

    let result = Object.values(groupedData).flat();

    // Если groupingType "year", группировать данные по месяцам
    if (groupingType === "year") {
      const monthlyGroupedData = {};

      result.forEach((item) => {
        const monthKey = item.date.slice(0, 7);

        if (!monthlyGroupedData[monthKey]) {
          monthlyGroupedData[monthKey] = {
            date: monthKey,
            time: "",
            portions: 0,
            price: 0,
          };
        }

        monthlyGroupedData[monthKey].portions += item.portions;
        monthlyGroupedData[monthKey].price += item.price;
      });

      result = Object.values(monthlyGroupedData);
    }

    return result;
  };

  function sortDateTime(array) {
    return array.sort(function (a, b) {
      // Сначала сравниваем даты
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;

      // Если даты одинаковы, сравниваем время
      if (a.time < b.time) return -1;
      if (a.time > b.time) return 1;

      return 0;
    });
  }

  const globalStat = async () => {
    const token = await AsyncStorage.getItem("token");

    const checkType = data.find((item) => item.value === selectApparatGlobal);
    const checkTypeAlt = data.find(
      (item) => item.value === selectApparatGlobalAlt
    );

    if (selectTypeSearch.value === "aparat") {
      if (selectDataType.value === "sell") {
        try {
          const result = await axios(
            `${SERVER}/stat/all?typeOfData=${selectDataType.value}&user_id=${
              userData.id
            }&date=${parseDateToCustomFormat2(dateGlobal)}&${
              checkType.type === "serial_number"
                ? `serial_number=${checkType.serial_number}`
                : `group_name=${selectApparatGlobal}`
            }&interval=${selectDays.value}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const groupData =
            selectTable.value === "table_agre"
              ? groupStat(result.data, selectDays.value)
              : result.data;

          const totalPrice = result.data.reduce(
            (acc, current) => acc + current.price,
            0
          );
          const totalPortions = result.data.reduce(
            (acc, current) => acc + current.portions,
            0
          );

          if (
            selectDays.value !== "day" &&
            selectTable.value === "table_agre"
          ) {
            setDataStatTableRow([
              "ID",
              t("Дата"),
              t(`Кількість`, { totalPortions }),
              t(`Ціна порцій`, { totalPrice }),
            ]);
          } else {
            setDataStatTableRow([
              "ID",
              t("Дата"),
              t("Час"),
              t(`Кількість`, { totalPortions }),
              t(`Ціна порцій`, { totalPrice }),
            ]);
          }

          sortDateTime(groupData);

          const newTableData = groupData.map((item, index) => {
            if (
              selectDays.value !== "day" &&
              selectTable.value === "table_agre"
            ) {
              return [
                index + 1,
                parseDateToCustomFormat2(item.date),
                item.portions,
                item.price,
              ];
            } else {
              return [
                index + 1,
                parseDateToCustomFormat2(item.date),
                item.time.slice(0, 5),
                item.portions,
                item.price,
              ];
            }
          });

          const newGraphicsData = groupStatGraph(
            result.data,
            selectDays.value
          ).map((item) => {
            return item.portions;
          });

          const newGraphicsLabel = (() => {
            if (selectDays.value === "day") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.time;
                }
              );
            }
            if (selectDays.value === "week") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return `${item.date.slice(8, 10)}\n${item.time}`;
                }
              );
            }
            if (selectDays.value === "month") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.date.slice(8, 10);
                }
              );
            }
            if (selectDays.value === "year") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.date;
                }
              );
            }
          })();

          setDataGraphics(newGraphicsData);

          setDataGraphicsLabel(newGraphicsLabel);

          setDataStatTable(newTableData);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const result = await axios(
            `${SERVER}/stat/all?typeOfData=${selectDataType.value}&user_id=${
              userData.id
            }&date=${parseDateToCustomFormat2(dateGlobal)}&${
              checkType.type === "serial_number"
                ? `serial_number=${checkType.serial_number}`
                : `group_name=${selectApparatGlobal}`
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setDataStatTableRow(["ID", "Дата", "Час", `Текст помилки`]);

          sortDateTime(result.data);

          const newTableData = result.data.map((item, index) => {
            return [
              index + 1,
              parseDateToCustomFormat2(item.date),
              item.time.slice(0, 5),
              item.text_error,
            ];
          });

          setDataStatTable(newTableData);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      if (selectDataType.value === "sell") {
        try {
          const result = await axios(
            `${SERVER}/stat/all?typeOfData=${selectDataType.value}&user_id=${
              userData.id
            }&date=${parseDateToCustomFormat2(dateGlobal)}&${
              checkType.type === "serial_number"
                ? `serial_number=${checkType.serial_number}`
                : `group_name=${selectApparatGlobal}`
            }&interval=${selectDays.value}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const resultAlt = await axios(
            `${SERVER}/stat/all?typeOfData=${selectDataType.value}&user_id=${
              userData.id
            }&date=${parseDateToCustomFormat2(dateGlobal)}&${
              checkTypeAlt.type === "serial_number"
                ? `serial_number=${checkTypeAlt.serial_number}`
                : `group_name=${selectApparatGlobalAlt}`
            }&interval=${selectDays.value}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const groupData =
            selectTable.value === "table_agre"
              ? groupStat(result.data, selectDays.value)
              : result.data;

          const totalPrice = result.data.reduce(
            (acc, current) => acc + current.price,
            0
          );
          const totalPortions = result.data.reduce(
            (acc, current) => acc + current.portions,
            0
          );

          setDataStatTableRow([
            "ID",
            t("Дата"),
            t("Час"),
            t(`Кількість`, { totalPortions }),
            t(`Ціна порцій`, { totalPrice }),
          ]);

          sortDateTime(groupData);

          const newTableData = groupData.map((item, index) => {
            return [
              index + 1,
              parseDateToCustomFormat2(item.date),
              item.time.slice(0, 5),
              item.portions,
              item.price,
            ];
          });

          const newGraphicsData = groupStatGraph(
            result.data,
            selectDays.value
          ).map((item) => {
            return item.portions;
          });

          const newGraphicsLabel = (() => {
            if (selectDays.value === "day") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.time;
                }
              );
            }
            if (selectDays.value === "week") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return `${item.date.slice(8, 10)}\n${item.time}`;
                }
              );
            }
            if (selectDays.value === "month") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.date.slice(8, 10);
                }
              );
            }
            if (selectDays.value === "year") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.date;
                }
              );
            }
          })();

          const newGraphicsDataAlt = groupStatGraph(
            resultAlt.data,
            selectDays.value
          ).map((item) => {
            return item.portions;
          });

          const newGraphicsLabelAlt = (() => {
            if (selectDays.value === "day") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.time;
                }
              );
            }
            if (selectDays.value === "week") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return `${item.date.slice(8, 10)}\n${item.time}`;
                }
              );
            }
            if (selectDays.value === "month") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.date.slice(8, 10);
                }
              );
            }
            if (selectDays.value === "year") {
              return groupStatGraph(result.data, selectDays.value).map(
                (item) => {
                  return item.date;
                }
              );
            }
          })();

          setDataGraphics(newGraphicsData);

          setDataGraphicsLabel(newGraphicsLabel);

          setDataGraphicsAlt(newGraphicsDataAlt);

          setDataGraphicsLabel(newGraphicsLabelAlt);

          setDataStatTable(newTableData);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const result = await axios(
            `${SERVER}/stat/all?typeOfData=${selectDataType.value}&user_id=${
              userData.id
            }&date=${parseDateToCustomFormat2(dateGlobal)}&${
              checkType.type === "serial_number"
                ? `serial_number=${checkType.serial_number}`
                : `group_name=${selectApparatGlobal}`
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setDataStatTableRow(["ID", t("Дата"), t("Час"), t(`Текст помилки`)]);

          sortDateTime(result.data);

          const newTableData = result.data.map((item, index) => {
            return [
              index + 1,
              parseDateToCustomFormat2(item.date),
              item.time.slice(0, 5),
              item.text_error,
            ];
          });

          setDataStatTable(newTableData);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const startRequest = async () => {
    const { dataFetch, verify } = await useVerify();
    if (!verify) navigation.navigate("home");
    if (verify) {
      setUserData(dataFetch);
    }

    getStartData(dataFetch.id);
  };

  const checkUser = async () => {
    const guard = await useGuard("statistics");
    if (!guard) {
      navigation.navigate("status-aparat");
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkUser();
      startRequest();
    }
  }, [isFocused]);
  return (
    <>
      <View style={styles.statistics}>
        <View style={styles.header}>
          <Logo />
          <Text style={styles.headerTitle}>{t("Статистика")}</Text>
          <TouchableOpacity onPress={() => setIsOpenMenu(!isOpenMenu)}>
            <MenuIcon />
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <ImageBackground source={backgroundStatistics} style={styles.hero}>
            <View style={styles.heroBlock}>
              <View style={styles.heroProfit}>
                <Text style={styles.heroProfitTitle}>
                  {t("Загальний прибуток")}:
                </Text>
                <Text style={styles.heroProfitValue}>{startData.sell}</Text>
              </View>

              <View style={styles.heroProfit}>
                <Text style={styles.heroProfitTitle}>
                  {t("Кількість порцій")}:
                </Text>
                <Text style={styles.heroProfitValue}>{startData.portions}</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.paramProfit}>
            <Text style={styles.paramProfitTitle}>
              {t("Прибуток за параметрами")}
            </Text>

            <View style={styles.paramProfitBlock}>
              <View style={styles.paramProfitForm}>
                <View style={styles.paramProfitFormApparatus}>
                  <Text style={styles.paramProfitFormApparatusTitle}>
                    {t("Апарат")}
                  </Text>

                  <View style={styles.paramProfitFormApparatusSelect}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsOpenApparat(true);
                      }}
                      style={styles.paramProfitFormApparatusSelectCurrent}
                    >
                      <Text
                        style={styles.paramProfitFormApparatusSelectCurrentText}
                      >
                        {selectApparat === "" ? "" : selectApparat}
                      </Text>
                      <Arrow width={9} height={8} />
                    </TouchableOpacity>

                    <Dropdown
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}
                      data={data}
                      labelField="label"
                      valueField="value"
                      placeholder={null}
                      onChange={changeSelect}
                      selectedTextStyle={{ display: "none" }}
                      iconStyle={{ display: "none" }}
                    />
                  </View>
                </View>

                <View style={styles.paramProfitFormDate}>
                  <Text style={styles.paramProfitFormDateTitle}>
                    {t("Дата")}
                  </Text>

                  <TouchableOpacity
                    style={styles.paramProfitFormDateSelect}
                    onPress={() => setShow(true)}
                  >
                    <View style={styles.paramProfitFormDateSelectCurrent}>
                      <Text style={styles.paramProfitFormDateSelectCurrentText}>
                        {parseDateToCustomFormat(date)}
                      </Text>
                      <Image
                        source={dateIcon}
                        style={{ width: 19, height: 19 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.paramProfitStat}>
                <View
                  style={{ ...styles.paramProfitStatData, marginBottom: 22 }}
                >
                  <Text style={styles.paramProfitStatText}>
                    {t("Прибуток")}:
                  </Text>
                  <Text style={styles.paramProfitStatValue}>
                    {JSON.stringify(dataProfit) === JSON.stringify({})
                      ? "0"
                      : dataProfit.sell}
                  </Text>
                </View>
                <View style={styles.paramProfitStatData}>
                  <Text style={styles.paramProfitStatText}>
                    {t("Кількість порцій")}:
                  </Text>
                  <Text style={styles.paramProfitStatValue}>
                    {JSON.stringify(dataProfit) === JSON.stringify({})
                      ? "0"
                      : dataProfit.portions}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.paramProfitSubmitBlock}>
              <TouchableOpacity
                style={styles.paramProfitSubmit}
                onPress={checkStatProfit}
              >
                <Text style={styles.paramProfitSubmitText}>
                  {t("Примінити пошук")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.paramSearch}>
            <Text style={styles.paramSearchTitle}>
              {t("Оберіть параметри пошуку")}
            </Text>

            <View style={styles.paramSearchBlock}>
              <View style={styles.paramSearchType}>
                <Text style={styles.paramSearchSecond}>{t("Вид пошуку")}</Text>

                <View style={styles.paramSearchSelect}>
                  <TouchableOpacity
                    style={styles.paramSearchSelectCurrent()}
                    onPress={() => setIsOpenParamSearch(true)}
                  >
                    <Text style={styles.paramSearchSelectCurrentText()}>
                      {selectTypeSearch.label}
                    </Text>
                    <Arrow />
                  </TouchableOpacity>

                  <Dropdown
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                    }}
                    data={dataTypeSearch}
                    labelField="label"
                    valueField="value"
                    placeholder={null}
                    onChange={(selected) => setSelectTypeSearch(selected)}
                    selectedTextStyle={{ display: "none" }}
                    iconStyle={{ display: "none" }}
                  />
                </View>
              </View>

              <View style={styles.paramSearchFlex}>
                <View
                  style={{
                    ...styles.paramSearchApparat,
                    flex: selectTypeSearch.value === "graph" ? 1 : 2,
                  }}
                >
                  <Text style={styles.paramSearchSecond}>{t("Апарат")}</Text>

                  <View style={styles.paramSearchSelect}>
                    <TouchableOpacity
                      style={styles.paramSearchSelectCurrent(5)}
                      onPress={() => setIsOpenParamSearch(true)}
                    >
                      <Text style={styles.paramSearchSelectCurrentText(12)}>
                        {selectApparatGlobal === "" ? "" : selectApparatGlobal}
                      </Text>
                      <Arrow width={9} height={7} />
                    </TouchableOpacity>

                    <Dropdown
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}
                      data={data}
                      labelField="label"
                      valueField="value"
                      placeholder={null}
                      onChange={(selected) =>
                        setSelectApparatGlobal(selected.value)
                      }
                      selectedTextStyle={{ display: "none" }}
                      iconStyle={{ display: "none" }}
                    />
                  </View>
                </View>

                {/* SELECT ALT APARAT */}

                {selectTypeSearch.value === "graph" && (
                  <View
                    style={{
                      ...styles.paramSearchApparat,
                      marginRight: 0,
                      flex: 1,
                    }}
                  >
                    <Text style={styles.paramSearchSecond}>
                      {t("Другий апарат")}
                    </Text>

                    <View style={styles.paramSearchSelect}>
                      <TouchableOpacity
                        style={styles.paramSearchSelectCurrent(5)}
                        onPress={() => setIsOpenParamSearch(true)}
                      >
                        <Text style={styles.paramSearchSelectCurrentText(12)}>
                          {selectApparatGlobalAlt === ""
                            ? ""
                            : selectApparatGlobalAlt}
                        </Text>
                        <Arrow width={9} height={7} />
                      </TouchableOpacity>

                      <Dropdown
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                        }}
                        data={data}
                        labelField="label"
                        valueField="value"
                        placeholder={null}
                        onChange={(selected) =>
                          setSelectApparatGlobalAlt(selected.value)
                        }
                        selectedTextStyle={{ display: "none" }}
                        iconStyle={{ display: "none" }}
                      />
                    </View>
                  </View>
                )}
                {selectTypeSearch.value === "aparat" && (
                  <View style={styles.paramSearchDate}>
                    <Text style={styles.paramSearchSecond}>{t("Дата")}</Text>

                    <TouchableOpacity
                      style={styles.paramProfitFormDateSelect}
                      onPress={() => setShowGlobal(true)}
                    >
                      <View style={styles.paramProfitFormDateSelectCurrent}>
                        <Text
                          style={styles.paramProfitFormDateSelectCurrentText}
                        >
                          {parseDateToCustomFormat(dateGlobal)}
                        </Text>
                        <Image
                          source={dateIcon}
                          style={{ width: 19, height: 19 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {selectTypeSearch.value === "aparat" && (
                  <View style={styles.paramSearchData}>
                    <Text style={styles.paramSearchSecond}>{t("Дані")}</Text>

                    <View style={styles.paramSearchSelect}>
                      <TouchableOpacity
                        style={styles.paramSearchSelectCurrent(5)}
                        onPress={() => setIsOpenParamSearch(true)}
                      >
                        <Text style={styles.paramSearchSelectCurrentText(12)}>
                          {selectDataType.label}
                        </Text>
                        <Arrow width={9} height={7} />
                      </TouchableOpacity>

                      <Dropdown
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                        }}
                        data={dataType}
                        labelField="label"
                        valueField="value"
                        placeholder={null}
                        onChange={(selected) => setSelectDataType(selected)}
                        selectedTextStyle={{ display: "none" }}
                        iconStyle={{ display: "none" }}
                      />
                    </View>
                  </View>
                )}
              </View>

              {/* SELECT ALT DATE */}
              {selectTypeSearch.value === "graph" && (
                <View
                  style={{
                    ...styles.paramSearchDate,
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.paramSearchSecond}>{t("Дата")}</Text>

                  <TouchableOpacity
                    style={styles.paramProfitFormDateSelect}
                    onPress={() => setShowGlobal(true)}
                  >
                    <View
                      style={{
                        ...styles.paramProfitFormDateSelectCurrent,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.paramProfitFormDateSelectCurrentText}>
                        {parseDateToCustomFormat(dateGlobal)}
                      </Text>
                      <Image
                        source={dateIcon}
                        style={{ width: 19, height: 19, marginLeft: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.paramSearchFlex}>
                {selectTypeSearch.value === "graph" && (
                  <View style={{ ...styles.paramSearchData, flex: 2 }}>
                    <Text style={styles.paramSearchSecond}>{t("Дані")}</Text>

                    <View style={styles.paramSearchSelect}>
                      <TouchableOpacity
                        style={styles.paramSearchSelectCurrent(5)}
                        onPress={() => setIsOpenParamSearch(true)}
                      >
                        <Text style={styles.paramSearchSelectCurrentText(12)}>
                          {selectDataType.label}
                        </Text>
                        <Arrow width={9} height={7} />
                      </TouchableOpacity>

                      <Dropdown
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                        }}
                        data={dataType}
                        labelField="label"
                        valueField="value"
                        placeholder={null}
                        onChange={(selected) => setSelectDataType(selected)}
                        selectedTextStyle={{ display: "none" }}
                        iconStyle={{ display: "none" }}
                      />
                    </View>
                  </View>
                )}
                <View
                  style={{
                    ...styles.paramSearchDay,
                    marginRight: selectTypeSearch.value === "graph" ? 0 : 13,
                  }}
                >
                  <Text style={styles.paramSearchSecond}>
                    {t("Згрупувати за")}
                  </Text>

                  <View style={styles.paramSearchSelect}>
                    <TouchableOpacity
                      style={styles.paramSearchSelectCurrent(5)}
                      onPress={() => setIsOpenParamSearch(true)}
                    >
                      <Text style={styles.paramSearchSelectCurrentText(12)}>
                        {selectDays.label}
                      </Text>
                      <Arrow width={9} height={7} />
                    </TouchableOpacity>

                    <Dropdown
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}
                      data={dataDays}
                      labelField="label"
                      valueField="value"
                      placeholder={null}
                      onChange={(selected) => setSelectDays(selected)}
                      selectedTextStyle={{ display: "none" }}
                      iconStyle={{ display: "none" }}
                    />
                  </View>
                </View>
                {selectTypeSearch.value === "aparat" && (
                  <View style={styles.paramSearchFormat}>
                    <Text style={styles.paramSearchSecond}>{t("Формат")}</Text>

                    <View style={styles.paramSearchSelect}>
                      <TouchableOpacity
                        style={styles.paramSearchSelectCurrent(5)}
                        onPress={() => setIsOpenParamSearch(true)}
                      >
                        <Text style={styles.paramSearchSelectCurrentText(12)}>
                          {selectTable.label}
                        </Text>
                        <Arrow width={9} height={7} />
                      </TouchableOpacity>

                      <Dropdown
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                        }}
                        data={dataTable}
                        labelField="label"
                        valueField="value"
                        placeholder={null}
                        onChange={(selected) => setSelectTable(selected)}
                        selectedTextStyle={{ display: "none" }}
                        iconStyle={{ display: "none" }}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.paramSearchSubmit}>
                <TouchableOpacity
                  style={styles.paramSearchSubmitButton}
                  onPress={globalStat}
                >
                  <Text style={styles.paramSearchSubmitText}>
                    {t("Примінити пошук")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.resultSearch}>
            <Text style={styles.resultSearchTitle}>
              {t("Результати пошуку")}
            </Text>

            {selectTypeSearch.value === "aparat" ? (
              <>
                {dataStatTable.length === 0 && dataGraphics.length === 0 ? (
                  <Text style={styles.resultSearchError}>
                    {t("Даних не має")}
                  </Text>
                ) : (
                  <>
                    {selectTable.value === "graph" ? (
                      <GraphicsComponent
                        label={dataGraphicsLabel}
                        data={dataGraphics}
                      />
                    ) : (
                      <TableComponent
                        arrayHead={dataStatTableRow}
                        arrayBody={dataStatTable}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <GraphicsComponent
                label={dataGraphicsLabel}
                data={dataGraphics}
                dataAlt={dataGraphicsAlt}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
        {show ? (
          <>
            <SafeAreaView
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: Platform.OS === "ios" && "white",
                  borderRadius: 20,
                }}
              >
                <DateTimePicker
                  display="spinner"
                  mode="date"
                  value={date}
                  onChange={onChange}
                  shouldRasterizeIOS={true}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    display: Platform.OS === "ios" ? "flex" : "none",
                    marginTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{ marginRight: 30, paddingVertical: 10 }}
                    onPress={() => {
                      setShow(false);
                    }}
                  >
                    <Text style={styles.paramSearchSelectCurrentText(20)}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShow(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={styles.paramSearchSelectCurrentText(20)}>
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </>
        ) : (
          <></>
        )}
        {showGlobal ? (
          <>
            <SafeAreaView
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: Platform.OS === "ios" && "white",
                  borderRadius: 20,
                }}
              >
                <DateTimePicker
                  display="spinner"
                  mode="date"
                  value={dateGlobal}
                  onChange={onChangeGlobal}
                  shouldRasterizeIOS={true}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    display: Platform.OS === "ios" ? "flex" : "none",
                    marginTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{ marginRight: 30, paddingVertical: 10 }}
                    onPress={() => {
                      setShowGlobal(false);
                    }}
                  >
                    <Text style={styles.paramSearchSelectCurrentText(20)}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowGlobal(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={styles.paramSearchSelectCurrentText(20)}>
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </>
        ) : (
          <></>
        )}
      </View>

      <MenuMobile
        open={isOpenMenu}
        current="statistics"
        closeFun={setIsOpenMenu}
      />
    </>
  );
};

export default Statistics;
