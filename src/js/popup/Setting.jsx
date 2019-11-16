import React from "react";
import { Input, InputLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import { hot } from "react-hot-loader";
import { Slider } from "material-ui-slider";
// import styles from "./View.modules.css";
import styled from 'styled-components'

import icon from '../../img/icon-34.png';

const Container = styled.div`
  width: 300px;
`

const Image = styled.img`
  width: 50%;
  margin-left: 25%;
`;

const LabelledInputField = ({ label, value, onChange }) => (
  <FormControl onChange={onChange}>
    <InputLabel>{label}</InputLabel>
    <Input value={value}></Input>
  </FormControl>
);

const SliderDiv = styled.div`
  height: 50px;
`;

// unrealistic image, negative news, polarized content
const Setting = ({
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
  stressSetting,
  toggleShowQuestionnaire
}) => {
  return (
    <Container>
      <Card>
        <CardMedia title={"Breaking Sad"}>
          <Image src={icon} />
        </CardMedia>
        <CardContent style={{ paddingBottom: '0px' }}>
          <SliderDiv>
            Unrealistic Images: {unrealisticImageSetting}
            <Slider min={1} max={10} value={unrealisticImageSetting} onChange={onUnrealisticImagesSettingChange}/>
          </SliderDiv>
          <SliderDiv>
            Negative News: {negativeNewsSetting}
            <Slider min={1} max={10} value={negativeNewsSetting} onChange={onNegativeNewsSettingChange}/>
          </SliderDiv>
          <SliderDiv>
            Polarized Content: {polarizedContentSetting}
            <Slider min={1} max={10} value={polarizedContentSetting} onChange={onPolarizedContentSettingChange}/>
          </SliderDiv>
          <LabelledInputField label={"Filtered keywords"} id="keyword" value={keywordsSetting} onChange={onKeywordSettingChange}/>
          <LabelledInputField label={"Depression"} id="depression" value={depressionSetting} onChange={e => onDepressionChange(e.target.value)}/>
          <LabelledInputField label={"Anxiety"} id="anxiety" value={anxietySetting} onChange={e => onAnxietyChange(e.target.value)}/>
          <LabelledInputField label={"Stress"} id="stress" value={stressSetting} onChange={e => onStressChange(e.target.value)}/>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={toggleShowQuestionnaire}
            color="secondary"
          >
            Questionnaire
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default hot(module)(Setting)
