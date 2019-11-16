import "../css/popup.css";
import View from "./popup/greeting_component.jsx";
import React from "react";
import { render } from "react-dom";

const getLocalStorageOrDefault = (setting, defaultValue) => {
  const ls = localStorage.getItem(setting);

  return ls !== null ? Number(ls) : defaultValue;
}

const sendSettingUpdateToContentScript = (settingName, value) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const payload = {
      type: 'setting',
      data: {
        name: settingName,
        value: value
      }
    }
    chrome.tabs.sendMessage(tabs[0].id, payload, null);
  });
}

function handleUnrealisticSettingChange(value) {
  localStorage.setItem("unrealisticImageSetting", value);
  sendSettingUpdateToContentScript("unrealisticImagesSetting", value);
}
function handleNegativeNewsSettingChange(value) {
  localStorage.setItem("negativeNewsSetting", value);
  sendSettingUpdateToContentScript("negativeNewsSetting", value);
}
function handlePolarizedContentSettingChange(value) {
  localStorage.setItem("polarizedContentSetting", value);
  sendSettingUpdateToContentScript("polarizedContentSetting", value);
}
function handleKeywordsSettingChange(value) {
  localStorage.setItem("keywordsSettingSetting", value);
  sendSettingUpdateToContentScript("keywordsSetting", value);
}

const initialNegativeNewsSetting = Number(getLocalStorageOrDefault('negativeNewsSetting', 5));
const initialUnrealisticImageSetting = Number(getLocalStorageOrDefault('unrealisticImageSetting', 5));
const initialPolarizedContentSetting = Number(getLocalStorageOrDefault('polarizedContentSetting'));
const initialKeywordsSetting = getLocalStorageOrDefault('keywordSettingSetting', []);

sendSettingUpdateToContentScript('negativeNewsSetting', initialNegativeNewsSetting);
sendSettingUpdateToContentScript('unrealisticImagesSetting', initialUnrealisticImageSetting);
sendSettingUpdateToContentScript('polarizedContentSetting', initialPolarizedContentSetting);
sendSettingUpdateToContentScript('keywordsSetting', initialKeywordsSetting);

render(
  <View
    onKeywordSettingChange={handleKeywordsSettingChange}
    onNegativeNewsSettingChange={handleNegativeNewsSettingChange}
    onPolarizedContentSettingChange={handlePolarizedContentSettingChange}
    onUnrealisticImagesSettingChange={handleUnrealisticSettingChange}
    initialNegativeNewsSetting={initialNegativeNewsSetting}
    initialUnrealisticImageSetting={initialUnrealisticImageSetting}
    initialPolarizedContentSetting={initialPolarizedContentSetting}
    initialKeywordsSetting={initialKeywordsSetting}
  />,
  window.document.getElementById("app-container")
);
