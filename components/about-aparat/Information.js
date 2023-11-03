import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles/about-aparat";

import { useTranslation } from "react-i18next";
import { useState } from "react";

import EditIcon from "../../assets/icons/EditIcon";
import useVerify from "../hooks/useVerify";

const Information = ({
  isActiveTab = false,
  information = {},
  currentAparat = {},
}) => {
  const { t } = useTranslation();
  const [informationUpdate, setInformationUpdate] = useState(false);

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

  const updateInformation = async () => {
    try {
      const { verify, dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");
      const lang = await AsyncStorage.getItem("lang");

      const result = await axios.put(
        `${SERVER}/about-devices/devices/information?user_id=${dataFetch.id}&serial_number=${currentAparat.serial_number}`,
        {
          name: information.name,
          location: information.location,
          owner: selectedOwners,
          user: selectedUsers,
          shipment_date: parseDateToCustomFormat(date),
          commissioning_date: parseDateToCustomFormat(dateGlobal),
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
        getInformation();
      }
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeButtonUpdateInformation = () => {
    setInformationUpdate(!informationUpdate);
    if (informationUpdate) {
      updateInformation();
    }
  };

  return (
    <View
      style={styles.aboutAparatStatInformation(isActiveTab === "information")}
    >
      <View style={styles.aboutAparatStatInfoItem(true)}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>{t("Назва")}:</Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View style={styles.aboutAparatStatInfoItemUpdate()}>
                <TextInput
                  style={styles.aboutAparatStatInfoItemUpdateInput}
                  value={
                    JSON.stringify(information) === "{}"
                      ? ""
                      : information?.name
                  }
                  onChangeText={(value) =>
                    setInformation({ ...information, name: value })
                  }
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.aboutAparatStatInfoItemValue}>
                {JSON.stringify(information) === "{}" ? "" : information?.name}
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>
          {t("Розташування")}:
        </Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View style={styles.aboutAparatStatInfoItemUpdate()}>
                <TextInput
                  style={styles.aboutAparatStatInfoItemUpdateInput}
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
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>
          {t("Серійний номер")}:
        </Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View style={styles.aboutAparatStatInfoItemUpdate()}>
                <TextInput
                  style={styles.aboutAparatStatInfoItemUpdateInput}
                  value={currentAparat.serial_number}
                  // onChangeText={(value) =>
                  //   setInformation({
                  //     ...information,
                  //     serial_number: value,
                  //   })
                  // }
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
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>{t("Власник")}:</Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View
                style={styles.aboutAparatStatInfoItemUpdate(true, "flex-end")}
              >
                <Dropdown
                  style={{
                    width: "100%",
                    position: "absolute",
                  }}
                  selectedTextStyle={styles.aboutAparatStatInfoItemUpdateInput}
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
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>
          {t("Користувач")}:
        </Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View
                style={styles.aboutAparatStatInfoItemUpdate(true, "flex-end")}
              >
                <Dropdown
                  style={{
                    width: "100%",
                    position: "absolute",
                  }}
                  selectedTextStyle={styles.aboutAparatStatInfoItemUpdateInput}
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
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>{t("Дилер")}:</Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View
                style={styles.aboutAparatStatInfoItemUpdate(true, "flex-end")}
              >
                <Dropdown
                  style={{
                    width: "100%",
                    position: "absolute",
                  }}
                  selectedTextStyle={styles.aboutAparatStatInfoItemUpdateInput}
                  value={dataUsers.find(
                    (item) => item.label === information.user
                  )}
                  data={dataUsers}
                  labelField="label"
                  valueField="value"
                  placeholder={null}
                  onChange={(selected) => {
                    setSelectedDiler(selected.value);
                  }}
                  iconStyle={{ display: "none" }}
                />
                <View style={{ marginRight: 5 }}>
                  <Arrow width={13} height={8} />
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.aboutAparatStatInfoItemValue}>user</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>ОСО:</Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View
                style={styles.aboutAparatStatInfoItemUpdate(true, "flex-end")}
              >
                <Dropdown
                  style={{
                    width: "100%",
                    position: "absolute",
                  }}
                  selectedTextStyle={styles.aboutAparatStatInfoItemUpdateInput}
                  value={dataUsers.find(
                    (item) => item.label === information.user
                  )}
                  data={dataUsers}
                  labelField="label"
                  valueField="value"
                  placeholder={null}
                  onChange={(selected) => {
                    setSelectedOco(selected.value);
                  }}
                  iconStyle={{ display: "none" }}
                />
                <View style={{ marginRight: 5 }}>
                  <Arrow width={13} height={8} />
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.aboutAparatStatInfoItemValue}>user</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>
          {t("№ рахунок фактури")}:
        </Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View style={styles.aboutAparatStatInfoItemUpdate()}>
                <TextInput
                  style={styles.aboutAparatStatInfoItemUpdateInput}
                  value="20224040"
                />
              </View>
            </>
          ) : (
            <Text style={styles.aboutAparatStatInfoItemValue}>20224040</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>
          {t("№ акт при-перед")}:
        </Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View style={styles.aboutAparatStatInfoItemUpdate()}>
                <TextInput
                  style={styles.aboutAparatStatInfoItemUpdateInput}
                  value="20224040"
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.aboutAparatStatInfoItemValue}>20224040</Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>
          {t("Дата відгрузки")}:
        </Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View style={styles.aboutAparatStatInfoItemUpdate()}>
                <TouchableOpacity
                  style={styles.aboutAparatStatInfoItemUpdateDate}
                  onPress={() => setShow(true)}
                >
                  <Text style={styles.aboutAparatStatInfoItemValue}>
                    {parseDateToCustomFormat(date)}
                  </Text>
                  <Image
                    source={dateIcon}
                    style={{ width: 19, height: 19, marginLeft: 5 }}
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
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>
          {t("Дата введення в експлуатацію")}:
        </Text>

        <View style={styles.aboutAparatStatInfoItemUpdateBlock}>
          {informationUpdate ? (
            <>
              <View style={styles.aboutAparatStatInfoItemUpdate()}>
                <TouchableOpacity
                  style={styles.aboutAparatStatInfoItemUpdateDate}
                  onPress={() => setShowGlobal(true)}
                >
                  <Text style={styles.aboutAparatStatInfoItemValue}>
                    {parseDateToCustomFormat(dateGlobal)}
                  </Text>
                  <Image
                    source={dateIcon}
                    style={{ width: 19, height: 19, marginLeft: 5 }}
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
          style={styles.aboutAparatStatInfoItemButton}
          onPress={changeButtonUpdateInformation}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <Text style={styles.aboutAparatStatInfoItemTitle}>{t("Пробіг")}:</Text>

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
    </View>
  );
};

export default Information;
