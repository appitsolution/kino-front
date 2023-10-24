import { Image } from "react-native";
import ua from "../images/ukraine-flag.png";
import en from "../images/flag-angli.png";

const LangIcon = ({ lang = "ua" }) => {
  if (lang === "ua") {
    return (
      <>
        <Image source={ua} />
      </>
    );
  }
  if (lang === "en") {
    return (
      <>
        <Image source={en} />
      </>
    );
  }
  return (
    <>
      <Image source={ua} />
    </>
  );
};

export default LangIcon;
