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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from "../../constants/async";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import MenuMobile from "../../components/Menu";
import useVerify from "../../components/hooks/useVerify";

const AdminUpdateOwner = () => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [owner, setOwner] = useState({});
  const [newOwner, setNewOwner] = useState("");

  const [isOpenDelete, setOpenDelete] = useState(false);

  const updateOwner = async () => {
    if (!newOwner) {
      showMessage({
        message: t("Помилка"),
        description: t(`Введіть всі обов’язкові поля(поля помічені *)`),
        type: "danger",
        duration: 5000,
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const result = await axios.put(
        `${SERVER}/admininstration/owner`,
        {
          owner: owner.owner,
          newOwner: newOwner,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 409) {
        showMessage({
          message: t("Помилка"),
          description: t(`Такий власник вже є`),
          type: "danger",
          duration: 5000,
        });

        return;
      }

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: t(`Власника оновлено`),
          type: "success",
          duration: 5000,
        });

        setNewOwner("");
        setTimeout(() => {
          navigation.navigate("admin");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOwner = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.delete(`${SERVER}/admininstration/owner`, {
        data: { owner: owner.owner },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.data.code === 200) {
        showMessage({
          message: t("Успіх"),
          description: t("ownerDelete", { owner: owner.owner }),
          type: "success",
          duration: 2000,
        });

        setOpenDelete(false);

        setTimeout(() => {
          navigation.navigate("admin");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setOpenDelete(false);
      navigation.navigate("admin");
    }
  };

  const getOwner = async () => {
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

      const currentOwner = result.data.owners.find((item) => item.id === id);

      if (currentOwner) {
        setOwner(currentOwner);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getOwner();
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
                  {t("Власник")}:{" "}
                </Text>
                <Text style={styles.adminCreateCurrentSpan}>
                  {JSON.stringify(owner) === "{}" ? "" : owner.owner}
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
                {t("Нове значення")}:
              </Text>
              <View style={styles.adminCreateInput}>
                <TextInput
                  value={newOwner}
                  onChangeText={(value) => setNewOwner(value)}
                />
              </View>
            </View>

            <View style={styles.adminCreateSubmit}>
              <TouchableOpacity
                style={styles.adminCreateSubmitButton}
                onPress={updateOwner}
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
                onPress={deleteOwner}
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

export default AdminUpdateOwner;
