import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import styles from "../../styles/admin";
import ArrowBack from "../../assets/icons/ArrowBack";
import MenuIcon from "../../assets/icons/MenuIcon";
import errorIcon from "../../assets/images/delete.png";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import trash from "../../assets/images/trash.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../constants/async";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import MenuMobile from "../../components/Menu";
import useVerify from "../../components/hooks/useVerify";

const AdminUpdateUser = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const { t } = useTranslation();
  const { id } = route.params;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [acceptPassword, setAcceptPassword] = useState("");

  const [isOpenDelete, setOpenDelete] = useState(false);

  const updateUser = async () => {
    if (!password || !acceptPassword) {
      showMessage({
        message: t("Помилка"),
        description: t(`Введіть всі обов’язкові поля(поля помічені *)`),
        type: "danger",
        duration: 5000,
      });
      return;
    }

    if (password !== acceptPassword) {
      showMessage({
        message: t("Помилка"),
        description: t(`Пароль не збігається`),
        type: "danger",
        duration: 5000,
      });

      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const result = await axios.put(
        `${SERVER}/admininstration/user`,
        {
          login: user.username,
          newPassword: password,
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
          description: t(`Пароль змінено`),
          type: "success",
          duration: 5000,
        });

        setAcceptPassword("");
        setPassword("");

        setTimeout(() => {
          navigation.navigate("admin");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async () => {
    try {
      setOpenDelete(false);
      const token = await AsyncStorage.getItem("token");

      const result = await axios.delete(`${SERVER}/admininstration/user`, {
        data: { login: user.username },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: t("userDelete", { user: user.username }),
          type: "success",
          duration: 5000,
        });

        setTimeout(() => {
          navigation.navigate("admin");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setOpenDelete(false);
      navigation.navigate("admin");
    }
  };

  const getUser = async () => {
    try {
      const { dataFetch, verify } = await useVerify();
      if (!verify) navigation.navigate("home");
      const token = await AsyncStorage.getItem("token");
      const result = await axios(
        `${SERVER}/admininstration/quick?user_id=${dataFetch.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const currentUser = result.data.users.find((item) => item.id === id);

      if (currentUser) {
        setUser(currentUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);
  return (
    <>
      <View style={styles.adminCreate}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("admin")}>
            <ArrowBack />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("Адміністрування")}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsOpenMenu(true);
            }}
          >
            <MenuIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.adminCreateBlock}>
          <View style={styles.adminCreateForm}>
            <Text style={styles.adminCreateWarning}>
              {t("* обов’язкові до заповнення поля")}
            </Text>

            <View style={{ alignItems: "center" }}>
              <View style={styles.adminCreateCurrent}>
                <Text style={styles.adminCreateCurrentSecond}>
                  {t("Логін")}:{" "}
                </Text>
                <Text style={styles.adminCreateCurrentSpan}>
                  {JSON.stringify(user) !== "{}" ? " " + user.username : ""}
                </Text>
              </View>
            </View>

            <View style={styles.adminCreateWrapper}>
              <Text style={styles.adminCreateLabel}>
                <Text
                  style={{
                    color: "#B50000",
                    fontFamily: "FiraSans-Medium",
                    fontSize: 20,
                    fontWeight: "500",
                    marginRight: 5,
                  }}
                >
                  *
                </Text>
                {t("Пароль")}:
              </Text>
              <View style={styles.adminCreateInput}>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                />
              </View>
            </View>

            <View style={styles.adminCreateWrapper}>
              <Text style={styles.adminCreateLabel}>
                <Text
                  style={{
                    color: "#B50000",
                    fontFamily: "FiraSans-Medium",
                    fontSize: 20,
                    fontWeight: "500",
                    marginRight: 5,
                  }}
                >
                  *
                </Text>
                {t("Повторіть пароль")}:
              </Text>
              <View style={styles.adminCreateInput}>
                <TextInput
                  secureTextEntry={true}
                  value={acceptPassword}
                  onChangeText={(value) => setAcceptPassword(value)}
                />
              </View>
            </View>

            <View style={styles.adminCreateSubmit}>
              <TouchableOpacity
                style={styles.adminCreateSubmitButton}
                onPress={updateUser}
              >
                <Text style={styles.adminCreateSubmitText}>{t("Оновити")}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.adminCreateTrash}
              onPress={() => setOpenDelete(true)}
            >
              <Image source={trash} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.adminCreateErrorBlock(isOpenDelete)}>
          <View style={styles.adminCreateError}>
            <View style={{ marginBottom: 36 }}>
              <Image source={errorIcon} />
            </View>

            <Text style={styles.adminCreateErrorText}>
              {t("Підтвердіть дію")}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.adminCreateErrorButton}
                onPress={() => setOpenDelete(false)}
              >
                <Text style={styles.adminCreateErrorButtonText}>
                  {t("Назад")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.adminCreateErrorButton,
                  backgroundColor: "#067841",
                }}
                onPress={deleteUser}
              >
                <Text style={styles.adminCreateErrorButtonText}>
                  {t("Підтвердити")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlashMessage position="top" />
      </View>
      <MenuMobile open={isOpenMenu} current="admin" closeFun={setIsOpenMenu} />
    </>
  );
};

export default AdminUpdateUser;
