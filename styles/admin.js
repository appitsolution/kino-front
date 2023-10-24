import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  admin: {
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

  tabs: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 13,
  },

  tabsButtons: {
    flexDirection: "row",
  },
  tabsButton: (active = false, last = false) => {
    if (active) {
      return {
        borderRadius: 32.973,
        backgroundColor: "#FFA800",
        elevation: 2,
        shadowColor: "rgba(0, 0, 0, 0.18)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5.27568,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: last ? 0 : 10,
        alignItems: "center",
        flexDirection: "row",
      };
    } else {
      return {
        borderRadius: 32.973,
        backgroundColor: "#BFBFBF",
        elevation: 2,
        shadowColor: "rgba(0, 0, 0, 0.18)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5.27568,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: last ? 0 : 10,
        alignItems: "center",
        flexDirection: "row",
      };
    }
  },
  tabsButtonText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 15.827,
    fontWeight: "700",
  },

  tabsPlus: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#FFA800",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabsPlusText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "FiraSans-Regular",
    fontSize: 30,
    fontWeight: "400",
    lineHeight: 30,
  },

  searchBlock: {
    paddingHorizontal: 13,
  },

  search: {
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#FFA800",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  searchIcon: {
    marginLeft: "auto",
  },

  users: {
    paddingHorizontal: 13,
    marginTop: 15,
  },

  owners: {
    paddingHorizontal: 13,
    marginTop: 15,
  },

  usersItem: (last = false) => {
    return {
      borderRadius: 16,
      backgroundColor: "#FFF",
      marginBottom: last ? 0 : 8,
      paddingHorizontal: 21,
      paddingVertical: 16,
      height: 56,
    };
  },

  usersText: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 20,
    fontWeight: "400",
  },

  //   ADMIN CREATE USER

  adminCreate: {
    paddingTop: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#202124",
  },

  adminCreateBlock: {
    paddingHorizontal: 13,
  },

  adminCreateForm: {
    borderRadius: 16,
    borderWidth: 5,
    borderColor: "#FFA800",
    backgroundColor: "#FFF",
    paddingHorizontal: 31,
    paddingVertical: 21,
    marginTop: 30,
  },

  adminCreateWarning: {
    textAlign: "center",
    color: "#A5A5A5",
    fontFamily: "FiraSans-Medium",
    fontSize: 12,
    fontWeight: "500",
  },

  adminCreateLabel: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 16,
    fontWeight: "500",
  },

  adminCreateRole: {
    position: "relative",
  },

  adminCreateRoleCurrent: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
  },

  adminCreateRoleCurrentText: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 16,
    fontWeight: "500",
  },

  adminCreateRoleSelect: {
    display: "none",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 100,
    backgroundColor: "white",
  },

  adminCreateInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 5,
  },

  adminCreateWrapper: {
    marginTop: 16,
  },

  adminCreateSubmit: {
    alignItems: "center",
    marginTop: 25,
  },

  adminCreateSubmitButton: {
    borderRadius: 25,
    paddingHorizontal: 60,
    paddingVertical: 5,
    backgroundColor: "#FFA800",
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },

  adminCreateSubmitText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 20,
    fontWeight: "700",
  },

  adminCreateErrorBlock: (active = false) => {
    return {
      display: active ? "flex" : "none",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: `rgba(0, 0, 0, 0.80)`,
    };
  },

  adminCreateError: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#FFF",
    padding: 30,
    paddingHorizontal: 10,
  },

  adminCreateErrorImg: {
    marginBottom: 36,
  },

  adminCreateErrorText: {
    marginBottom: 36,
    color: "#000",
    textAlign: "center",
    fontFamily: "Evolventa-Regular",
    fontSize: 20,
    fontWeight: "400",
  },

  adminCreateErrorButton: {
    // paddingHorizontal: 50,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: "#434343",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },

  adminCreateErrorButtonText: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
  },

  adminCreateCurrent: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#FFA800",
  },

  adminCreateCurrentSecond: {
    marginTop: 15,
    textAlign: "center",
    color: "#000",
    fontFamily: "FiraSans-Medium",
    fontSize: 16,
    fontWeight: "500",
  },

  adminCreateCurrentSpan: {
    marginTop: 15,
    textAlign: "center",
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
  },

  adminCreateTrash: {
    position: "absolute",
    top: 17,
    right: 17,
  },
});

export default styles;
