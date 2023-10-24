import { View, Text, TouchableOpacity, Image } from "react-native";
import Close from "../assets/icons/Close";
import styles from "../styles/menu";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import LangIcon from "../assets/icons/Lang";
import out from "../assets/images/out.png";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGuard from "./hooks/useGuard";

const MenuMobile = ({ open = false, current = "statistics", closeFun }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("ua");

  const closeMenu = () => {
    closeFun();
  };

  const logOut = async () => {
    await AsyncStorage.setItem("token", "");
    closeMenu();
    navigation.navigate("home");
  };

  const changeLang = async () => {
    const lang = await AsyncStorage.getItem("lang");
    if (!lang) {
      await AsyncStorage.setItem("lang", currentLang === "ua" ? "en" : "ua");

      i18n.changeLanguage(currentLang === "ua" ? "en" : "ua");
      setCurrentLang(currentLang === "ua" ? "en" : "ua");
      return;
    }

    await AsyncStorage.setItem("lang", currentLang === "ua" ? "en" : "ua");
    i18n.changeLanguage(currentLang === "ua" ? "en" : "ua");
    setCurrentLang(currentLang === "ua" ? "en" : "ua");
  };

  const checkLang = async () => {
    const currentLang = await AsyncStorage.getItem("lang");
    if (!currentLang) {
      await AsyncStorage.setItem("lang", "ua");
      return;
    }
    i18n.changeLanguage(currentLang);
    setCurrentLang(currentLang);
  };

  const [guardList, setGuardList] = useState([]);

  const checkGuard = async () => {
    const listPath = [
      "admin",
      "status-aparat",
      "statistics",
      "about-aparat",
      "group",
    ];

    const guardListNew = await Promise.all(
      listPath.map(async (item) => {
        const guard = await useGuard(item);

        return {
          path: item,
          accept: guard,
        };
      })
    );

    setGuardList(guardListNew);
  };

  useEffect(() => {
    if (isFocused) {
      checkLang();
      checkGuard();
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.menu(open)}>
        <View style={styles.menuCloseBlock}>
          <TouchableOpacity
            style={styles.menuClose}
            onPress={() => {
              closeMenu();
            }}
          >
            <Close />
          </TouchableOpacity>
        </View>
        <View style={styles.menuList}>
          <TouchableOpacity
            style={{
              ...styles.menuItem(),
              display:
                guardList.length === 0
                  ? "none"
                  : guardList.find((item) => item.path === "admin").accept
                  ? "flex"
                  : "none",
            }}
            onPress={() => {
              navigation.navigate("admin");
              closeFun();
            }}
          >
            <Text style={styles.menuText(current === "admin")}>
              {t("Адміністрування")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.menuItem(),
              display:
                guardList.length === 0
                  ? "none"
                  : guardList.find((item) => item.path === "status-aparat")
                      .accept
                  ? "flex"
                  : "none",
            }}
            onPress={() => {
              navigation.navigate("status-aparat");
              closeFun();
            }}
          >
            <Text style={styles.menuText(current === "status-aparat")}>
              {t("Стан апаратів")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.menuItem(),
              display:
                guardList.length === 0
                  ? "none"
                  : guardList.find((item) => item.path === "statistics").accept
                  ? "flex"
                  : "none",
            }}
            onPress={() => {
              navigation.navigate("statistics");
              closeFun();
            }}
          >
            <Text style={styles.menuText(current === "statistics")}>
              {t("Статистика")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.menuItem(),
              display:
                guardList.length === 0
                  ? "none"
                  : guardList.find((item) => item.path === "about-aparat")
                      .accept
                  ? "flex"
                  : "none",
            }}
            onPress={() => {
              navigation.navigate("about-aparat");
              closeFun();
            }}
          >
            <Text style={styles.menuText(current === "about-aparat")}>
              {t("Про апарати")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.menuItem(),
              display:
                guardList.length === 0
                  ? "none"
                  : guardList.find((item) => item.path === "group").accept
                  ? "flex"
                  : "none",
            }}
            onPress={() => {
              navigation.navigate("group");
              closeFun();
            }}
          >
            <Text style={styles.menuText(current === "group")}>
              {t("Редагування груп")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.menuLang} onPress={changeLang}>
            <View style={styles.menuLangIcon}>
              <LangIcon lang={currentLang} />
            </View>
            <Text style={styles.menuLangCurrent}>
              {currentLang.toUpperCase()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuOut} onPress={logOut}>
            <Image source={out} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MenuMobile;
