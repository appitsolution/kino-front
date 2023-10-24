import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  group: {
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
  groupBlock: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  groupSelect: {
    position: "relative",
    zIndex: 3,
  },

  groupSelectText: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  groupSelectTextName: {
    color: "#FFF",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
  },

  groupSelectTextScore: {
    color: "#FFF",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
  groupSelectCurrent: {
    borderRadius: 16,
    backgroundColor: "white",
    height: 60,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  groupSelectCurrentContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },

  groupSelectCurrentContentName: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 20,
    fontWeight: "400",
  },

  groupSelectCurrentContenttScore: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 20,
    fontWeight: "400",
  },

  groupSelectCurrentIconBlock: {
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
  groupSelectCurrentIcon: {
    transform: [{ rotate: "-90deg" }],
  },
  groupSelectModal: (active = false) => {
    return {
      display: active ? "flex" : "none",
      opacity: active ? 1 : 0,
      position: "absolute",
      top: "110%",
      left: 0,
      backgroundColor: "white",
      width: "100%",
      maxHeight: 280,
      overflow: "hidden",

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

  groupSelectModalItem: {
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
    paddingVertical: 15,
    paddingHorizontal: 30,
  },

  groupSelectModalItemName: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
  },

  groupSelectModalItemScore: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
  },

  groupCreate: (active = true) => {
    return {
      display: active ? "flex" : "none",
      marginTop: 21,
    };
  },

  groupCreateTextInput: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },

  groupUpdate: (active = false) => {
    return {
      display: active ? "flex" : "none",
      marginTop: 21,
    };
  },
  groupCreateTitle: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  groupCreateInput: {
    borderRadius: 16,
    backgroundColor: "#FFF",
    paddingHorizontal: 21,
    paddingVertical: 20,
  },

  groupCreateSubmit: {
    borderRadius: 25,
    backgroundColor: "#FFA800",
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    marginTop: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  groupCreateSubmitText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 24,
    fontWeight: "700",
  },
  groupList: {
    marginTop: 35,
    flexDirection: "row",
    // justifyContent: "space-between",
    flexWrap: "wrap",
  },

  groupListItem: (first = true) => {
    return {
      width: "50%",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: first ? 10 : 0,
    };
  },

  groupListItemChecked: (active = false) => {
    return {
      justifyContent: "center",
      alignItems: "center",
      width: 30,
      height: 30,
      backgroundColor: active ? "#FFA800" : "white",
      borderRadius: 7,
      marginRight: 10,
    };
  },

  groupListItemCheckedIcon: (active = false) => {
    return {
      display: active ? "flex" : "none",
    };
  },

  groupListItemText: {
    color: "#FFF",
    fontFamily: "FiraSans-Medium",
    fontSize: 20,
    fontWeight: "500",
  },

  groupDelete: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#C80000",
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    marginTop: 70,
  },
  groupDeleteText: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 24,
    fontWeight: "700",
  },
});

export default styles;
