import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  aboutAparat: {
    paddingTop: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#202124",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 28,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 26,
    fontWeight: "700",
  },
  aboutAparatBlock: {
    paddingHorizontal: 10,
    marginTop: 30,
  },

  aboutAparatSelect: {
    position: "relative",
    zIndex: 3,
  },

  aboutAparatSelectText: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  aboutAparatSelectTextName: {
    color: "#FFF",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
  },

  aboutAparatSelectTextScore: {
    color: "#FFF",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
  aboutAparatSelectCurrent: {
    borderRadius: 16,
    backgroundColor: "white",
    height: 60,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  aboutAparatSelectCurrentContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },

  aboutAparatSelectCurrentContentName: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 13,
    fontWeight: "400",
  },

  aboutAparatSelectCurrentContenttScore: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 13,
    fontWeight: "400",
  },

  aboutAparatSelectCurrentIconBlock: {
    width: "20%",
    backgroundColor: "#FFA800",
    width: 45,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 16,
    borderTopEndRadius: 16,
    borderBottomRightRadius: 16,
  },
  aboutAparatSelectCurrentIcon: (active = false) => {
    return {
      transform: [{ rotate: active ? "90deg" : "-90deg" }],
    };
  },
  aboutAparatSelectModal: (active = false) => {
    return {
      display: active ? "flex" : "none",
      opacity: active ? 1 : 0,
      position: "absolute",
      top: "110%",
      left: 0,
      backgroundColor: "white",
      width: "100%",
      // height: "100%",

      borderRadius: 21,
      borderWidth: 1,
      borderColor: "#FFF",
      backgroundColor: "#FFF",

      elevation: 4,
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 16,
      zIndex: 3,
    };
  },

  aboutAparatSelectModalItem: {
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#FFF",
    backgroundColor: "#F5F5F5",

    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.00)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },

  aboutAparatSelectModalItemName: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 13,
    fontWeight: "400",
  },

  aboutAparatSelectModalItemScore: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 13,
    fontWeight: "400",
  },

  aboutAparatStatTabs: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    zIndex: 1,
  },
  aboutAparatStatTabsItem: (active = false) => {
    if (active) {
      return {
        marginRight: 10,
        flex: 4,
        height: 46,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopColor: "#FFA800",
        borderTopWidth: 5,
        borderRightColor: "#FFA800",
        borderRightWidth: 5,
        borderLeftColor: "#FFA800",
        borderLeftWidth: 5,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "white",
        borderBottomWidth: 5,
        borderBottomEndRadius: 0,
      };
    } else {
      return {
        marginRight: 10,
        flex: 4,
        height: 46,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        // borderTopColor: "white",
        // borderTopWidth: 5,
        // borderRightColor: "white",
        // borderRightWidth: 5,
        // borderLeftColor: "white",
        // borderLeftWidth: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderBottomEndRadius: 5,
        borderBottomColor: "#FFA800",
        borderBottomWidth: 5,
        borderBottomEndRadius: 0,
      };
    }
  },
  aboutAparatStatTabsItemText: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 11,
    fontWeight: "400",
    textAlign: "center",
  },
  aboutAparatStatInfo: {
    borderColor: "#FFA800",
    borderWidth: 5,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 0,

    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  aboutAparatStatInformation: (active = false) => {
    return {
      display: active ? "flex" : "none",
    };
  },

  aboutAparatStatComplectation: (active = false) => {
    return {
      display: active ? "flex" : "none",
    };
  },

  aboutAparatStatService: (active = false) => {
    return {
      display: active ? "flex" : "none",
    };
  },
  aboutAparatStatControl: (active = false) => {
    return {
      display: active ? "flex" : "none",
    };
  },

  aboutAparatStatInfoItem: (first = false) => {
    if (first) {
      return {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      };
    } else {
      return {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
      };
    }
  },

  aboutAparatStatInfoItemLabel: {
    color: "#C5C5C5",
    fontFamily: "FiraSans-Medium",
    fontSize: 12,
    fontWeight: "500",
  },

  aboutAparatStatInfoItemUpdateBlock: {
    flex: 3.5,
  },

  aboutAparatStatInfoItemUpdate: (active = false, flexEnd = "center") => {
    return {
      flex: 1,
      position: "relative",
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "black",
      paddingHorizontal: active ? 0 : 5,
      paddingVertical: active ? 0 : 5,
      marginRight: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: flexEnd,
    };
  },

  aboutAparatStatInfoItemUpdateInput: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },

  aboutAparatStatInfoItemTitle: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 13,
    fontWeight: "500",
    flex: 3,
  },

  aboutAparatStatInfoItemValue: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 13,
    fontWeight: "500",
  },

  aboutAparatStatInfoItemButton: {
    borderRadius: 16,
    backgroundColor: "#FFA800",
    justifyContent: "center",
    alignItems: "center",
    width: 57,
    height: 42,
  },

  aboutAparatStatInfoItemUpdateDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  aboutAparatStatComplectationBlock: {
    flexDirection: "row",
    alignItems: "center",
  },

  aboutAparatStatComplectationBlockTitle: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 13,
    fontWeight: "500",
    flex: 3,
    marginRight: 10,
  },

  aboutAparatStatComplectationBlockButton: (last = false) => {
    return {
      flex: 3,
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: "#FFA800",
      paddingVertical: 9,
      marginRight: last ? 0 : 10,
    };
  },
  aboutAparatStatComplectationBlockButtonText: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 13,
    fontWeight: "500",
  },

  aboutAparatStatComplectationBlockInput: {
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    alignItems: "center",
    flex: 3,
    marginRight: 10,
  },
});

export default styles;
