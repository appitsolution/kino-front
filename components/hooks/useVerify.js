import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from "../../constants/async";

import axios from "axios";

const useVerify = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    return {
      verify: false,
      dataFetch: {},
    };
  }

  if (token === "") {
    return {
      verify: false,
      dataFetch: {},
    };
  }

  const result = await axios.post(`${SERVER}/auth/me`, {
    token: token,
  });

  if (result.data.code !== 200) {
    return {
      verify: false,
      dataFetch: {},
    };
  }

  return {
    verify: true,
    dataFetch: result.data.user,
  };
};

export default useVerify;
