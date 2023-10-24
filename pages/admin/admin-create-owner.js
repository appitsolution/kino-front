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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../constants/async";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";

const AdminCreateOwner = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [owner, setOwner] = useState("");

  const createOwner = async () => {
    if (!owner) {
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
      const result = await axios.post(
        `${SERVER}/admininstration/owner`,
        {
          owner: owner,
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
          description: t(`ownerExists`, { owner }),
          type: "danger",
          duration: 3000,
        });
      }

      if (result.data.code === 201) {
        showMessage({
          message: t("Успіх"),
          description: t("createOwner", { owner }),
          type: "success",
        });

        setOwner("");

        setTimeout(() => {
          navigation.navigate("admin");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                {t("Власник")}:
              </Text>
              <View style={styles.adminCreateInput}>
                <TextInput
                  value={owner}
                  onChangeText={(value) => setOwner(value)}
                />
              </View>
            </View>

            <View style={styles.adminCreateSubmit}>
              <TouchableOpacity
                style={styles.adminCreateSubmitButton}
                onPress={createOwner}
              >
                <Text style={styles.adminCreateSubmitText}>
                  {t("Створити")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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

export default AdminCreateOwner;
