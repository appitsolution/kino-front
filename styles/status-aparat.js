import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  statusAparat: {
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

  statusAparatSearch: {
    marginBottom: 35,
    paddingHorizontal: 10,
  },

  statusAparatInput: {
    borderRadius: 16,
    backgroundColor: "#FFF",
    paddingHorizontal: 22,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusAparatInputChange: {
    flex: 9,
  },

  statusAparatInputIcon: {
    flex: 1,
  },

  statusAparatList: {
    paddingHorizontal: 12,
  },

  statusAparatItem: (last = false) => {
    return {
      flexDirection: "row",
      borderRadius: 16,
      backgroundColor: "#FFF",
      paddingHorizontal: 30,
      paddingVertical: 16,
      marginBottom: last ? 0 : 20,
    };
  },

  statusAparatItemBlock: {
    marginLeft: 20,
  },

  statusAparatItemText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 17,
  },

  statusAparatItemLocation: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusAparatItemLocationText: {
    marginLeft: 10,
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
    maxWidth: 210,
  },

  statusAparatItemDecor: (active = false) => {
    return {
      display: active ? "flex" : "none",
      position: "absolute",
      top: 8,
      right: 8,
    };
  },

  statusAparatCurrent: {
    paddingHorizontal: 12,
  },

  statusAparatCurrentError: (active = false) => {
    return {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      borderRadius: 21,
      backgroundColor: active ? "#FFA800" : "#FFF",
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
      paddingVertical: 8,
      height: 65,
      marginBottom: 20,
    };
  },

  statusAparatCurrentErrorsText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 24,
    fontWeight: "700",
  },

  statusAparatCurrentErrorsBlock: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusAparatCurrentErrorsNotification: (active = false) => {
    return {
      display: active ? "flex" : "none",
      marginRight: 10,
    };
  },

  statusAparatCurrentErrorsArrow: (active = false) => {
    if (active) {
      return {
        transform: [{ rotate: "90deg" }],
      };
    } else {
      return {};
    }
  },

  statusAparatCurrentClining: (active = false) => {
    return {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      borderRadius: 21,
      backgroundColor: active ? "#FFA800" : "#FFF",
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
      paddingVertical: 8,
      height: 65,
      marginBottom: 20,
    };
  },

  statusAparatCurrentLevel: (active = false) => {
    return {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      borderRadius: 21,
      backgroundColor: active ? "#FFA800" : "#FFF",
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
      paddingVertical: 8,
      height: 65,
      marginBottom: 20,
    };
  },
  statusAparatCurrentErrors: (active = false) => {
    return {
      display: active ? "flex" : "none",
      marginBottom: 20,
    };
  },

  statusAparatCurrentCliningModal: (active = false) => {
    return {
      display: active ? "flex" : "none",
      marginBottom: 20,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: "#D1D1D1",
      backgroundColor: "#FBFBFB",
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 21,
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
    };
  },

  statusAparatCurrentCliningModalTitle: {
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 5,
    backgroundColor: "#FFA800",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusAparatCurrentCliningModalTitleText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
  },

  statusAparatCurrentCliningModalSecond: {
    marginTop: 20,

    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
  },

  statusAparatCurrentCliningModalDate: {
    color: "#FFA800",
    textAlign: "center",
    fontFamily: "Evolventa-Bold",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 15,
  },

  statusAparatCurrentCliningModalTimerBlock: {
    alignItems: "center",
  },
  statusAparatCurrentCliningModalTimer: {
    marginTop: 15,
    transform: [{ rotate: "-90deg" }],
  },

  statusAparatCurrentCliningModalTimerText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Evolventa-Bold",
    fontSize: 28,
    fontWeight: "700",
    transform: [{ rotate: "90deg" }],
  },

  statusAparatCurrentCliningModalSubmit: {
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#FFA800",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },

  statusAparatCurrentCliningModalSubmitText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 24,
    fontWeight: "700",
  },

  statusAparatCurrentCliningModalPopcorn: {
    flexDirection: "row",
    marginTop: 15,
  },

  statusAparatCurrentCliningModalPopcornVisual: {
    width: "45%",
    height: 184,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#9C9C9C",
    shadowColor: "#737373",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 21,
  },

  statusAparatCurrentCliningModalPopcornVisualBack: {
    height: 178,
    paddingHorizontal: 11,
    paddingVertical: 18,
    position: "relative",
  },
  statusAparatCurrentCliningModalPopcornVisualLoad: (lvl = 10) => {
    return {
      backgroundColor: "#474747",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${100 - lvl}%`,
      borderRadius: 9,
      borderWidth: 1,
      borderColor: "#8A8A8A",
      overflow: "hidden",
      justifyContent: "flex-end",
    };
  },

  statusAparatCurrentCliningModalPopcornVisualLoadDecor: (lvl = 30) => {
    if (lvl <= 15) {
      return {
        borderRadius: 7,
        width: "100%",
        height: 6,
        backgroundColor: "#F20808",
      };
    } else if (lvl <= 30 && lvl >= 15) {
      return {
        borderRadius: 7,
        width: "100%",
        height: 6,
        backgroundColor: "#FFA800",
      };
    } else {
      return {
        borderRadius: 7,
        width: "100%",
        height: 6,
        backgroundColor: "#2BAB0B",
      };
    }
  },
  statusAparatCurrentCliningModalPopcornVisualPercent: (lvl = 30) => {
    if (lvl <= 15) {
      return {
        position: "absolute",
        width: 77,
        height: 40,
        top: "50%",
        left: "50%",
        marginLeft: -77 / 3,
        marginTop: -40 / 3,
        borderRadius: 7,
        backgroundColor: "#F20808",
        alignItems: "center",
        paddingVertical: 5,
      };
    } else if (lvl <= 30 && lvl >= 15) {
      return {
        position: "absolute",
        width: 77,
        height: 40,
        top: "50%",
        left: "50%",
        marginLeft: -77 / 3,
        marginTop: -40 / 3,
        borderRadius: 7,
        backgroundColor: "#FFA800",
        alignItems: "center",
        paddingVertical: 5,
      };
    } else {
      return {
        position: "absolute",
        width: 77,
        height: 40,
        top: "50%",
        left: "50%",
        marginLeft: -77 / 3,
        marginTop: -40 / 3,
        borderRadius: 7,
        backgroundColor: "#2BAB0B",
        alignItems: "center",
        paddingVertical: 5,
      };
    }
  },

  statusAparatCurrentCliningModalPopcornVisualPercentText: {
    color: "#474747",
    fontFamily: "Evolventa-Bold",
    fontSize: 24,
    fontWeight: "700",
  },

  statusAparatCurrentCliningModalPopcornInfo: {
    width: "55%",
  },
  statusAparatCurrentCliningModalPopcornInfoRules: {
    flexDirection: "row",
    marginLeft: 10,
    flexWrap: "wrap",
  },
  statusAparatCurrentCliningModalPopcornInfoRulesItem: {
    marginRight: 5,
  },
  statusAparatCurrentCliningModalPopcornInfoRulesPercent: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
  },
  statusAparatCurrentCliningModalPopcornInfoRulesText: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
  },

  statusAparatCurrentCliningModalPopcornInfoLvlBlock: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  statusAparatCurrentCliningModalPopcornInfoLvl: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 16,
    marginLeft: 10,
  },

  statusAparatCurrentCliningModalPopcornInfoLvlSpan: (lvl = 30) => {
    if (lvl <= 15) {
      return {
        marginLeft: 10,
        borderRadius: 6.957,
        backgroundColor: "#F20808",
        paddingVertical: 3,
        paddingHorizontal: 4,
      };
    } else if (lvl <= 30 && lvl >= 15) {
      return {
        marginLeft: 10,
        borderRadius: 6.957,
        backgroundColor: "#FFA800",
        paddingVertical: 3,
        paddingHorizontal: 4,
      };
    } else {
      return {
        marginLeft: 10,
        borderRadius: 6.957,
        backgroundColor: "#2BAB0B",
        paddingVertical: 3,
        paddingHorizontal: 4,
      };
    }
  },

  statusAparatCurrentCliningModalPopcornInfoLvlSpanText: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 12,
    fontWeight: "400",
  },

  statusAparatCurrentCliningModalPopcornInfoNot: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 16,
    marginLeft: 10,
  },

  statusAparatCurrentCliningModalPopcornInfoWarning: {
    color: "#000",
    fontFamily: "FiraSans-Regular",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 16,
    marginLeft: 10,
    flexDirection: "row",
  },
});

export default styles;
