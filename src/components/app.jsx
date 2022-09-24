import React, { useState, useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import { f7, f7ready, App, Views, View, Popup, Page, Navbar, Toolbar, NavRight, Link, Block, LoginScreen, LoginScreenTitle, List, ListItem, ListInput, ListButton, BlockFooter } from "framework7-react";

import capacitorApp from "../js/capacitor-app";
import routes from "../js/routes";
import store from "../js/store";
import { Preferences } from "@capacitor/preferences";
import CustomSplash from "./customSplash";

const MyApp = () => {
  // Login screen demo data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: "City Sounds", // App name
    theme: "auto", // Automatic theme detection
    version: "1.0.0",
    id: "net.c88i.citysound", // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,

    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: false,
      iosBackgroundColor: "#000000",
      iosTextColor: "white",
      androidOverlaysWebView: false,
      androidBackgroundColor: "#000000",
      androidTextColor: "white",
    },
  };
  const alertLoginData = () => {
    f7.dialog.alert("Username: " + username + "<br>Password: " + password, () => {
      f7.loginScreen.close();
    });
  };
  f7ready(() => {
    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }

    // Call F7 APIs here

    // set favSounds
    (async () => {
      const { value } = await Preferences.get({ key: "favSounds" });

      if (value == null) {
        await Preferences.set({
          key: "favSounds",
          value: JSON.stringify([]),
        });
      }
    })();
  });

  const onTabHide = () => {
    if (f7.view["0"].router.history.length > 0) {
      // console.log(f7.view["1"].router.history);
      // f7.view["0"].router.back(f7.view["0"].router.history[0], { force: true });
      f7.view["0"].router.back("/", { animate: false, force: true });
      f7.view["1"].router.back("/favorite/", { animate: false });
      f7.view["2"].router.back("/info/", { animate: false });
    }
  };

  return (
    <App {...f7params} dark>
      <CustomSplash />
      {/* Views/Tabs container */}
      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <Toolbar labels bottom>
          <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="material:home" text="Home" />
          <Link tabLink="#view-favorite" iconIos="f7:heart_fill" iconAurora="f7:heart_fill" iconMd="material:favorite" text="Favorite" />
          <Link tabLink="#view-info" iconIos="f7:info_circle_fill" iconAurora="f7:info_circle_fill" iconMd="material:info" text="Info" />
        </Toolbar>

        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
        <View onTabHide={onTabHide} id="view-home" name="home" main tab tabActive url="/" />

        {/* Settings View */}
        <View onTabHide={onTabHide} id="view-favorite" name="favorite" tab url="/favorite/" />

        {/* Info View */}
        <View onTabHide={onTabHide} id="view-info" name="info" tab url="/about/" />
      </Views>

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput type="text" name="username" placeholder="Your username" value={username} onInput={(e) => setUsername(e.target.value)}></ListInput>
              <ListInput type="password" name="password" placeholder="Your password" value={password} onInput={(e) => setPassword(e.target.value)}></ListInput>
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => alertLoginData()} />
              <BlockFooter>
                Some text about login information.
                <br />
                Click "Sign In" to close Login Screen
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  );
};
export default MyApp;
