import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import styles from "../styles/status-aparat";
import Logo from "../assets/icons/Logo";
import MenuIcon from "../assets/icons/MenuIcon";
import location from "../assets/images/location.png";
import Notification from "../assets/icons/Notification";
import aparat from "../assets/images/aparat.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import MenuMobile from "../components/Menu";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useVerify from "../components/hooks/useVerify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER } from "../constants/async";
import { useTranslation } from "react-i18next";
import Search from "../assets/icons/Search";
import useGuard from "../components/hooks/useGuard";

function parseDateToCustomFormatPlus(inputDate) {
  const date = new Date(inputDate);

  date.setDate(date.getDate() + 7);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${year}-${month}-${day}`;
}

function daysUntil(targetDate) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  if (targetDateTime <= currentDate) {
    return 0;
  }

  const timeDifference = targetDateTime - currentDate;

  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysRemaining;
}

const StatusAparat = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterList, setFilterList] = useState([]);

  const [devices, setDevices] = useState([]);

  const checkLvl = (lvl = 30) => {
    if (lvl <= 15) {
      return t("критичний");
    } else if (lvl <= 30 && lvl >= 15) {
      return t("низький");
    } else {
      return t("нормальний");
    }
  };

  const getStart = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");

      const result = await axios(
        `${SERVER}/status-devices/quick?lang=ua&user_id=${dataFetch.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checkErrors = await Promise.all(
        result.data.result.map(async (item) => {
          try {
            const { dataFetch } = await useVerify();
            const checkError = await axios(
              `${SERVER}/error/check-last?serial_number=${item.serial_number}&user_id=${dataFetch.id}`
            );

            if (checkError.data.code === 200) {
              return {
                ...item,
                error: checkError.data.findErrors.length === 0 ? false : true,
              };
            } else {
              return {
                ...item,
                error: false,
              };
            }
          } catch (err) {
            return {
              ...item,
              error: false,
            };
          }
        })
      );

      const checkAllErrors = await Promise.all(
        checkErrors.map(async (item) => {
          if (item.error) return item;
          const currentError = await checkNotificationErrors(item);

          if (currentError) {
            return {
              ...item,
              error: true,
            };
          }
          return item;
        })
      );

      const sortDevices = checkAllErrors.map((item) => {
        if (!item.name) {
          return {
            ...item,
            name: item.serial_number,
          };
        } else {
          return item;
        }
      });

      sortDevices.sort((a, b) =>
        a.serial_number.localeCompare(b.serial_number)
      );
      setDevices(sortDevices);
    } catch (err) {
      console.log(err);
    }
  };

  const filterDevices = () => {
    const devicesList = devices.filter((item) => {
      if (
        (item.name &&
          item.name.toLowerCase().includes(searchValue.toLowerCase())) ||
        (item.location &&
          item.location.toLowerCase().includes(searchValue.toLowerCase()))
      ) {
        return item;
      }
    });

    setFilterList(devicesList);
  };

  const checkNotificationErrors = async (item) => {
    try {
      if (item.error) return true;

      let errorNow = false;
      const token = await AsyncStorage.getItem("token");
      const lang = await AsyncStorage.getItem("lang");

      const result = await axios(
        `${SERVER}/status-devices/device?lang=${lang}&serial_number=${item.serial_number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.lastClear.length === 0) {
        errorNow = true;
      } else {
        if (
          !(
            Number(
              daysUntil(
                parseDateToCustomFormatPlus(result.data.lastClear[0].date)
              )
            ) / 7
          ) * 100
        ) {
          errorNow = true;
        }
      }

      if (
        checkLvl(
          JSON.stringify(result.data) !== "{}" ? result.data.actualLevel : 0
        ) === t("критичний")
      ) {
        errorNow = true;
      }

      return errorNow;
    } catch (err) {
      console.log(err);
      return true;
    }
  };

  useEffect(() => {
    filterDevices();
  }, [searchValue]);

  useEffect(() => {
    let getStartUpdate = null;

    if (isFocused) {
      getStartUpdate = setInterval(() => {
        getStart();
      }, 15000);
    }

    return () => {
      clearInterval(getStartUpdate);
    };
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getStart();
    }
  }, [isFocused]);
  return (
    <>
      <View style={styles.statusAparat}>
        <View style={styles.header}>
          <Logo />
          <Text style={styles.headerTitle}>{t("Апарати")}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsOpenMenu(!isOpenMenu);
            }}
          >
            <MenuIcon />
          </TouchableOpacity>
        </View>

        {devices.length > 10 && (
          <View style={styles.statusAparatSearch}>
            <View style={styles.statusAparatInput}>
              <TextInput
                placeholder="Введіть назву або розташування апарата"
                value={searchValue}
                onChangeText={(value) => setSearchValue(value)}
                style={styles.statusAparatInputChange}
              />

              <View style={styles.statusAparatInputIcon}>
                <Search />
              </View>
            </View>
          </View>
        )}

        <View style={styles.statusAparatList}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ paddingBottom: 130 }}
          >
            {searchValue ? (
              <>
                {filterList.map((item, index) => (
                  <TouchableOpacity
                    style={styles.statusAparatItem(
                      devices.length === index - 1
                    )}
                    key={index}
                    onPress={() => {
                      navigation.navigate("status-aparat-current", {
                        serial_number: item.serial_number,
                      });
                    }}
                  >
                    <Image source={aparat} />
                    <View style={styles.statusAparatItemBlock}>
                      <Text style={styles.statusAparatItemText}>
                        {!item.name ? item.serial_number : item.name}
                      </Text>

                      <View style={styles.statusAparatItemLocation}>
                        <Image source={location} />
                        <Text style={styles.statusAparatItemLocationText}>
                          {!item.location ? t("Немає даних") : item.location}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.statusAparatItemDecor(item.error)}>
                      <Notification />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                {devices.map((item, index) => (
                  <TouchableOpacity
                    style={styles.statusAparatItem(
                      devices.length === index - 1
                    )}
                    key={index}
                    onPress={() => {
                      navigation.navigate("status-aparat-current", {
                        serial_number: item.serial_number,
                      });
                    }}
                  >
                    <Image source={aparat} />
                    <View style={styles.statusAparatItemBlock}>
                      <Text style={styles.statusAparatItemText}>
                        {!item.name ? item.serial_number : item.name}
                      </Text>

                      <View style={styles.statusAparatItemLocation}>
                        <Image source={location} />
                        <Text style={styles.statusAparatItemLocationText}>
                          {!item.location ? t("Немає даних") : item.location}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.statusAparatItemDecor(item.error)}>
                      <Notification />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </KeyboardAwareScrollView>
        </View>
      </View>

      <MenuMobile
        open={isOpenMenu}
        current="status-aparat"
        closeFun={setIsOpenMenu}
      />
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default StatusAparat;
