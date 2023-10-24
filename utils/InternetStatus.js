import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Animated, Easing } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const InternetStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);

      // Анимация появления и исчезновения панели
      Animated.timing(animation, {
        toValue: state.isConnected ? 0 : 1,
        duration: 300, // Длительность анимации в миллисекундах
        easing: Easing.linear, // Функция времени (easing)
        useNativeDriver: false, // Использование нативного драйвера для анимации
      }).start(); // Запуск анимации
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 62], // Панель будет выезжать с верхней грани и скрываться наверх
  });

  return (
    <>
      <Animated.View
        style={[styles.notificationBlock, { transform: [{ translateY }] }]}
      >
        <View style={styles.notification}>
          <Text style={styles.notificationText}>
            Перевірте з’єднання з інтернетом.
          </Text>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  notificationBlock: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 300,
    paddingHorizontal: 20,
  },
  notification: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 15,
    borderColor: "#FFA800",
    borderWidth: 3,
    backgroundColor: "#F4F4F4",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  notificationText: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 17,
    fontWeight: "400",
  },
});

export default InternetStatus;
