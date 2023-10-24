import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  statistics: {
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
    fontSize: 32,
    fontWeight: "700",
  },

  hero: {
    width: "100%",
    height: 150,
    borderRadius: 14,
    overflow: "hidden",
  },

  heroBlock: {
    width: "100%",
    height: 150,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  heroProfit: {
    alignItems: "center",
  },

  heroProfitTitle: {
    marginBottom: 18,

    color: "#FFF",
    textAlign: "center",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
  },

  heroProfitValue: {
    color: "#FFA800",
    textAlign: "center",
    fontFamily: "Evolventa-Bold",
    fontSize: 28,
    fontWeight: "700",
  },

  paramProfit: {
    paddingHorizontal: 10,
    marginTop: 38,
  },

  paramProfitBlock: {
    flexDirection: "row",
    width: "100%",
  },

  paramProfitTitle: {
    color: "#FFA800",
    fontFamily: "Evolventa-Bold",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  paramProfitForm: {
    width: "35%",
    marginRight: 35,
  },

  paramProfitFormApparatus: {
    marginBottom: 12,
    position: "relative",
    zIndex: 2,
  },

  paramProfitFormApparatusSelect: {
    position: "relative",
  },

  paramProfitFormApparatusSelectCurrent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  paramProfitFormApparatusSelectList: (display = false) => {
    return {
      display: display ? "flex" : "none",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      width: "100%",
      maxHeight: 140,
      borderColor: "#FFA800",
      borderWidth: 3,
      borderRadius: 12,
      zIndex: 2,
      overflow: "hidden",
    };
  },

  paramProfitFormApparatusSelectListCurrent: {
    color: "#000",
    textAlign: "center",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
    paddingTop: 2,
    paddingBottom: 5,
  },

  paramProfitFormApparatusSelectListItem: (color = "#D2D2D2") => {
    return {
      paddingHorizontal: 15,
      paddingVertical: 5,
      backgroundColor: color,
    };
  },

  paramProfitFormApparatusSelectListItemText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "FiraSans-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },

  paramProfitFormApparatusTitle: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  paramProfitFormDate: {
    marginBottom: 12,
  },
  paramProfitFormDateTitle: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  paramProfitFormDateSelect: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    zIndex: 1,
  },

  paramProfitFormDateSelectCurrent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  paramProfitFormDateSelectCurrentText: {},

  paramProfitStat: {
    width: "55%",
    paddingHorizontal: 27,
    paddingVertical: 20,
    borderRadius: 12,
    borderColor: "#FFA800",
    borderWidth: 3,
    backgroundColor: "#FFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },

  paramProfitStatData: {
    alignItems: "center",
    flexDirection: "row",
  },

  paramProfitStatText: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 13,
    fontWeight: "600",
    marginRight: 5,
  },

  paramProfitStatValue: {
    color: "#000",
    fontFamily: "Evolventa-Bold",
    fontSize: 20,
    fontWeight: "600",
  },

  paramProfitSubmitBlock: {
    marginTop: 10,
    alignItems: "center",
  },

  paramProfitSubmit: {
    backgroundColor: "#FFA800",
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 20,
  },

  paramProfitSubmitText: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 14,
    fontWeight: "700",
  },

  paramSearch: {
    paddingHorizontal: 10,
    marginTop: 14,
  },

  paramSearchTitle: {
    color: "#FFA800",
    fontFamily: "Evolventa-Bold",
    fontSize: 20,
    fontWeight: "700",
  },

  paramSearchType: {
    width: "100%",
  },

  paramSearchApparat: {
    flex: 2,
    marginRight: 13,
  },
  paramSearchDate: {
    flex: 2,
  },

  paramSearchData: {
    marginTop: 10,
    paddingRight: 10,
  },

  paramSearchDay: {
    flex: 2,
    marginRight: 13,
  },
  paramSearchFormat: {
    flex: 2,
  },
  paramSearchSubmit: {
    flex: 0,
    marginTop: 10,
  },
  paramSearchSubmitButton: {
    backgroundColor: "#FFA800",
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
  },

  paramSearchSubmitText: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 14,
    fontWeight: "700",
  },

  paramSearchSecond: {
    color: "#FFF",
    fontFamily: "Evolventa-Bold",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  paramSearchFlex: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    marginTop: 10,
  },
  paramSearchSelect: {
    position: "relative",
  },

  paramSearchSelectCurrent: (padding = 13) => {
    return {
      borderRadius: 12,
      width: "100%",
      paddingVertical: 8,
      paddingHorizontal: padding,
      paddingRight: 30,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    };
  },

  paramSearchSelectCurrentText: (size = 16) => {
    return {
      color: "#000",
      fontFamily: "FiraSans-Medium",
      textAlign: "center",
      fontSize: size,
      fontWeight: "500",
      width: "100%",
    };
  },

  paramSearchSelectMenu: (display = false) => {
    return {
      display: display ? "flex" : "none",

      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      borderRadius: 12,
      borderWidth: 3,
      borderColor: "#FFA800",
      backgroundColor: "#FFF",
      overflow: "hidden",
      zIndex: 3,
    };
  },

  paramSearchSelectMenuItem: (color = "white") => {
    return {
      paddingVertical: 8,
      paddingHorizontal: 13,
      paddingRight: 30,
      backgroundColor: color,
    };
  },

  paramSearchSelectMenuItemText: {
    color: "#000",
    fontFamily: "FiraSans-Medium",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },

  resultSearch: {
    paddingHorizontal: 13,
    marginTop: 10,
  },

  resultSearchBlock: {
    // flex: 1,
    borderRadius: 17,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
    shadowRadius: 4,
    paddingHorizontal: 13,
  },

  resultSearchTitle: {
    color: "#FFA800",
    fontFamily: "Evolventa-Bold",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  resultSearchError: {
    color: "white",
    fontFamily: "Evolventa-Bold",
    fontSize: 20,
    fontWeight: "700",
  },

  resultSearchTable: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    flex: 1,
  },

  resultSearchHead: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },

  resultSearchHeadText: (last = false) => {
    return {
      textAlign: "center",
      color: "#000",
      fontFamily: "FiraSans-Regular",
      fontSize: 12,
      fontWeight: "400",
      paddingRight: last ? 0 : 30,
      paddingBottom: 5,
    };
  },

  resultSearchRowText: (last = false) => {
    return {
      textAlign: "center",
      color: "#000",
      fontFamily: "FiraSans-Regular",
      fontSize: 12,
      fontWeight: "400",
      marginRight: last ? 0 : 30,
      marginTop: 5,
    };
  },

  resultSearchWrapper: {
    flexDirection: "row",
  },

  resultSearchRow: {
    paddingVertical: 4,
    flexDirection: "column",
  },
});

export default styles;
