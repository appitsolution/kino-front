import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import styles from "../../styles/status-aparat";
import ArrowBack from "../../assets/icons/ArrowBack";
import MenuIcon from "../../assets/icons/MenuIcon";
import location from "../../assets/images/location.png";
import Notification from "../../assets/icons/Notification";
import aparat from "../../assets/images/aparat.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ArrowAparat from "../../assets/icons/ArrowAparat";
import backgroundPop from "../../assets/images/backgroundPop.jpg";
import popcorn from "../../assets/images/background-statistics.jpg";
import PopcornError from "../../assets/icons/PopcornError";
import stylesTable from "../../styles/statistics";
import { useEffect, useState } from "react";
import MenuMobile from "../../components/Menu";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useVerify from "../../components/hooks/useVerify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER } from "../../constants/async";
import TableComponent from "../../components/TableComponent";
import { useTranslation } from "react-i18next";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import stylesAdmin from "../../styles/admin";
import AcceptIcon from "../../assets/icons/AcceptIcon";
import PopcornGood from "../../assets/icons/PopcornGood";

function parseDateToCustomFormat2(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${year}-${month}-${day}`;
}

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

const StatusAparatCurrent = () => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { serial_number } = route.params;

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenClining, setIsOpenClining] = useState(false);
  const [isOpenPopcorn, setIsOpenPopcorn] = useState(false);

  useEffect(() => {
    if (isOpenError) {
      readLastError();
      setIsOpenClining(false);
      setIsOpenPopcorn(false);
    }
  }, [isOpenError]);

  useEffect(() => {
    if (isOpenClining) {
      setIsOpenError(false);
      setIsOpenPopcorn(false);
    }
  }, [isOpenClining]);

  useEffect(() => {
    if (isOpenPopcorn) {
      setIsOpenError(false);
      setIsOpenClining(false);
    }
  }, [isOpenPopcorn]);

  const [dataDevice, setDataDevice] = useState({});

  const checkLvl = (lvl = 30) => {
    if (lvl <= 15) {
      return t("критичний");
    } else if (lvl <= 30 && lvl >= 15) {
      return t("низький");
    } else {
      return t("нормальний");
    }
  };

  const updateClear = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/status-devices/cleaning?user_id=${dataFetch.id}&serial_number=${dataDevice.serial_number}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: `Чищення оновлено`,
          type: "success",
          duration: 5000,
        });
        getStart();
      }
    } catch (err) {
      console.log(err);
    }

    setAcceptModalClear(false);
  };

  const updateFill = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/status-devices/loading?user_id=${dataFetch.id}&serial_number=${dataDevice.serial_number}&level=100`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: `Заправку оновлено`,
          type: "success",
          duration: 5000,
        });
        getStart();
      }
    } catch (err) {
      console.log(err);
    }

    setAcceptModalFill(false);
  };

  const [lastErrorNotification, setLastErrorNotification] = useState(false);

  const getStart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const lang = await AsyncStorage.getItem("lang");

      const { dataFetch } = await useVerify();

      const result = await axios(
        `${SERVER}/status-devices/device?lang=${lang}&serial_number=${serial_number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checkError = await axios(
        `${SERVER}/error/check-last?serial_number=${serial_number}&user_id=${dataFetch.id}`
      );

      if (checkError.data.code === 200) {
        checkError.data.findErrors.length === 0
          ? setLastErrorNotification(false)
          : setLastErrorNotification(true);
      }

      const lastClearFilter = await Promise.all(
        result.data.lastClear.map(async (item) => {
          const user = await axios(
            `${SERVER}/admininstration/one?id=${item.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (user.data.code === 200) {
            return {
              ...item,
              user_id: user.data.user.username,
            };
          } else {
            return {
              ...item,
            };
          }
        })
      );

      const lastFillFilter = await Promise.all(
        result.data.lastFill
          .reverse()
          .reverse()
          .map(async (item) => {
            const user = await axios(
              `${SERVER}/admininstration/one?id=${item.user_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (user.data.code === 200) {
              return {
                ...item,
                user_id: user.data.user.username,
              };
            } else {
              return {
                ...item,
              };
            }
          })
      );

      setDataDevice({
        ...result.data,
        lastClear: lastClearFilter,
        lastFill: lastFillFilter,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reverseLastClear = () => {
    const result = dataDevice.lastClear.map((item) => {
      return [
        parseDateToCustomFormat2(item.date),
        item.time.slice(0, 5),
        item.user_id,
      ];
    });

    return result;
  };
  const [isOpenTableClear, setIsOpenTableClear] = useState(false);
  const [isOpenTableFill, setIsOpenTableFill] = useState(false);
  const [acceptModalClear, setAcceptModalClear] = useState(false);
  const [acceptModalFill, setAcceptModalFill] = useState(false);

  const readLastError = async () => {
    try {
      const { dataFetch } = await useVerify();
      await axios(
        `${SERVER}/error/read-last?serial_number=${serial_number}&user_id=${dataFetch.id}`
      );
      setLastErrorNotification(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getStart();
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.statusAparat}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("status-aparat");
            }}
          >
            <ArrowBack />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("Апарати")}</Text>
          <TouchableOpacity onPress={() => setIsOpenMenu(!isOpenMenu)}>
            <MenuIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.statusAparatCurrent}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ paddingBottom: 130 }}
          >
            <View style={styles.statusAparatItem()}>
              <Image source={aparat} />
              <View style={styles.statusAparatItemBlock}>
                <Text style={styles.statusAparatItemText}>
                  {JSON.stringify(dataDevice) !== "{}" ? (
                    <>
                      {!dataDevice.name
                        ? dataDevice.serial_number
                        : dataDevice.name}
                    </>
                  ) : (
                    ""
                  )}
                </Text>

                <View style={styles.statusAparatItemLocation}>
                  <Image source={location} />
                  <Text style={styles.statusAparatItemLocationText}>
                    {JSON.stringify(dataDevice) !== "{}" ? (
                      <>
                        {!dataDevice.location
                          ? t("Немає даних")
                          : dataDevice.location}
                      </>
                    ) : (
                      ""
                    )}
                  </Text>
                </View>
              </View>

              <View style={styles.statusAparatItemDecor()}>
                <Notification />
              </View>
            </View>

            <TouchableOpacity
              style={styles.statusAparatCurrentError(isOpenError)}
              onPress={() => {
                setIsOpenError(!isOpenError);
              }}
            >
              <Text style={styles.statusAparatCurrentErrorsText}>
                {t("Помилки")}
              </Text>

              <View style={styles.statusAparatCurrentErrorsBlock}>
                <View
                  style={styles.statusAparatCurrentErrorsNotification(
                    lastErrorNotification
                  )}
                >
                  <Notification />
                </View>
                <View
                  style={styles.statusAparatCurrentErrorsArrow(isOpenError)}
                >
                  <ArrowAparat />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.statusAparatCurrentErrors(isOpenError)}>
              <TableComponent
                style={{ paddingHorizontal: 0 }}
                arrayHead={[t("Дата"), t("Час"), t("Текст помилки")]}
                arrayBody={
                  JSON.stringify(dataDevice) !== "{}"
                    ? dataDevice.lastError.map((item, index) => {
                        return [
                          parseDateToCustomFormat2(item.date),
                          item.time.slice(0, 5),
                          item.text_error,
                        ];
                      })
                    : []
                }
              />
            </View>

            <TouchableOpacity
              style={styles.statusAparatCurrentClining(isOpenClining)}
              onPress={() => {
                setIsOpenClining(!isOpenClining);
              }}
            >
              <Text style={styles.statusAparatCurrentErrorsText}>
                {t("Клінінг")}
              </Text>

              <View style={styles.statusAparatCurrentErrorsBlock}>
                <View
                  style={styles.statusAparatCurrentErrorsNotification(
                    JSON.stringify(dataDevice) === "{}"
                      ? true
                      : dataDevice.lastClear.length === 0
                      ? true
                      : !(
                          (Number(
                            daysUntil(
                              parseDateToCustomFormatPlus(
                                dataDevice.lastClear[0].date
                              )
                            )
                          ) /
                            7) *
                          100
                        )
                  )}
                >
                  <Notification />
                </View>
                <View
                  style={styles.statusAparatCurrentErrorsArrow(isOpenClining)}
                >
                  <ArrowAparat />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.statusAparatCurrentCliningModal(isOpenClining)}>
              <TouchableOpacity
                style={styles.statusAparatCurrentCliningModalTitle}
                onPress={() => setIsOpenTableClear(!isOpenTableClear)}
              >
                <Text style={styles.statusAparatCurrentCliningModalTitleText}>
                  {t("Дані про останні клінінги")}
                </Text>

                <View
                  style={{
                    transform: [
                      { rotate: isOpenTableClear ? "90deg" : "0deg" },
                    ],
                  }}
                >
                  <ArrowAparat width={8} />
                </View>
              </TouchableOpacity>

              {isOpenTableClear && (
                <TableComponent
                  style={{ paddingHorizontal: 0 }}
                  arrayHead={[t("Дата"), t("Час"), t("Відповідальна особа")]}
                  arrayBody={
                    JSON.stringify(dataDevice) !== "{}"
                      ? reverseLastClear()
                      : []
                  }
                />
              )}

              <Text style={styles.statusAparatCurrentCliningModalSecond}>
                {t("Рекомендована дата наступного клінінгу")}:
              </Text>

              <Text style={styles.statusAparatCurrentCliningModalDate}>
                {JSON.stringify(dataDevice) === "{}" ? (
                  <></>
                ) : (
                  <>
                    {dataDevice.lastClear.length === 0 ? (
                      ""
                    ) : (
                      <>
                        {parseDateToCustomFormatPlus(
                          parseDateToCustomFormat2(dataDevice.lastClear[0].date)
                        )}
                      </>
                    )}
                  </>
                )}
              </Text>

              <Text style={styles.statusAparatCurrentCliningModalSecond}>
                {t("До клінінгу залишось")}:
              </Text>

              <View style={styles.statusAparatCurrentCliningModalTimerBlock}>
                {/* <View style={styles.statusAparatCurrentCliningModalTimer}>
                 
                </View> */}
                <AnimatedCircularProgress
                  size={200}
                  width={5}
                  fill={
                    JSON.stringify(dataDevice) === "{}"
                      ? 0
                      : dataDevice.lastClear.length === 0
                      ? 0
                      : (Number(
                          daysUntil(
                            parseDateToCustomFormatPlus(
                              dataDevice.lastClear[0].date
                            )
                          )
                        ) /
                          7) *
                        100
                  }
                  tintColor="#FFA800"
                  backgroundColor="#3d5875"
                  style={styles.statusAparatCurrentCliningModalTimer}
                >
                  {(fill) => (
                    <Text
                      style={styles.statusAparatCurrentCliningModalTimerText}
                    >
                      {JSON.stringify(dataDevice) === "{}" ? (
                        <></>
                      ) : (
                        <>
                          {dataDevice.lastClear.length === 0
                            ? 0
                            : daysUntil(
                                parseDateToCustomFormatPlus(
                                  dataDevice.lastClear[0].date
                                )
                              )}{" "}
                        </>
                      )}

                      {t("днів")}
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>

              <TouchableOpacity
                style={styles.statusAparatCurrentCliningModalSubmit}
                onPress={() => {
                  setAcceptModalClear(true);
                }}
              >
                <Text style={styles.statusAparatCurrentCliningModalSubmitText}>
                  {t("Апарат помитий")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.statusAparatCurrentLevel(isOpenPopcorn)}
              onPress={() => {
                setIsOpenPopcorn(!isOpenPopcorn);
              }}
            >
              <Text style={styles.statusAparatCurrentErrorsText}>
                {t("Рівень попкорна")}
              </Text>

              <View style={styles.statusAparatCurrentErrorsBlock}>
                <View
                  style={styles.statusAparatCurrentErrorsNotification(
                    checkLvl(
                      JSON.stringify(dataDevice) !== "{}"
                        ? dataDevice.actualLevel
                        : 0
                    ) === t("критичний")
                  )}
                >
                  <Notification />
                </View>
                <View
                  style={styles.statusAparatCurrentErrorsArrow(isOpenPopcorn)}
                >
                  <ArrowAparat />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.statusAparatCurrentCliningModal(isOpenPopcorn)}>
              <TouchableOpacity
                style={styles.statusAparatCurrentCliningModalTitle}
                onPress={() => setIsOpenTableFill(!isOpenTableFill)}
              >
                <Text style={styles.statusAparatCurrentCliningModalTitleText}>
                  {t("Дані про останні заправки")}
                </Text>

                <View
                  style={{
                    transform: [{ rotate: isOpenTableFill ? "90deg" : "0deg" }],
                  }}
                >
                  <ArrowAparat width={8} />
                </View>
              </TouchableOpacity>

              {isOpenTableFill && (
                <TableComponent
                  style={{ paddingHorizontal: 0 }}
                  arrayHead={[
                    t("Дата"),
                    t("Час"),
                    t("Рівень"),
                    t("Відповідальна особа"),
                  ]}
                  arrayBody={
                    JSON.stringify(dataDevice) !== "{}"
                      ? dataDevice.lastFill.map((item) => {
                          return [
                            parseDateToCustomFormat2(item.date),
                            item.time.slice(0, 5),
                            item.level + "% ",
                            item.user_id,
                          ];
                        })
                      : []
                  }
                />
              )}

              <Text style={styles.statusAparatCurrentCliningModalSecond}>
                {t("Дані про рівень попкорну")}:
              </Text>

              <View style={styles.statusAparatCurrentCliningModalPopcorn}>
                <View
                  style={styles.statusAparatCurrentCliningModalPopcornVisual}
                >
                  <ImageBackground
                    style={
                      styles.statusAparatCurrentCliningModalPopcornVisualBack
                    }
                    source={backgroundPop}
                  >
                    <ImageBackground
                      style={{
                        position: "absolute",
                        top: 18,
                        left: 11,
                        width: "100%",
                        height: "100%",
                      }}
                      resizeMode="cover"
                      source={popcorn}
                    >
                      <View
                        style={styles.statusAparatCurrentCliningModalPopcornVisualLoad(
                          JSON.stringify(dataDevice) !== "{}"
                            ? dataDevice.actualLevel
                            : 0
                        )}
                      >
                        <View
                          style={styles.statusAparatCurrentCliningModalPopcornVisualLoadDecor(
                            JSON.stringify(dataDevice) !== "{}"
                              ? dataDevice.actualLevel
                              : 0
                          )}
                        ></View>
                      </View>
                    </ImageBackground>
                    <View
                      style={styles.statusAparatCurrentCliningModalPopcornVisualPercent(
                        JSON.stringify(dataDevice) !== "{}"
                          ? dataDevice.actualLevel
                          : 0
                      )}
                    >
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornVisualPercentText
                        }
                      >
                        {JSON.stringify(dataDevice) !== "{}"
                          ? dataDevice.actualLevel
                          : 0}
                        %
                      </Text>
                    </View>
                  </ImageBackground>
                </View>

                <View style={styles.statusAparatCurrentCliningModalPopcornInfo}>
                  <View
                    style={
                      styles.statusAparatCurrentCliningModalPopcornInfoRules
                    }
                  >
                    <View
                      style={
                        styles.statusAparatCurrentCliningModalPopcornInfoRulesItem
                      }
                    >
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornInfoRulesPercent
                        }
                      >{`<15%`}</Text>
                      <View
                        style={{
                          borderRadius: 1,
                          height: 2.5,
                          backgroundColor: "#B40505",
                        }}
                      ></View>
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornInfoRulesText
                        }
                      >
                        {t("критичний")}
                      </Text>
                    </View>
                    <View
                      style={
                        styles.statusAparatCurrentCliningModalPopcornInfoRulesItem
                      }
                    >
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornInfoRulesPercent
                        }
                      >{`<30%`}</Text>
                      <View
                        style={{
                          borderRadius: 1,
                          height: 2.5,
                          backgroundColor: "#FFA800",
                        }}
                      ></View>
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornInfoRulesText
                        }
                      >
                        {t("низький")}
                      </Text>
                    </View>
                    <View
                      style={
                        styles.statusAparatCurrentCliningModalPopcornInfoRulesItem
                      }
                    >
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornInfoRulesPercent
                        }
                      >{`>30%`}</Text>
                      <View
                        style={{
                          borderRadius: 1,
                          height: 2.5,
                          backgroundColor: "#2BAB0B",
                        }}
                      ></View>
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornInfoRulesText
                        }
                      >
                        {t("нормальний")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={
                      styles.statusAparatCurrentCliningModalPopcornInfoLvlBlock
                    }
                  >
                    <Text
                      style={
                        styles.statusAparatCurrentCliningModalPopcornInfoLvl
                      }
                    >
                      {t("Наразі рівень попкорну")}:
                    </Text>
                    <View
                      style={styles.statusAparatCurrentCliningModalPopcornInfoLvlSpan(
                        JSON.stringify(dataDevice) !== "{}"
                          ? dataDevice.actualLevel
                          : 0
                      )}
                    >
                      <Text
                        style={
                          styles.statusAparatCurrentCliningModalPopcornInfoLvlSpanText
                        }
                      >
                        {checkLvl(
                          JSON.stringify(dataDevice) !== "{}"
                            ? dataDevice.actualLevel
                            : 0
                        )}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={styles.statusAparatCurrentCliningModalPopcornInfoNot}
                  >
                    {t(
                      "Вас буде повідомлено про зниження рівня попкорну до критичного"
                    )}
                    .
                  </Text>
                  <Text
                    style={
                      styles.statusAparatCurrentCliningModalPopcornInfoWarning
                    }
                  >
                    {JSON.stringify(dataDevice) !== "{}" ? (
                      <>
                        {dataDevice.there_is_a_stock ? (
                          <>
                            {t("У нижньому боксі є попкорн")}:
                            <PopcornGood />
                          </>
                        ) : (
                          <>
                            {t("У нижньому боксі немає попкорн")}:
                            <PopcornError />
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setAcceptModalFill(true)}
                style={styles.statusAparatCurrentCliningModalSubmit}
              >
                <Text style={styles.statusAparatCurrentCliningModalSubmitText}>
                  {t("Апарат заправлений")}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={stylesAdmin.adminCreateErrorBlock(acceptModalClear)}>
          <View style={stylesAdmin.adminCreateError}>
            <View style={{ marginBottom: 36 }}>
              <AcceptIcon />
            </View>

            <Text style={stylesAdmin.adminCreateErrorText}>
              {t("Підтвердіть дію")}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={stylesAdmin.adminCreateErrorButton}
                onPress={() => setAcceptModalClear(false)}
              >
                <Text style={stylesAdmin.adminCreateErrorButtonText}>
                  {t("Назад")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...stylesAdmin.adminCreateErrorButton,
                  backgroundColor: "#067841",
                }}
                onPress={updateClear}
              >
                <Text style={stylesAdmin.adminCreateErrorButtonText}>
                  {t("Підтвердити")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={stylesAdmin.adminCreateErrorBlock(acceptModalFill)}>
          <View style={stylesAdmin.adminCreateError}>
            <View style={{ marginBottom: 36 }}>
              <AcceptIcon />
            </View>

            <Text style={stylesAdmin.adminCreateErrorText}>
              {t("Підтвердіть дію")}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={stylesAdmin.adminCreateErrorButton}
                onPress={() => setAcceptModalFill(false)}
              >
                <Text style={stylesAdmin.adminCreateErrorButtonText}>
                  {t("Назад")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...stylesAdmin.adminCreateErrorButton,
                  backgroundColor: "#067841",
                }}
                onPress={updateFill}
              >
                <Text style={stylesAdmin.adminCreateErrorButtonText}>
                  {t("Підтвердити")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlashMessage position="top" />
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

export default StatusAparatCurrent;
