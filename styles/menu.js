import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menu: (open = false) => {
    return {
      display: open ? "flex" : "none",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.80)",
      paddingTop: 80,
    };
  },

  menuCloseBlock: {
    alignItems: "flex-end",
    paddingHorizontal: 40,
  },

  menuClose: {},

  menuText: (active = false) => {
    return {
      color: active ? "#FFA800" : "#FFF",
      fontFamily: "Evolventa-Bold",
      fontSize: 36,
      fontWeight: "700",
      paddingLeft: 12,
    };
  },

  menuItem: (last = false) => {
    return {
      marginBottom: last ? 0 : 25,
    };
  },

  menuList: {
    marginTop: 40,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  menuLang: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuLangIcon: {
    marginRight: 15,
  },

  menuLangCurrent: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 36,
    fontWeight: "700",
  },
});

export default styles;
