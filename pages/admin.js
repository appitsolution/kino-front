import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "../styles/admin";
import Logo from "../assets/icons/Logo";
import MenuIcon from "../assets/icons/MenuIcon";
import Search from "../assets/icons/Search";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MenuMobile from "../components/Menu";
import axios from "axios";
import { SERVER } from "../constants/async";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import useGuard from "../components/hooks/useGuard";
import useVerify from "../components/hooks/useVerify";

const Admin = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();
  const [activeUsers, setActiveUsers] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);

  const [currentSearchUser, setCurrentSearchUser] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [filteredOwner, setFilteredOwner] = useState([]);

  const filterUser = () => {
    const newFilter = users.filter((item) => {
      if (
        item.username.toLowerCase().includes(currentSearchUser.toLowerCase())
      ) {
        return item;
      } else {
        return;
      }
    });
    setFilteredUser(newFilter);
  };

  const filterOwner = () => {
    const newFilter = owners.filter((item) => {
      if (item.owner.toLowerCase().includes(currentSearchUser.toLowerCase())) {
        return item;
      } else {
        return;
      }
    });
    setFilteredOwner(newFilter);
  };

  useEffect(() => {
    filterUser();
    filterOwner();
  }, [currentSearchUser]);

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { dataFetch, verify } = await useVerify();
      if (!verify) navigation.navigate("home");
      const result = await axios(
        `${SERVER}/admininstration/quick?user_id=${dataFetch.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.code === 200) {
        const sortUsers = result.data.users.sort((a, b) =>
          a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        );
        const sortOwner = result.data.owners.sort((a, b) =>
          a.owner.toLowerCase().localeCompare(b.owner.toLowerCase())
        );
        setUsers(sortUsers);
        setOwners(sortOwner);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkUser = async () => {
    const guard = await useGuard("admin");
    if (!guard) {
      navigation.navigate("status-aparat");
      return;
    }

    const guardCheckUser = await useGuard("admin/user");

    if (guardCheckUser) {
      setActiveUsers(true);
      return;
    }

    const guardCheckOwner = await useGuard("admin/owner");
    if (guardCheckOwner) {
      setActiveUsers(false);
      return;
    }
  };

  const [guardCheckUser, setGuardCheckUser] = useState(false);
  const [guardCheckOwner, setGuardCheckOwner] = useState(false);
  const checkGuard = async () => {
    const guardUser = await useGuard("admin/user");
    const guardOwner = await useGuard("admin/owner");

    setGuardCheckUser(guardUser);
    setGuardCheckOwner(guardOwner);
  };

  useEffect(() => {
    if (isFocused) {
      checkUser();
      checkGuard();
      getUser();
    }
  }, [isFocused]);
  return (
    <>
      <View style={styles.admin}>
        <View style={styles.header}>
          <Logo />
          <Text style={styles.headerTitle}>{t("Адміністрування")}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsOpenMenu(true);
            }}
          >
            <MenuIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <View style={styles.tabsButtons}>
            {guardCheckUser && (
              <TouchableOpacity
                style={styles.tabsButton(activeUsers)}
                onPress={() => {
                  setActiveUsers(true);
                }}
              >
                <Text style={styles.tabsButtonText}>{t("Користувач")}</Text>
              </TouchableOpacity>
            )}

            {guardCheckOwner && (
              <TouchableOpacity
                style={styles.tabsButton(!activeUsers)}
                onPress={() => {
                  setActiveUsers(false);
                }}
              >
                <Text style={styles.tabsButtonText}>{t("Власник")}</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.tabsPlus}
            onPress={() => {
              if (activeUsers) {
                navigation.navigate("admin/createUser");
              } else {
                navigation.navigate("admin/createOwner");
              }
            }}
          >
            <Text style={styles.tabsPlusText}>+</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.searchBlock}>
            <View style={styles.search}>
              <TextInput
                style={styles.searchInput}
                placeholder={t("Введіть логін користувача")}
                onChangeText={(value) => setCurrentSearchUser(value)}
              />

              <View style={styles.searchIcon}>
                <Search />
              </View>
            </View>
          </View>

          {activeUsers ? (
            <>
              <View style={styles.users}>
                {currentSearchUser === "" ? (
                  <>
                    {users.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.usersItem(users.length === index - 1)}
                        onPress={() =>
                          navigation.navigate("admin/updateUser", {
                            id: item.id,
                          })
                        }
                      >
                        <Text style={styles.usersText}>{item.username}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredUser.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.usersItem(users.length === index - 1)}
                        onPress={() =>
                          navigation.navigate("admin/updateUser", {
                            id: item.id,
                          })
                        }
                      >
                        <Text style={styles.usersText}>{item.username}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>
            </>
          ) : (
            <>
              <View style={styles.owners}>
                {currentSearchUser === "" ? (
                  <>
                    {owners.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.usersItem(owners.length === index - 1)}
                        onPress={() =>
                          navigation.navigate("admin/updateOwner", {
                            id: item.id,
                          })
                        }
                      >
                        <Text style={styles.usersText}>{item.owner}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredOwner.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.usersItem(owners.length === index - 1)}
                        onPress={() =>
                          navigation.navigate("admin/updateOwner", {
                            id: item.id,
                          })
                        }
                      >
                        <Text style={styles.usersText}>{item.owner}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
      </View>
      <MenuMobile open={isOpenMenu} current="admin" closeFun={setIsOpenMenu} />
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default Admin;
