import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#202124",
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 40,
  },
  logoBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0.8,
  },
  form: {
    marginTop: "auto",
    marginBottom: 125,
    zIndex: 2,
    paddingHorizontal: 30,
  },
  login: (error = false) => {
    return {
      borderWidth: 3,
      borderColor: error ? "#B50000" : "transparent",
      borderRadius: 16,
      backgroundColor: "#F4F4F4",
      marginBottom: 40,
      paddingHorizontal: 30,
      paddingVertical: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    };
  },
  loginInput: {
    color: "#B50000",
    fontSize: 20,
    fontWeight: "400",
  },
  password: (error = false) => {
    return {
      borderWidth: 3,
      borderColor: error ? "#B50000" : "transparent",
      borderRadius: 16,
      backgroundColor: "#F4F4F4",
      marginBottom: 35,
      paddingHorizontal: 30,
      paddingVertical: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    };
  },

  passwordInput: {
    color: "#B50000",
    fontFamily: "FiraSans-Regular",
    fontSize: 20,
    fontWeight: "400",
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 25,
  },

  checkboxDecor: {
    justifyContent: "center",
    alignItems: "center",
    width: 16,
    height: 16,
    borderColor: "#FFA800",
    borderWidth: 1,
    backgroundColor: "#F4F4F4",
  },
  checkboxText: {
    color: "#FFF",
    fontFamily: "FiraSans-Regular",
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 10,
  },

  submit: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#FFA800",
    paddingVertical: 11,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  submitText: {
    color: "#F4F4F4",
    fontFamily: "Evolventa-Bold",
    fontSize: 24,
    fontWeight: "700",
  },
});

export default styles;
