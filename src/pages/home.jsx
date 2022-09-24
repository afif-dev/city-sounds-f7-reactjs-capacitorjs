import React from "react";
import { Page, Link, Block, BlockTitle, Row, Col, useStore } from "framework7-react";
import DonateBox from "../components/donateBox";

const HomePage = () => {
  const citySounds = useStore("city_sounds");

  return (
    <Page name="home">
      {/* Page content */}
      <div className="home-title text-center">
        <BlockTitle large>City Sounds</BlockTitle>
        <Block>
          <p>Just sit back and enjoy the city sounds.</p>
        </Block>
      </div>

      <Block className="top-0">
        <Row>
          {citySounds.map((citySound) => (
            <Col key={citySound.id} width="50" medium="25">
              <Link href={`/music-player/${citySound.id}/`} className="link-card">
                <div className="img-container">
                  <div className="img-wrap">
                    <img slot="media" src={citySound.cover} width="200" />
                  </div>
                </div>
                <p>{citySound.title}</p>
              </Link>
            </Col>
          ))}
        </Row>
      </Block>

      <DonateBox />
    </Page>
  );
};
export default HomePage;
