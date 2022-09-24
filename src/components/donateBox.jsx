import React from "react";
import { f7, Block, BlockTitle, Button } from "framework7-react";
const DonateBox = () => {
  return (
    <div className="donate-box">
      <Block strong inset bgColor="purple" color="white">
        <BlockTitle medium>Support Our App</BlockTitle>
        <p>
          Our app is <strong>ads free</strong>. Donate cypto coin with coinbase to keep this app ads free and support other free app development.
        </p>
        <Button round outline external href="https://commerce.coinbase.com/checkout/db3ad151-fbc0-42f5-870f-38d80ee6ba0f" target="_blank">
          Donate with Coinbase
        </Button>
      </Block>
    </div>
  );
};

export default DonateBox;
