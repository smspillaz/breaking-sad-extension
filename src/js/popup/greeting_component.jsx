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
const View = ({
  onUnrealisticImagesSettingChange,
  onNegativeNewsSettingChange,
  onPolarizedContentSettingChange,
  onKeywordSettingChange,
  onDepressionChange,
  onAnxietyChange,
  onStressChange,
  unrealisticImageSetting,
  negativeNewsSetting,
  polarizedContentSetting,
  keywordsSetting,
  depressionSetting,
  anxietySetting,
  stressSetting
}) => {
  return (
    <Container>
      <p>HACK THE SAD WITH THE BAD ITS NOT A FACEBOOK AD</p>
      <p>The World Is Full Of Sh*t Talkers—Don't Pay Them Any Attention</p>
      {/* <img src={icon} /> */}
      <div>
        Unrealistic Images: {unrealisticImageSetting}
        <Slider min={1} max={10} value={unrealisticImageSetting} onChange={onUnrealisticImagesSettingChange}/>
      </div>
      <div>
        Negative News: {negativeNewsSetting}
        <Slider min={1} max={10} value={negativeNewsSetting} onChange={onNegativeNewsSettingChange}/>
      </div>
      <div>
        Polarized Content: {polarizedContentSetting}
        <Slider min={1} max={10} value={polarizedContentSetting} onChange={onPolarizedContentSettingChange}/>
      </div>
      <div>
        Filtered keywords (seperate by comma ","): 
        <Input id="keyword" value={keywordsSetting} onChange={onKeywordSettingChange}/>
      </div>
      <div>
        {'Depression '}
        <Input id="depression" value={depressionSetting} onChange={onDepressionChange}/>
      </div>
      <div>
        {'Anxiety '}
        <Input id="anxiety" value={anxietySetting} onChange={onAnxietyChange}/>
      </div>
      <div>
        {'Stress '}
        <Input id="stress" value={stressSetting} onChange={onStressChange}/>
      </div>
    </Container>
  );
};

export default hot(module)(View)
