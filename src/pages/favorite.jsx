import React, { useState } from "react";
import { Page, Navbar, Link, Block, Row, Col, useStore } from "framework7-react";
import { Preferences } from "@capacitor/preferences";

const getFavSounds = async () => {
  const { value } = await Preferences.get({ key: "favSounds" });
  if (value.length > 0) {
    return JSON.parse(value);
  }
  return null;
};

const FavouritePage = () => {
  const totalRowCol = 4;
  const citySounds = useStore("city_sounds");
  const [favCitySounds, setFavCitySounds] = useState([]);
  const [extraCol, setExtraCol] = useState([]);

  const onPageBeforeInTabShow = async () => {
    let citySound;
    setExtraCol([]);

    let favIds = await getFavSounds();
    setFavCitySounds([]);
    citySounds.map((citySound) => {
      favIds.forEach(function (favId) {
        if (favId == citySound.id) {
          setFavCitySounds((arr) => [...arr, citySound]);
        }
      });
    });

    if (favIds.length > 0 && favIds.length % totalRowCol) {
      let remainder = favIds.length % totalRowCol;
      remainder = totalRowCol - remainder;

      if (remainder > 0) {
        for (let i = 0; i < remainder; i++) {
          let key = citySounds.length + i;
          setExtraCol((arr) => [...arr, <Col key={key} width="50" medium="25"></Col>]);
        }
      }
    }
  };

  return (
    <Page onPageTabShow={onPageBeforeInTabShow} onPageBeforeIn={onPageBeforeInTabShow} name="favourite">
      {/* Page content */}
      <Navbar title="Favourite Sound" />

      {favCitySounds.length > 0 ? (
        <Block className="top-0">
          <Row className="sound-lists">
            {favCitySounds.map((citySound) => (
              <Col key={citySound.id} width="50" medium="25">
                <Link href={`/music-player/${citySound.id}/`} force={true} className="link-card">
                  <div className="img-container">
                    <div className="img-wrap">
                      <img slot="media" src={citySound.cover} width="200" />
                    </div>
                  </div>
                  <p>{citySound.title}</p>
                </Link>
              </Col>
            ))}
            {extraCol}
          </Row>
        </Block>
      ) : (
        <Block>
          <p>Listen and add your favourite sound.</p>
        </Block>
      )}
    </Page>
  );
};

export default FavouritePage;
