import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import LogoBackground from "../assets/icons/LogoBackground";
import styles from "../styles/home";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../constants/async";
import AsyncStorage from "@react-native-async-storage/async-storage";
import checkboxIcon from "../assets/images/accept.png";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PasswordIcon from "../assets/icons/PasswordIcon";
import { useTranslation } from "react-i18next";
import useGuard from "../components/hooks/useGuard";
import NotificationService from "../utils/notification-services";
import useVerify from "../components/hooks/useVerify";
import InternetStatus from "../utils/InternetStatus";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const checkUser = async () => {
    const { verify } = await useVerify();
    if (verify) {
      navigation.navigate("status-aparat");
    }
  };
  useEffect(() => {
    if (isFocused) {
      checkUser();
    }
  }, [isFocused]);

  const loginUser = async () => {
    try {
      const result = await axios.post(`${SERVER}/auth/login`, {
        login: login,
        password: password,
      });

      const tokenNotification = await registerForPushNotificationsAsync();

      if (result.data.code !== 200) {
        return setErrorLogin(true);
      }

      await AsyncStorage.setItem("token", result.data.token);

      if (tokenNotification) {
        const { dataFetch } = await useVerify();

        await axios.post(
          `${SERVER}/notification/register?user_id=${dataFetch.id}&token=${tokenNotification}`
        );
      }

      const checkLastError = await axios(`${SERVER}/error/start`);

      await AsyncStorage.setItem("lastIdError", `${checkLastError.data}`);

      navigation.navigate("status-aparat");
    } catch (err) {
      console.log(err);
      return setErrorLogin(true);
    }
  };

  const checkboxChecked = async () => {
    await AsyncStorage.setItem("saveMe", JSON.stringify(!isChecked));

    setIsChecked(!isChecked);
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
    } else {
      // alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  return (
    <>
      <View style={styles.home}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={50}
          style={{ zIndex: 2 }}
          contentContainerStyle={styles.form}
        >
          <View>
            <Text style={styles.title}>{t("Авторизація")}</Text>
          </View>
          <View style={styles.login(errorLogin)}>
            <TextInput
              style={styles.loginInput}
              placeholderTextColor="#B50000"
              placeholder={t("Логін")}
              value={login}
              onChangeText={(value) => setLogin(value)}
              onFocus={() => setErrorLogin(false)}
            />
          </View>
          <View style={styles.password(errorLogin)}>
            <TextInput
              style={styles.passwordInput}
              placeholderTextColor="#B50000"
              placeholder={t("Пароль")}
              secureTextEntry={!passwordShow}
              value={password}
              onChangeText={(value) => setPassword(value)}
              onFocus={() => setErrorLogin(false)}
            />
            <TouchableOpacity
              onPress={() => setPasswordShow(!passwordShow)}
              style={{ position: "absolute", top: 12, right: 18 }}
            >
              <PasswordIcon />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.checkbox} onPress={checkboxChecked}>
            <View style={styles.checkboxDecor}>
              {isChecked && (
                <>
                  <Image
                    source={checkboxIcon}
                    style={{ width: 16, height: 16 }}
                  />
                </>
              )}
            </View>
            <Text style={styles.checkboxText}>{t("Запам’ятати мене")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submit} onPress={loginUser}>
            <Text style={styles.submitText}>{t("Авторизуватись")}</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <View style={styles.logoBackground}>
          <LogoBackground />
        </View>
      </View>
      <InternetStatus />
      <NotificationService />
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default Home;
