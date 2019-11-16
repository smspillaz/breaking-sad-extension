import "../css/popup.css";
import View from "./popup/greeting_component.jsx";
import React from "react";
import { render } from "react-dom";

function handleUnrealisticSettingChange(value) {
  localStorage.setItem("unrealisticImageSetting", value);
}
function handleNegativeNewsSettingChange(value) {
  localStorage.setItem("negativeNewsSetting", value);
}
function handlePolarizedContentSettingChange(value) {
  localStorage.setItem("polarizedContentSetting", value);
}
function handleKeywordsSettingChange(event) {
  localStorage.setItem("keywordsSettingSetting", event.target.value);
}

const getLocalStorageOrDefault = (setting, defaultValue) => {
  const ls = localStorage.getItem(setting);

  return ls !== null ? Number(ls) : defaultValue;
}

render(
  <View
    onKeywordSettingChange={handleKeywordsSettingChange}
    onNegativeNewsSettingChange={handleNegativeNewsSettingChange}
    onPolarizedContentSettingChange={handlePolarizedContentSettingChange}
    onUnrealisticImagesSettingChange={handleUnrealisticSettingChange}
    initialNegativeNewsSetting={Number(getLocalStorageOrDefault('negativeNewsSetting', 5))}
    initialUnrealisticImageSetting={Number(getLocalStorageOrDefault('unrealisticImageSetting', 5))}
    initialPolarizedContentSetting={Number(getLocalStorageOrDefault('polarizedContentSetting'))}
    initialKeywordsSetting={getLocalStorageOrDefault('keywordSettingSetting', '')}
  />,
  window.document.getElementById("app-container")
);
