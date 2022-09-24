import React, { useState, useRef, useEffect } from "react";
import { f7, Page, Navbar, Block, Link, Row, Col, Button, List, ListItem, Popup, NavRight, useStore } from "framework7-react";
import TimerDisplay from "../components/timerDisplay";
import RemoveDuplicateArray from "../components/removeDuplicateArray";
import { Howl, Howler } from "howler";
import { Preferences } from "@capacitor/preferences";
import { LocalNotifications } from "@capacitor/local-notifications";

const setFavSounds = async (favIds) => {
  await Preferences.set({
    key: "favSounds",
    value: favIds,
  });
};

const getFavSounds = async () => {
  const { value } = await Preferences.get({ key: "favSounds" });
  if (value.length > 0) {
    return JSON.parse(value);
  }
  return null;
};

const MusicPlayerPage = (props) => {
  const { f7route, f7router } = props;
  const csId = f7route.params.id;
  const citySounds = useStore("city_sounds");
  const audio = useRef();
  const [timer, setTimer] = useState(0);
  const [citySound, setCitySound] = useState("");
  const [playBtn, setPlayBtn] = useState(true);
  const [favBtn, setFavBtn] = useState(false);
  const timerDefault = document.querySelector(".timer-popup .list .default .item-radio");

  useEffect(() => {
    citySounds.forEach(async function (item) {
      if (item.id == csId) {
        setCitySound(item);

        let favIds = await getFavSounds();
        favIds.forEach(function (favId) {
          if (favId == citySound.id) {
            setFavBtn(true);
          }
        });

        // check audio
        if (item.sound) {
          // update audio
          audio.current = new Howl({
            src: [citySound.sound],
            autoplay: true,
            loop: true,
            onplay: function () {
              // console.log("Play!");
              LocalNotifications.schedule({
                notifications: [
                  {
                    title: citySound.title,
                    body: `Playing ${citySound.title} in ${f7.name}`,
                    id: 1,
                    schedule: { at: new Date(Date.now() + 500) },
                    sound: null,
                    attachments: null,
                    actionTypeId: "",
                    extra: null,
                  },
                ],
              });
            },
          });
          audio.current.fade(0.2, 1, 300);
          audio.current.play();
        }
      }
    });
  }, [citySound]);

  const favSound = async (e) => {
    if (favBtn) {
      // remove from fav
      setFavBtn(false);
      let favIds = await getFavSounds();
      favIds.forEach(async (val, idx) => {
        if (val == citySound.id) {
          favIds.splice(idx, 1);
          await setFavSounds(JSON.stringify(RemoveDuplicateArray(favIds)));
        }
      });
    } else {
      // add to fav
      setFavBtn(true);
      let favIds = await getFavSounds();
      favIds.push(citySound.id);
      await setFavSounds(JSON.stringify(RemoveDuplicateArray(favIds)));
    }
  };

  const playSound = (event) => {
    if (audio.current) {
      if (event) {
        audio.current.play();
        setPlayBtn(true);
      } else {
        audio.current.stop();
        setTimer(0);
        setPlayBtn(false);
        timerDefault.click();
      }
    }
  };

  const timerSound = (e) => {
    const { value } = e.target;
    setTimer(value);
    // console.log(timer);
    // console.log(value);
    f7.popup.close();
  };

  const onPageBeforeOut = () => {
    playSound(false);
    LocalNotifications.removeAllDeliveredNotifications();
  };

  const onPageTabHide = () => {
    LocalNotifications.removeAllDeliveredNotifications();
    playSound(false);
  };

  return (
    <Page onPageBeforeOut={onPageBeforeOut} onPageTabHide={onPageTabHide} className="music-player" style={{ backgroundImage: "url(" + citySound.cover + ")", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <Navbar title={citySound.title} backLink="Back" />
      <Row className="audio-settings text-center display-flex justify-content-center align-items-center">
        <Col width="100" className="countdown">
          <TimerDisplay time={timer} audio={audio} />
        </Col>
        <Col width="33" medium="20">
          {favBtn ? <Button onClick={favSound} large round color="white" iconSize="40" iconIos="f7:heart_fill" iconAurora="f7:heart_fill" iconMd="material:favorite" /> : <Button onClick={favSound} large round color="white" iconSize="40" iconIos="f7:heart" iconAurora="f7:heart" iconMd="material:favorite_border" />}
        </Col>
        <Col width="33" medium="20">
          {playBtn ? (
            <Button
              className="playbtn"
              onClick={() => {
                playSound(false);
              }}
              large
              round
              color="white"
              iconSize="60"
              iconIos="f7:stop_fill"
              iconAurora="f7:stop_fill"
              iconMd="material:stop"
            />
          ) : (
            <Button
              className="playbtn"
              onClick={() => {
                playSound(true);
              }}
              large
              round
              color="white"
              iconSize="60"
              iconIos="f7:play_fill"
              iconAurora="f7:play_fill"
              iconMd="material:play_arrow"
            />
          )}
        </Col>
        <Col width="33" medium="20">
          <Button popupOpen=".timer-popup" large round color="white" iconSize="40" iconIos="f7:clock" iconAurora="f7:clock" iconMd="material:alarm" />
        </Col>
      </Row>
      {/* Popup Timer */}
      <Popup className="timer-popup" swipeToClose tabletFullscreen>
        <Page>
          <Navbar title="Set Timer">
            <NavRight>
              <Link popupClose iconSize="30" iconIos="f7:xmark" iconAurora="f7:xmark" iconMd="material:close" />
            </NavRight>
          </Navbar>

          <Block>
            <p>Set timer to automatically stop sound.</p>
          </Block>

          <List>
            <ListItem onChange={timerSound} radio radioIcon="end" title="No Timer" value="0" name="demo-radio-end" className="default" defaultChecked></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="1 Minute" value="1" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="3 Minutes" value="3" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="5 Minutes" value="5" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="10 Minutes" value="10" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="15 Minutes" value="15" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="30 Minutes" value="30" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="40 Minutes" value="40" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="1 Hour" value="60" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="2 Hours" value="120" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="3 Hours" value="180" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="4 Hours" value="240" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="6 Hours" value="360" name="demo-radio-end"></ListItem>
            <ListItem onChange={timerSound} radio radioIcon="end" title="8 Hours" value="480" name="demo-radio-end"></ListItem>
          </List>
        </Page>
      </Popup>
    </Page>
  );
};

export default MusicPlayerPage;
