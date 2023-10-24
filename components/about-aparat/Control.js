import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles/about-aparat";
import axios from "axios";
import { SERVER } from "../../constants/async";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useVerify from "../hooks/useVerify";
import useGuard from "../hooks/useGuard";

const Control = ({ isActiveTab = false, serial_number, showMessage }) => {
  const [currentTimePreparation, setCurrentTimePreparation] = useState("");
  const [currentTimeFill, setCurrentTimeFill] = useState("");

  const [currentTemperature, setCurrentTemperature] = useState("");

  const { t } = useTranslation();
  const openWindow = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "window,1;",
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
          description: t("Вікно відчинене"),
          type: "success",
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
  const closeWindow = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "window,0;",
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
          description: t("Вікно закрите"),
          type: "success",
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

  const onTelegram = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "sendToBot,1;",
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
          description: t("Бот включений"),
          type: "success",
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
  const offTelegram = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "sendToBot,0;",
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
          description: t("Бот вимкнено"),
          type: "success",
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

  const onPopcorn = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "startLoading;",
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
          description: t("Завантаження попкорну включено"),
          type: "success",
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
  const offPopcorn = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "stopLoading;",
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
          description: t("Завантаження попкорну вимкнено"),
          type: "success",
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

  const timePreparation = async () => {
    if (!currentTimePreparation) return;
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: `setIssuanceTime,${currentTimePreparation};`,
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
          description: t(`Час приготування оновлено`),
          type: "success",
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

  const timeFill = async () => {
    if (!currentTimeFill) return;
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: `setCornLoadTime,${currentTimeFill};`,
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
          description: t(`Час заправки оновлено`),
          type: "success",
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
  const setTemperature = async () => {
    if (!currentTemperature) return;
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: `setTemperature,${currentTemperature};`,
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
          description: t(`Температура оновлено`),
          type: "success",
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

  const onSleep = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "HolidayPage,1;",
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
          description: t("Режим сну увімкнено"),
          type: "success",
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
  const offSleep = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: "HolidayPage,0;",
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
          description: t("Режим сну вимкнено"),
          type: "success",
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

  const reset = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: `reset;`,
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
          description: t(`Апарат скинуто`),
          type: "success",
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

  const reboot = async () => {
    const guardCheckControlEdit = await useGuard("about-aparat/control/edit");
    if (!guardCheckControlEdit) {
      accessNot();
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await axios.post(
        `${SERVER}/about-devices/devices`,
        {
          serial_number: serial_number,
          value: `reset;`,
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
          description: t(`Апарат перезапущено`),
          type: "success",
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

  const accessNot = () => {
    showMessage({
      message: t("Помилка"),
      description: t(`У вас немає прав`),
      type: "danger",
      duration: 5000,
    });
  };

  return (
    <View style={styles.aboutAparatStatControl(isActiveTab === "control")}>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Віконце видачі")}:
          </Text>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton()}
            onPress={openWindow}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Відкрити")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={closeWindow}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Закрити")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            Telegram bot:
          </Text>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton()}
            onPress={onTelegram}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Увімкнено")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={offTelegram}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Вимкнено")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Завантаження попкорну")}:
          </Text>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton()}
            onPress={onPopcorn}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Увімкнено")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={offPopcorn}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Вимкнено")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Час приготування")}:
          </Text>
          <View style={styles.aboutAparatStatComplectationBlockInput}>
            <TextInput
              placeholder={t("введіть час")}
              keyboardType="number-pad"
              value={currentTimePreparation}
              onChangeText={(value) =>
                setCurrentTimePreparation(value.replace(/[^0-9]/g, ""))
              }
            />
          </View>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={timePreparation}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Оновити")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Час заправки")}:
          </Text>
          <View style={styles.aboutAparatStatComplectationBlockInput}>
            <TextInput
              placeholder={t("введіть час")}
              value={currentTimeFill}
              keyboardType="number-pad"
              onChangeText={(value) =>
                setCurrentTimeFill(value.replace(/[^0-9]/g, ""))
              }
            />
          </View>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={timeFill}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Оновити")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Встановити температуру")}:
          </Text>
          <View style={styles.aboutAparatStatComplectationBlockInput}>
            <TextInput
              // placeholder={t("введіть час")}
              keyboardType="number-pad"
              value={currentTemperature}
              onChangeText={(value) =>
                setCurrentTemperature(value.replace(/[^0-9]/g, ""))
              }
            />
          </View>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={setTemperature}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Оновити")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Режим сну")}:
          </Text>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton()}
            onPress={onSleep}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Сон")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={offSleep}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Робота")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Сброс")}:
          </Text>
          <View style={{ flex: 3 }}></View>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={reset}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Сброс")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutAparatStatInfoItem()}>
        <View style={styles.aboutAparatStatComplectationBlock}>
          <Text style={styles.aboutAparatStatComplectationBlockTitle}>
            {t("Перезапуск")}:
          </Text>
          <View style={{ flex: 3 }}></View>
          <TouchableOpacity
            style={styles.aboutAparatStatComplectationBlockButton(true)}
            onPress={reboot}
          >
            <Text style={styles.aboutAparatStatComplectationBlockButtonText}>
              {t("Перезапуск")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Control;
