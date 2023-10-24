import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import styles from "../styles/group";
import Logo from "../assets/icons/Logo";
import MenuIcon from "../assets/icons/MenuIcon";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import MenuMobile from "../components/Menu";
import ArrowAparat from "../assets/icons/ArrowAparat";
import accept from "../assets/images/accept.png";
import axios from "axios";
import { SERVER } from "../constants/async";
import useVerify from "../components/hooks/useVerify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import stylesAdmin from "../styles/admin";
import errorIcon from "../assets/images/delete.png";
import { useTranslation } from "react-i18next";
import useGuard from "../components/hooks/useGuard";

const Group = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDeleteGroup, setIsOpenDeleteGroup] = useState(false);

  const [userGroups, setUserGroups] = useState([]);
  const [userAparats, setUserAparats] = useState([]);

  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const checkedGroup = (id) => {
    const newData = userAparats.map((item, index) => {
      if (id === item.id) {
        return {
          ...item,
          active: !item.active,
        };
      } else {
        return item;
      }
    });
    setUserAparats(newData);
  };

  const [currentGroup, setCurrentGroup] = useState({});
  const [newGroupName, setNewGroupName] = useState(
    JSON.stringify(currentGroup) === "{}" ? "" : currentGroup.group_name
  );

  const changeCurrentGroup = (id) => {
    const group = userGroups.find((item) => item.id === id);

    const filterGroupAparat = userAparats.map((item) => {
      if (group.apparatus.list.find((app) => app.apparatus_id === item.id)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });

    setUserAparats(filterGroupAparat);
    setCurrentGroup(group);
    setNewGroupName(group.group_name);
    setIsOpenSelect(false);
  };

  const getData = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");

      const result = await axios(
        `${SERVER}/group/quick?user_id=${dataFetch.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newAllApparatus = result.data.allApparatus.map((item) => {
        return {
          ...item,
          active: false,
        };
      });
      if (JSON.stringify(currentGroup) !== "{}") {
        const group = result.data.allGroup.find(
          (item) => item.id === currentGroup.id
        );
        setCurrentGroup(group);

        const filterGroupAparat = userAparats.map((item) => {
          if (
            group.apparatus.list.find((app) => app.apparatus_id === item.id)
          ) {
            return {
              ...item,
              active: true,
            };
          } else {
            return {
              ...item,
              active: false,
            };
          }
        });

        setUserAparats(filterGroupAparat);
        setUserGroups(result.data.allGroup);
        return;
      }
      setUserGroups(result.data.allGroup);
      setUserAparats(newAllApparatus);
    } catch (err) {
      console.log(err);
    }
  };

  const updateGroup = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");
      const updateAparats = userAparats.filter((item) => item.active);

      console.log(updateAparats);
      const result = await axios.put(
        `${SERVER}/group/device`,
        {
          group_name: currentGroup.group_name,
          update_name: newGroupName,
          user_id: dataFetch.id,
          update_apparatuses: updateAparats.map((item) => item.id),
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
          description: t(`Група оновлена`),
          type: "success",
          duration: 5000,
        });

        getData();
      }

      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createGroup = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");
      const apparatus = userAparats.filter((item) => item.active);

      if (apparatus.length === 0) {
        showMessage({
          message: t("Помилка"),
          description: t(`Ви не обрали апарати`),
          type: "danger",
          duration: 5000,
        });

        return;
      }
      if (!newGroupName) {
        showMessage({
          message: t("Помилка"),
          description: t(`Ви не дали назву групи`),
          type: "danger",
          duration: 5000,
        });
        return;
      }

      const result = await axios.post(
        `${SERVER}/group/device`,
        {
          group_name: newGroupName,
          user_id: dataFetch.id,
          apparatus: apparatus.map((item) => item.id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 201) {
        showMessage({
          message: t("Успіх"),
          description: t(`Група створена`),
          type: "success",
          duration: 5000,
        });

        getData();
        setNewGroupName("");
      }

      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGroup = async () => {
    try {
      const { dataFetch } = await useVerify();
      const token = await AsyncStorage.getItem("token");
      setIsOpenDeleteGroup(false);
      const result = await axios.delete(
        `${SERVER}/group/device?user_id=${dataFetch.id}&group_name=${currentGroup.group_name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: t(`Групу видалено`),
          type: "success",
          duration: 5000,
        });

        const newAllApparatus = userAparats.map((item) => {
          return {
            ...item,
            active: false,
          };
        });

        setUserGroups(userGroups.filter((item) => item.id !== currentGroup.id));
        setUserAparats(newAllApparatus);
        setCurrentGroup({});
        setNewGroupName("");
      }

      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkUser = async () => {
    const guard = await useGuard("group");
    if (!guard) {
      navigation.navigate("status-aparat");
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkUser();
      getData();
    }
  }, [isFocused]);
  return (
    <>
      <View style={styles.group}>
        <View style={styles.header}>
          <Logo />
          <Text style={styles.headerTitle}>{t("Редагування груп")}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsOpenMenu(true);
            }}
          >
            <MenuIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.groupBlock}>
          <View style={styles.groupSelect}>
            <View style={styles.groupSelectText}>
              <Text style={styles.groupSelectTextName}>{t("Назва групи")}</Text>
              <Text style={styles.groupSelectTextScore}>
                {t("Кількість апаратів")}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.groupSelectCurrent}
              onPress={() => setIsOpenSelect(!isOpenSelect)}
            >
              <View style={styles.groupSelectCurrentContent}>
                <Text style={styles.groupSelectCurrentContentName}>
                  {JSON.stringify(currentGroup) === "{}"
                    ? ""
                    : currentGroup.group_name}
                </Text>
                <Text style={styles.groupSelectCurrentContenttScore}>
                  {JSON.stringify(currentGroup) === "{}"
                    ? ""
                    : currentGroup.apparatus.length}
                </Text>
              </View>
              <View style={styles.groupSelectCurrentIconBlock}>
                <View style={styles.groupSelectCurrentIcon}>
                  <ArrowAparat />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.groupSelectModal(isOpenSelect)}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {userGroups.map((item) => (
                  <TouchableOpacity
                    style={styles.groupSelectModalItem}
                    onPress={() => changeCurrentGroup(item.id)}
                    key={item.id}
                  >
                    <Text style={styles.groupSelectModalItemName}>
                      {item.group_name}
                    </Text>
                    <Text style={styles.groupSelectModalItemScore}>
                      {item.apparatus.length}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.groupCreate()}>
            <Text style={styles.groupCreateTitle}>
              {t("Поле для створення нової групи")}
            </Text>

            <View style={styles.groupCreateInput}>
              <TextInput
                style={styles.groupCreateTextInput}
                placeholder={t("Введіть назву нової групи")}
                value={newGroupName}
                onChangeText={(value) => setNewGroupName(value)}
              />
            </View>

            <TouchableOpacity
              style={styles.groupCreateSubmit}
              onPress={() => {
                if (JSON.stringify(currentGroup) === "{}") {
                  createGroup();
                } else {
                  updateGroup();
                }
              }}
            >
              <Text style={styles.groupCreateSubmitText}>
                {JSON.stringify(currentGroup) === "{}"
                  ? t("Створити")
                  : t("Оновити групу")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.groupUpdate()}>
            <Text style={styles.groupCreateTitle}>{t("Обрана група")}</Text>

            <View style={styles.groupCreateInput}>
              <TextInput
                style={styles.groupCreateTextInput}
                placeholder={t("Обрана група")}
              />
            </View>

            <TouchableOpacity style={styles.groupCreateSubmit}>
              <Text style={styles.groupCreateSubmitText}>
                {t("Оновити групу")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.groupList}>
            {userAparats.map((item, index) => (
              <TouchableOpacity
                style={styles.groupListItem()}
                onPress={() => checkedGroup(item.id)}
                key={index}
              >
                <View style={styles.groupListItemChecked(item.active)}>
                  <Image
                    source={accept}
                    style={styles.groupListItemCheckedIcon(item.active)}
                  />
                </View>
                <Text style={styles.groupListItemText}>
                  {item.serial_number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {JSON.stringify(currentGroup) !== "{}" && (
            <TouchableOpacity
              style={styles.groupDelete}
              onPress={() => setIsOpenDeleteGroup(true)}
            >
              <Text style={styles.groupDeleteText}>{t("Видалити групу")}</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlashMessage position="top" />
        <View style={stylesAdmin.adminCreateErrorBlock(isOpenDeleteGroup)}>
          <View style={stylesAdmin.adminCreateError}>
            <Image source={errorIcon} style={stylesAdmin.adminCreateErrorImg} />

            <Text style={stylesAdmin.adminCreateErrorText}>
              {t("Ви впевнені, що хочете видалити групу")} “
              {currentGroup.group_name}”?
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={stylesAdmin.adminCreateErrorButton}
                onPress={() => setIsOpenDeleteGroup(false)}
              >
                <Text style={stylesAdmin.adminCreateErrorButtonText}>
                  {t("Назад")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...stylesAdmin.adminCreateErrorButton,
                  backgroundColor: "#C80000",
                }}
                onPress={deleteGroup}
              >
                <Text style={stylesAdmin.adminCreateErrorButtonText}>
                  {t("Видалити")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <MenuMobile open={isOpenMenu} current="group" closeFun={setIsOpenMenu} />
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default Group;
