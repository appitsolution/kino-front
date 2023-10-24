import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "../styles/about-aparat";
import Logo from "../assets/icons/Logo";
import MenuIcon from "../assets/icons/MenuIcon";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import MenuMobile from "../components/Menu";
import ArrowAparat from "../assets/icons/ArrowAparat";
import EditIcon from "../assets/icons/EditIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-element-dropdown";
import dateIcon from "../assets/images/date.png";
import Arrow from "../assets/icons/Arrow";
import DateTimePicker from "@react-native-community/datetimepicker";
import stylesDate from "../styles/statistics";
import useVerify from "../components/hooks/useVerify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER } from "../constants/async";
import { useTranslation } from "react-i18next";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import Control from "../components/about-aparat/Control";
import useGuard from "../components/hooks/useGuard";

const AboutAparat = () => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function parseDateToCustomFormat(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  const [date, setDate] = useState(new Date());
  const [dateGlobal, setDateGlobal] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    Platform.OS === "android" && setShow(false);

    setDate(currentDate);
  };

  const onChangeGlobal = (event, selectedDate) => {
    const currentDate = selectedDate;
    Platform.OS === "android" && setShowGlobal(false);
    parseDateToCustomFormat(inputDate);
    setDateGlobal(currentDate);
  };

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [isActiveTab, setIsActiveTab] = useState("information");

  const [informationUpdate, setInformationUpdate] = useState(0);
  const [complectationUpdate, setComplectationUpdate] = useState(0);

  const [selectedOwners, setSelectedOwners] = useState("");
  const [selectedUsers, setSelectedUsers] = useState("");
  const [selectedDealer, setSelectedDealer] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");

  const [dataOwners, setDataOwners] = useState([]);

  const [dataUsers, setDataUsers] = useState([]);

  const [dataDealers, setDataDealers] = useState([]);

  const [dataOperators, setDataOperators] = useState([]);

  const [aparatList, setAparatList] = useState([]);
  const [currentAparat, setCurrentAparat] = useState({});

  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");

  const [information, setInformation] = useState({});
  const [complectation, setComplectation] = useState([]);
  const [service, setService] = useState([]);

  const getInformation = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");
      const lang = await AsyncStorage.getItem("lang");
      const result = await axios(
        `${SERVER}/about-devices/devices?lang=${lang}&user_id=${dataFetch.id}&serial_number=${currentAparat.serial_number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code !== 200) {
        showMessage({
          message: t("Помилка"),
          description: `Інформації не знайдено`,
          type: "danger",
          duration: 5000,
        });

        changeCurrentAparat(aparatList[0].serial_number);

        return;
      }

      if (result.data.information?.shipment_date) {
        setDate(new Date(result.data.information.shipment_date));
      }
      if (result.data.information?.commissioning_date) {
        setDateGlobal(new Date(result.data.information.commissioning_date));
      }

      if (result.data.information?.owner) {
        setSelectedOwners(
          dataOwners.find(
            (item) => item.label === result.data.information.owner
          ).value
        );
      }

      if (result.data.information?.user) {
        const client = dataUsers.find(
          (item) => item.label === result.data.information.user
        );
        if (client) {
          setSelectedUsers(client.value);
        } else {
          setSelectedUsers("");
        }
      }

      setInformation(result.data.information);
      setComplectation(result.data.complectation);
      setService(result.data.service);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (JSON.stringify(currentAparat) === "{}") return;
    getInformation();
  }, [currentAparat]);

  const changeCurrentAparat = (serial_number) => {
    const searchAparat = aparatList.find(
      (item) => item.serial_number === serial_number
    );

    setIsOpenSelect(false);

    setCurrentAparat(searchAparat);
  };

  const getStart = async () => {
    const { dataFetch } = await useVerify();
    const token = await AsyncStorage.getItem("token");

    const users = await axios(`${SERVER}/admininstration/quick`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const lang = await AsyncStorage.getItem("lang");

    const result = await axios(
      `${SERVER}/about-devices/quick?lang=${lang}&user_id=${dataFetch.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const clients = users.data.users.filter((item) => {
      if (item.role === "CLIENT") {
        return {
          label: item.username,
          value: item.id,
        };
      } else {
        return;
      }
    });

    const clientsList = clients.map((item) => ({
      label: item.username,
      value: item.id,
    }));

    const dealers = users.data.users.filter((item) => {
      if (item.role === "DEALER") {
        return item;
      } else {
        return;
      }
    });
    const dealersList = dealers.map((item) => ({
      label: item.username,
      value: item.id,
    }));

    const operators = users.data.users.filter((item) => {
      if (item.role === "OPERATOR") {
        return item;
      } else {
        return;
      }
    });

    const operatorsList = operators.map((item) => ({
      label: item.username,
      value: item.id,
    }));

    if (clients.length === 0) {
      setDataUsers([]);
    } else {
      setDataOwners(clientsList);
    }

    if (dealers.length === 0) {
      setDataDealers([]);
    } else {
      setDataDealers(dealersList);
    }

    if (operators.length === 0) {
      setDataOperators([]);
    } else {
      setDataOperators(operatorsList);
    }

    setDataOwners(
      users.data.owners.map((item) => ({
        label: item.owner,
        value: item.id,
      }))
    );

    const aparatListFilter = result.data.map((item) => {
      if (!item.location) {
        item.location = "Не вказано";
      }
      if (!item.name) {
        item.name = item.serial_number;
      }

      return item;
    });
    setSelectedSerialNumber(
      result.data.length === 0 ? {} : result.data[0].serial_number
    );
    setAparatList(aparatListFilter);
    setCurrentAparat(result.data.length === 0 ? {} : result.data[0]);
  };

  const updateInformation = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");
      const lang = await AsyncStorage.getItem("lang");

      const result = await axios.put(
        `${SERVER}/about-devices/devices/information?user_id=${dataFetch.id}&serial_number=${currentAparat.serial_number}`,
        {
          name: information.name,
          location: information.location,
          owner: selectedOwners ? selectedOwners : information.owner,
          user: selectedUsers ? selectedUsers : information.user,
          dealer: selectedDealer ? selectedDealer : information.dealer,
          operator: selectedOperator ? selectedOperator : information.operator,
          serial_number: selectedSerialNumber,
          shipment_date: parseDateToCustomFormat(date),
          commissioning_date: parseDateToCustomFormat(dateGlobal),
          number_score: information.number_score,
          number_act: information.number_act,
          lang: lang,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: `Інформацію оновлено`,
          type: "success",
          duration: 5000,
        });
        setCurrentAparat({
          ...currentAparat,
          serial_number: selectedSerialNumber,
        });
      }
      console.log(result.data);
    } catch (err) {
      if (err.response.status === 403) {
        accessNot();
      }
      console.log(err);
    }
  };

  const updateComplectation = async () => {
    const newComplectation = complectation.map((item) => {
      return {
        id: item.id,
        apparatus_id: item.apparatus_id,
        new_component_type_id: item.value.id,
      };
    });

    try {
      const token = await AsyncStorage.getItem("token");
      const { dataFetch } = await useVerify();

      const result = await axios.put(
        `${SERVER}/about-devices/devices/complectation?user_id=${dataFetch.id}&serial_number=${currentAparat.serial_number}`,
        newComplectation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: `Комплектацію оновлено`,
          type: "success",
          duration: 5000,
        });
      }

      if (result.data.code !== 200) {
        showMessage({
          message: t("Помилка"),
          description: `Сталася помилка`,
          type: "danger",
          duration: 5000,
        });
      }
    } catch (err) {
      if (err.response.status === 403) {
        accessNot();
      }
      console.log(err);
    }
  };

  const updateService = async (id, value) => {
    const updateDataService = [
      { id: id, newValue: Number(information?.all_sell) - Number(value) },
    ];
    setService(
      service.map((item) => {
        if (item.value.id === id) {
          return {
            ...item,
            value: {
              value: Number(information?.all_sell) - Number(value),
            },
          };
        } else {
          return item;
        }
      })
    );
    try {
      const token = await AsyncStorage.getItem("token");
      const { dataFetch } = await useVerify();

      const result = await axios.put(
        `${SERVER}/about-devices/devices/service?user_id=${dataFetch.id}&serial_number=${currentAparat.serial_number}`,
        updateDataService,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: `Сервіс оновлено`,
          type: "success",
          duration: 5000,
        });
      }

      if (result.data.code !== 200) {
        showMessage({
          message: t("Помилка"),
          description: `Сталася помилка`,
          type: "danger",
          duration: 5000,
        });
      }
    } catch (err) {
      if (err.response.status === 403) {
        accessNot();
      }
      console.log(err);
    }
  };

  const changeButtonUpdateInformation = () => {
    updateInformation();

    setInformationUpdate(0);
  };

  const changeButtonUpdateComplectation = () => {
    updateComplectation();
    setComplectationUpdate(0);
  };

  const [userRole, setUserRole] = useState("");
  const checkUser = async () => {
    const { dataFetch } = await useVerify();

    setUserRole(dataFetch.role);

    const guard = await useGuard("about-aparat");
    if (!guard) {
      navigation.navigate("status-aparat");
    }
  };

  const accessNot = () => {
    showMessage({
      message: t("Помилка"),
      description: t(`У вас немає прав`),
      type: "danger",
      duration: 5000,
    });
  };

  const [guardInformation, setGuardInformation] = useState(false);
  const [guardComplectation, setGuardComplectation] = useState(false);
  const [guardService, setGuardService] = useState(false);
  const checkGuard = async () => {
    const checkInformation = await useGuard("about-aparat/information/edit");
    const checkComplectation = await useGuard(
      "about-aparat/complectation/edit"
    );
    const checkService = await useGuard("about-aparat/service/edit");

    setGuardInformation(checkInformation);
    setGuardComplectation(checkComplectation);
    setGuardService(checkService);
  };
  const requestAll = async () => {
    await checkUser();
    await checkGuard();
    getStart();
  };

  useEffect(() => {
    if (isFocused) {
      requestAll();
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.aboutAparat}>
        <View style={styles.header}>
          <Logo />
          <Text style={styles.headerTitle}>{t("Про апарати")}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsOpenMenu(true);
            }}
          >
            <MenuIcon />
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.aboutAparatBlock}>
            <View style={styles.aboutAparatSelect}>
              <View style={styles.aboutAparatSelectText}>
                <Text style={styles.aboutAparatSelectTextName}>
                  {t("Назва")}
                </Text>
                <Text style={styles.aboutAparatSelectTextName}>
                  {t("Розташування")}
                </Text>
                <Text style={styles.aboutAparatSelectTextScore}>
                  {t("Серійний номер")}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.aboutAparatSelectCurrent}
                onPress={() => setIsOpenSelect(!isOpenSelect)}
              >
                <View style={styles.aboutAparatSelectCurrentContent}>
                  <Text style={styles.aboutAparatSelectCurrentContentName}>
                    {JSON.stringify(currentAparat) === "{}"
                      ? ""
                      : currentAparat?.name}
                  </Text>
                  <Text style={styles.aboutAparatSelectCurrentContentName}>
                    {JSON.stringify(currentAparat) === "{}"
                      ? ""
                      : currentAparat.location}
                  </Text>
                  <Text style={styles.aboutAparatSelectCurrentContenttScore}>
                    {JSON.stringify(currentAparat) === "{}"
                      ? ""
                      : currentAparat.serial_number}
                  </Text>
                </View>
                <View style={styles.aboutAparatSelectCurrentIconBlock}>
                  <View
                    style={styles.aboutAparatSelectCurrentIcon(isOpenSelect)}
                  >
                    <ArrowAparat />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.aboutAparatSelectModal(isOpenSelect)}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {aparatList.map((item) => (
                    <TouchableOpacity
                      style={styles.aboutAparatSelectModalItem}
                      key={item.serial_number}
                      onPress={() => changeCurrentAparat(item.serial_number)}
                    >
                      <Text style={styles.aboutAparatSelectModalItemName}>
                        {item.name}
                      </Text>
                      <Text style={styles.aboutAparatSelectModalItemName}>
                        {item.location}
                      </Text>
                      <Text style={styles.aboutAparatSelectModalItemScore}>
                        {item.serial_number}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {aparatList.length === 0 ? (
              <></>
            ) : (
              <View style={styles.aboutAparatStat}>
                <View style={styles.aboutAparatStatTabs}>
                  <TouchableOpacity
                    style={styles.aboutAparatStatTabsItem(
                      isActiveTab === "information"
                    )}
                    onPress={async () => {
                      const guardCheckInformation = await useGuard(
                        "about-aparat/information"
                      );
                      if (guardCheckInformation) {
                        setIsActiveTab("information");
                        return;
                      }
                      accessNot();
                    }}
                  >
                    <Text style={styles.aboutAparatStatTabsItemText}>
                      {t("Інформація")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.aboutAparatStatTabsItem(
                      isActiveTab === "complectation"
                    )}
                    onPress={async () => {
                      const guardCheckComplectation = await useGuard(
                        "about-aparat/complectation"
                      );
                      if (guardCheckComplectation) {
                        setIsActiveTab("complectation");
                        return;
                      }
                      accessNot();
                    }}
                  >
                    <Text style={styles.aboutAparatStatTabsItemText}>
                      {t("Комплектація")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.aboutAparatStatTabsItem(
                      isActiveTab === "service"
                    )}
                    onPress={async () => {
                      const guardCheckService = await useGuard(
                        "about-aparat/service"
                      );
                      if (guardCheckService) {
                        setIsActiveTab("service");
                        return;
                      }
                      accessNot();
                    }}
                  >
                    <Text style={styles.aboutAparatStatTabsItemText}>
                      {t("Сервісне обслуговування")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.aboutAparatStatTabsItem(
                        isActiveTab === "control"
                      ),
                      marginRight: 0,
                    }}
                    onPress={async () => {
                      const guardCheckControl = await useGuard(
                        "about-aparat/control"
                      );
                      if (guardCheckControl) {
                        setIsActiveTab("control");
                        return;
                      }
                      accessNot();
                    }}
                  >
                    <Text style={styles.aboutAparatStatTabsItemText}>
                      {t("Керування апаратом")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 5,
                    backgroundColor: "#FFA800",
                    marginTop: -5,
                  }}
                ></View>

                <View style={styles.aboutAparatStatInfo}>
                  <View
                    style={styles.aboutAparatStatInformation(
                      isActiveTab === "information"
                    )}
                  >
                    <View style={styles.aboutAparatStatInfoItem(true)}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Назва")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 1 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate()}
                            >
                              <TextInput
                                style={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={
                                  JSON.stringify(information) === "{}"
                                    ? ""
                                    : information?.name
                                }
                                onChangeText={(value) =>
                                  setInformation({
                                    ...information,
                                    name: value,
                                  })
                                }
                              />
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {JSON.stringify(information) === "{}"
                                ? ""
                                : information?.name}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity:
                            guardInformation || userRole === "CLIENT" ? 1 : 0,
                        }}
                        onPress={() => {
                          if (informationUpdate === 1) {
                            changeButtonUpdateInformation();
                          } else if (informationUpdate === 0) {
                            setInformationUpdate(1);
                          }
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Розташування")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 2 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate()}
                            >
                              <TextInput
                                style={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={information.location}
                                onChangeText={(value) =>
                                  setInformation({
                                    ...information,
                                    location: value,
                                  })
                                }
                              />
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {information?.location}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 2) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(2);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Серійний номер")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 3 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate()}
                            >
                              <TextInput
                                style={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={selectedSerialNumber}
                                onChangeText={(value) =>
                                  setSelectedSerialNumber(value)
                                }
                              />
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {currentAparat.serial_number}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 3) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(3);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Власник")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 4 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate(
                                true,
                                "flex-end"
                              )}
                            >
                              <Dropdown
                                style={{
                                  width: "100%",
                                  position: "absolute",
                                }}
                                selectedTextStyle={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={selectedOwners}
                                data={dataOwners}
                                labelField="label"
                                valueField="value"
                                placeholder={null}
                                onChange={(selected) => {
                                  setSelectedOwners(selected.value);
                                }}
                                iconStyle={{ display: "none" }}
                              />
                              <View style={{ marginRight: 5 }}>
                                <Arrow width={13} height={8} />
                              </View>
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {information?.owner}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 4) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(4);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Користувач")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 5 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate(
                                true,
                                "flex-end"
                              )}
                            >
                              <Dropdown
                                style={{
                                  width: "100%",
                                  position: "absolute",
                                }}
                                selectedTextStyle={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={selectedUsers}
                                data={dataUsers}
                                labelField="label"
                                valueField="value"
                                placeholder={null}
                                onChange={(selected) => {
                                  setSelectedUsers(selected.value);
                                }}
                                iconStyle={{ display: "none" }}
                              />
                              <View style={{ marginRight: 5 }}>
                                <Arrow width={13} height={8} />
                              </View>
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {information?.user}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 5) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(5);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Дилер")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 6 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate(
                                true,
                                "flex-end"
                              )}
                            >
                              <Dropdown
                                style={{
                                  width: "100%",
                                  position: "absolute",
                                }}
                                selectedTextStyle={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={selectedDealer}
                                data={dataDealers}
                                labelField="label"
                                valueField="value"
                                placeholder={null}
                                onChange={(selected) => {
                                  setSelectedDealer(selected.value);
                                }}
                                iconStyle={{ display: "none" }}
                              />
                              <View style={{ marginRight: 5 }}>
                                <Arrow width={13} height={8} />
                              </View>
                            </View>
                          </>
                        ) : (
                          <Text style={styles.aboutAparatStatInfoItemValue}>
                            {information.dealer
                              ? information.dealer
                              : t("Не обрано")}
                          </Text>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 6) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(6);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("ОСО")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 7 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate(
                                true,
                                "flex-end"
                              )}
                            >
                              <Dropdown
                                style={{
                                  width: "100%",
                                  position: "absolute",
                                }}
                                selectedTextStyle={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={selectedOperator}
                                data={dataOperators}
                                labelField="label"
                                valueField="value"
                                placeholder={null}
                                onChange={(selected) => {
                                  setSelectedOperator(selected.value);
                                }}
                                iconStyle={{ display: "none" }}
                              />
                              <View style={{ marginRight: 5 }}>
                                <Arrow width={13} height={8} />
                              </View>
                            </View>
                          </>
                        ) : (
                          <Text style={styles.aboutAparatStatInfoItemValue}>
                            {information.operator
                              ? information.operator
                              : t("Не обрано")}
                          </Text>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 7) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(7);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("№ рахунок фактури")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 8 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate()}
                            >
                              <TextInput
                                style={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={
                                  information.number_score
                                    ? information.number_score
                                    : ""
                                }
                                onChangeText={(value) =>
                                  setInformation({
                                    ...information,
                                    number_score: value,
                                  })
                                }
                              />
                            </View>
                          </>
                        ) : (
                          <Text style={styles.aboutAparatStatInfoItemValue}>
                            {information.number_score
                              ? information.number_score
                              : t("Не обрано")}
                          </Text>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          // if (!information.number_score) {
                          //   showMessage({
                          //     message: t("Помилка"),
                          //     description: t(`Введіть значення`),
                          //     type: "danger",
                          //     duration: 5000,
                          //   });
                          //   return;
                          // }
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 8) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(8);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("№ акт при-перед")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 9 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate()}
                            >
                              <TextInput
                                style={
                                  styles.aboutAparatStatInfoItemUpdateInput
                                }
                                value={
                                  information.number_act
                                    ? information.number_act
                                    : ""
                                }
                                onChangeText={(value) =>
                                  setInformation({
                                    ...information,
                                    number_act: value,
                                  })
                                }
                              />
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {information.number_act
                                ? information.number_act
                                : t("Не обрано")}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          // if (!information.number_score) {
                          //   showMessage({
                          //     message: t("Помилка"),
                          //     description: t(`Введіть значення`),
                          //     type: "danger",
                          //     duration: 5000,
                          //   });
                          //   return;
                          // }
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 9) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(9);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Дата відгрузки")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 10 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate()}
                            >
                              <TouchableOpacity
                                style={styles.aboutAparatStatInfoItemUpdateDate}
                                onPress={() => setShow(true)}
                              >
                                <Text
                                  style={styles.aboutAparatStatInfoItemValue}
                                >
                                  {parseDateToCustomFormat(date)}
                                </Text>
                                <Image
                                  source={dateIcon}
                                  style={{
                                    width: 19,
                                    height: 19,
                                    marginLeft: 5,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {parseDateToCustomFormat(date)}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 10) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(10);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Дата введення в експлуатацію")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        {informationUpdate === 11 ? (
                          <>
                            <View
                              style={styles.aboutAparatStatInfoItemUpdate()}
                            >
                              <TouchableOpacity
                                style={styles.aboutAparatStatInfoItemUpdateDate}
                                onPress={() => setShowGlobal(true)}
                              >
                                <Text
                                  style={styles.aboutAparatStatInfoItemValue}
                                >
                                  {parseDateToCustomFormat(dateGlobal)}
                                </Text>
                                <Image
                                  source={dateIcon}
                                  style={{
                                    width: 19,
                                    height: 19,
                                    marginLeft: 5,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.aboutAparatStatInfoItemValue}>
                              {parseDateToCustomFormat(dateGlobal)}
                            </Text>
                          </>
                        )}
                      </View>

                      <TouchableOpacity
                        style={{
                          ...styles.aboutAparatStatInfoItemButton,
                          opacity: guardInformation ? 1 : 0,
                        }}
                        onPress={async () => {
                          const guardCheckInformationEdit = await useGuard(
                            "about-aparat/information/edit"
                          );
                          if (guardCheckInformationEdit) {
                            if (informationUpdate === 11) {
                              changeButtonUpdateInformation();
                            } else if (informationUpdate === 0) {
                              setInformationUpdate(11);
                            }
                            return;
                          }
                          accessNot();
                        }}
                      >
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.aboutAparatStatInfoItem()}>
                      <Text style={styles.aboutAparatStatInfoItemTitle}>
                        {t("Пробіг")}:
                      </Text>

                      <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                        <View style={styles.aboutAparatStatInfoItemUpdate}>
                          <Text style={styles.aboutAparatStatInfoItemValue}>
                            {information?.all_sell}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity style={{ display: "none" }}>
                        <EditIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={styles.aboutAparatStatComplectation(
                      isActiveTab === "complectation"
                    )}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.aboutAparatStatInfoItemLabel}>
                        {t("Назва модуля")}
                      </Text>
                      <Text style={styles.aboutAparatStatInfoItemLabel}>
                        {t("Тип модуля")}
                      </Text>
                      <Text style={styles.aboutAparatStatInfoItemLabel}>
                        {t("Змінити")}
                      </Text>
                    </View>
                    {complectation.map((item, index) => (
                      <View
                        style={styles.aboutAparatStatInfoItem()}
                        key={index}
                      >
                        <Text style={styles.aboutAparatStatInfoItemTitle}>
                          {item.title.title}:
                        </Text>

                        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                          {complectationUpdate === index + 1 ? (
                            <>
                              <View
                                style={styles.aboutAparatStatInfoItemUpdate()}
                              >
                                <Dropdown
                                  style={{
                                    width: "100%",
                                    position: "absolute",
                                  }}
                                  selectedTextStyle={
                                    styles.aboutAparatStatInfoItemUpdateInput
                                  }
                                  value={item.variant.find(
                                    (variantItem) =>
                                      variantItem.id === item.value.id
                                  )}
                                  data={item.variant}
                                  labelField="component_type"
                                  valueField="id"
                                  placeholder={null}
                                  onChange={(selected) => {
                                    const changeCompectation =
                                      complectation.map((comp) => {
                                        if (comp.value.id === item.value.id) {
                                          return {
                                            ...item,
                                            value: {
                                              value: selected.component_type,
                                              id: selected.id,
                                            },
                                          };
                                        } else {
                                          return comp;
                                        }
                                      });

                                    setComplectation(changeCompectation);
                                  }}
                                  iconStyle={{ display: "none" }}
                                />
                              </View>
                            </>
                          ) : (
                            <>
                              <Text style={styles.aboutAparatStatInfoItemValue}>
                                {item.value.value}
                              </Text>
                            </>
                          )}
                        </View>

                        <TouchableOpacity
                          style={{
                            ...styles.aboutAparatStatInfoItemButton,
                            opacity: guardComplectation ? 1 : 0,
                          }}
                          onPress={async () => {
                            const guardCheckComplectationEdit = await useGuard(
                              "about-aparat/complectation/edit"
                            );
                            if (guardCheckComplectationEdit) {
                              if (complectationUpdate === index + 1) {
                                changeButtonUpdateComplectation();
                              } else if (complectationUpdate === 0) {
                                setComplectationUpdate(index + 1);
                              }

                              return;
                            }
                            accessNot();
                          }}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <View
                    style={styles.aboutAparatStatService(
                      isActiveTab === "service"
                    )}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.aboutAparatStatInfoItemLabel}>
                        {t("Назва модуля")}
                      </Text>
                      <Text style={styles.aboutAparatStatInfoItemLabel}>
                        {t("Пробіг (к-сть порцій)")}
                      </Text>
                      <Text style={styles.aboutAparatStatInfoItemLabel}>
                        {t("Змінити")}
                      </Text>
                    </View>

                    {service.map((item, index) => (
                      <View
                        style={styles.aboutAparatStatInfoItem()}
                        key={index}
                      >
                        <Text style={styles.aboutAparatStatInfoItemTitle}>
                          {item.title.title}:
                        </Text>

                        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
                          <Text style={styles.aboutAparatStatInfoItemValue}>
                            {Number(
                              information?.all_sell ? information?.all_sell : 0
                            ) - Number(item.value.value)}
                            {/* {item.value.value} */}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={{
                            ...styles.aboutAparatStatInfoItemButton,
                            opacity: guardService ? 1 : 0,
                          }}
                          onPress={async () => {
                            const guardCheckServiceEdit = await useGuard(
                              "about-aparat/service/edit"
                            );
                            if (guardCheckServiceEdit) {
                              updateService(
                                item.value.id,
                                item.value.value ? item.value.value : 0
                              );
                              return;
                            }
                            accessNot();
                          }}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <Control
                    isActiveTab={isActiveTab}
                    serial_number={currentAparat.serial_number}
                    showMessage={showMessage}
                  />
                </View>
              </View>
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
                    <Text style={stylesDate.paramSearchSelectCurrentText(20)}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShow(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={stylesDate.paramSearchSelectCurrentText(20)}>
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
                    <Text style={stylesDate.paramSearchSelectCurrentText(20)}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowGlobal(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={stylesDate.paramSearchSelectCurrentText(20)}>
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

        <FlashMessage position="top" />
      </View>

      <MenuMobile
        open={isOpenMenu}
        current="about-aparat"
        closeFun={setIsOpenMenu}
      />
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default AboutAparat;
