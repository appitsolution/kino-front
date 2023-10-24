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
import Arrow from "../../assets/icons/Arrow";
import errorIcon from "../../assets/images/delete.png";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../constants/async";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import useVerify from "../../components/hooks/useVerify";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminCreateUser = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const [selectedRole, setSelectedRole] = useState({});
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [acceptPassword, setAcceptPassword] = useState("");

  const checkRole = {
    SUPER_ADMIN: [
      { label: t("Дилер"), value: "DEALER" },
      { label: t("ОСО"), value: "OPERATOR" },
      { label: t("Клієнт"), value: "CLIENT" },
      { label: t("Адміністратор"), value: "ADMIN" },
      { label: t("Менеджер"), value: "MANAGER" },
    ],
    DEALER: [
      { label: t("ОСО"), value: "OPERATOR" },
      { label: t("Клієнт"), value: "CLIENT" },
    ],
    CLIENT: [{ label: t("Адміністратор"), value: "ADMIN" }],
    ADMIN: [{ label: t("Менеджер"), value: "MANAGER" }],
  };

  const [data, setData] = useState([]);

  const createUser = async () => {
    if (JSON.stringify(selectedRole) === "{}") return;
    if (!login || !password || !acceptPassword) {
      showMessage({
        message: t("Помилка"),
        description: t("Введіть всі обов’язкові поля(поля помічені *)"),
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

      const result = await axios.post(
        `${SERVER}/auth/register`,
        {
          role: selectedRole.value,
          login: login,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = login;
      if (result.data.code === 409) {
        showMessage({
          message: t("Помилка"),
          description: t("userExists", { user }),
          type: "danger",
          duration: 3000,
        });
      }

      if (result.data.code === 201) {
        showMessage({
          message: t("Успіх"),
          description: t("createUser", { user }),
          type: "success",
        });
        setSelectedRole({});
        setLogin("");
        setPassword("");
        setAcceptPassword("");
        setTimeout(() => {
          navigation.navigate("admin");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkUser = async () => {
    const { verify, dataFetch } = await useVerify();
    setData(checkRole[dataFetch.role]);
  };

  useEffect(() => {
    if (isFocused) {
      checkUser();
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
          <TouchableOpacity>
            <MenuIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.adminCreateBlock}>
          <KeyboardAwareScrollView>
            <View style={styles.adminCreateForm}>
              <Text style={styles.adminCreateWarning}>
                {t("* обов’язкові до заповнення поля")}
              </Text>

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
                  {t("Роль")}:
                </Text>
                <View style={styles.adminCreateRole}>
                  <View style={styles.adminCreateRoleCurrent}>
                    <Text style={styles.adminCreateRoleCurrentText}>
                      {selectedRole.label}
                    </Text>
                    <Arrow />
                  </View>

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
                    onChange={(selected) => {
                      setSelectedRole(selected);
                    }}
                    selectedTextStyle={{ display: "none" }}
                    iconStyle={{ display: "none" }}
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
                  {t("Логін")}:
                </Text>
                <View style={styles.adminCreateInput}>
                  <TextInput
                    value={login}
                    onChangeText={(value) => setLogin(value)}
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
                  onPress={createUser}
                >
                  <Text style={styles.adminCreateSubmitText}>
                    {t("Створити")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.adminCreateErrorBlock()}>
          <View style={styles.adminCreateError}>
            <Image source={errorIcon} style={styles.adminCreateErrorImg} />

            <Text style={styles.adminCreateErrorText}>
              Такий **** вже існує
            </Text>

            <TouchableOpacity style={styles.adminCreateErrorButton}>
              <Text style={styles.adminCreateErrorButtonText}>Назад</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlashMessage position="top" />
      </View>
    </>
  );
};

export default AdminCreateUser;
