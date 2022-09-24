import React, { useState } from "react";
import { f7, Page, Navbar, Block, BlockTitle, List, ListItem } from "framework7-react";
import DonateBox from "../components/donateBox";
import { Device } from "@capacitor/device";

const InfoPage = () => {
  const [appInfo, setAppInfo] = useState({});

  const onPageInit = () => {
    const logDeviceInfo = async () => {
      const info = await Device.getInfo();
      setAppInfo(info);
    };
    logDeviceInfo();
  };

  return (
    <Page onPageInit={onPageInit} name="info">
      <Navbar title="Info" />
      <Block>
        <p>Thank you for using our app!</p>
        <p>This app mainly use to help our users from feeling loneliness, anxiety or depression. Besides, if you miss the city life this is right app for you to capture back the memories.</p>
      </Block>
      {/* <Block strong>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni molestiae laudantium dignissimos est nobis delectus nemo ea alias voluptatum architecto, amet similique, saepe iste consectetur in repellat ut minus quibusdam!</p>
      <p>Molestias et distinctio porro nesciunt ratione similique, magni doloribus, rerum nobis, aliquam quae reiciendis quasi modi. Nam a recusandae, fugiat in ea voluptates fuga eius, velit corrupti reprehenderit dignissimos consequatur!</p>
      <p>Blanditiis, cumque quo adipisci. Molestiae, dolores dolorum quos doloremque ipsa ullam eligendi commodi deserunt doloribus inventore magni? Ea mollitia veniam nostrum nihil, iusto doloribus a at! Ea molestiae ullam delectus!</p>
    </Block> */}

      <BlockTitle>App & Device Info</BlockTitle>
      <List simpleList>
        <ListItem title={`App Version: ${f7.version}`} />
        <ListItem title={`Manufacturer: ${appInfo.manufacturer}`} />
        <ListItem title={`Model: ${appInfo.model}`} />
        <ListItem title={`Operating System (OS): ${appInfo.operatingSystem}`} />
        <ListItem title={`OS Version: ${appInfo.osVersion}`} />
      </List>

      <BlockTitle>App Contributor</BlockTitle>
      <List>
        <ListItem link="https://c88i.net/" external title="Studo c88i" target="_blank" />
        <ListItem link="https://unsplash.com/" external title="Unsplash" target="_blank" />
        <ListItem link="https://framework7.io/" external title="Framework7" target="_blank" />
        <ListItem link="https://capacitorjs.com/" external title="Capacitor" target="_blank" />
      </List>

      <DonateBox />
    </Page>
  );
};

export default InfoPage;
