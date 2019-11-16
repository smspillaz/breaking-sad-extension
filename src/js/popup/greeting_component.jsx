import React from "react";
import { Input } from '@material-ui/core';
import { hot } from "react-hot-loader";
import { Slider } from "material-ui-slider";
// import styles from "./View.modules.css";
import styled from 'styled-components'
const Container = styled.div`
  width: 300px;
`
// unrealistic image, negative news, polarized content
const View = () => {
  const relisticImageStr = localStorage.getItem('relisticImageSetting') ? Number(localStorage.getItem('relisticImageSetting')) : 5; 
  const negativeNewsStr = localStorage.getItem('negativeNewsSetting') ? Number(localStorage.getItem('negativeNewsSetting')) : 5;  
  const polarizedContentStr = localStorage.getItem('polarizedContentSetting') ? Number(localStorage.getItem('polarizedContentSetting')) : 5;  
  const keywordsSettingStr = localStorage.getItem('keywordsSettingSetting') ? localStorage.getItem('keywordsSettingSetting') : "";  
  
  const [unrealisticImageSetting, setUnrealisticImageSetting] = React.useState(relisticImageStr);
  const [negativeNewsSetting, setNegativeNewsSetting] = React.useState(negativeNewsStr);
  const [polarizedContentSetting, setPolarizedContentSetting] = React.useState(polarizedContentStr);
  const [keywordsSetting, setKeywordsSetting] = React.useState(keywordsSettingStr);

  function handleUnrealisticSettingChange(value) {
    setUnrealisticImageSetting(Number(value))
    localStorage.setItem("relisticImageSetting", value)
  }
  function handleNegativeNewsSettingChange(value) {
    setNegativeNewsSetting(Number(value))
    localStorage.setItem("negativeNewsSetting", value)
  }
  function handlePolarizedContentSettingChange(value) {
    setPolarizedContentSetting(Number(value))
    localStorage.setItem("polarizedContentSetting", value)
  }
  function handleKeywordsSettingChange(event) {
    setKeywordsSetting(event.target.value)
    localStorage.setItem("keywordsSettingSetting", event.target.value)
  }
  return (
    <Container>
      <p>HACK THE SAD WITH THE BAD ITS NOT A FACEBOOK AD</p>
      <p>The World Is Full Of Sh*t Talkers—Don't Pay Them Any Attention</p>
      {/* <img src={icon} /> */}
      <div>
        Unrealistic Images: {unrealisticImageSetting}
        <Slider min={1} max={10} value={unrealisticImageSetting} onChange={handleUnrealisticSettingChange}/>
      </div>
      <div>
        Negative News: {negativeNewsSetting}
        <Slider min={1} max={10} value={negativeNewsSetting} onChange={handleNegativeNewsSettingChange}/>
      </div>
      <div>
        Polarized Content: {polarizedContentSetting}
        <Slider min={1} max={10} value={polarizedContentSetting} onChange={handlePolarizedContentSettingChange}/>
      </div>
      <div>
        Filtered keywords (seperate by comma ","): 
        <Input id="keyword" value={keywordsSetting} onChange={handleKeywordsSettingChange}/>
      </div>
    </Container>
  );
};

export default hot(module)(View)
