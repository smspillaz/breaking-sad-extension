import "../css/popup.css";
import View from "./popup/View.jsx";
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

function vectorSub(a, b) {
  return a.map((x, i) => x - b[i]);
}

function vectorDiv(a, b) {
  return a.map((x, i) => x / b[i]);
}

function vectorAdd(a, b) {
  return a.map((x, i) => x + b[i]);
}

function dot(a, b) {
  return a.reduce((acc, v, i) => acc + v * b[i], 0);
}

function matDot(mat, vec) {
  return mat.map((row, i) => dot(row, vec));
}

function transposeVec(vec) {
  return vec.reduce((acc, a) => acc.concat(a), []);
}

function settingsFromDAASValues(anxiety, depression, stress) {
  // totally legit
  const weights = [
    [-0.18098423, -0.03678769, -0.09627637],
    [-0.00083779, -0.24337069, -0.0017139 ],
    [-0.05899704,  0.00270284, -0.14499836]
  ];

  const bias = [0.58554776, 0.51599448, 0.54480395];

  const mean = [16.04488619, 21.06684322, 21.13512789];

  const std = [10.24648932, 12.31426825, 10.53229532];

  let value = [anxiety, depression, stress];

  value = vectorSub(value, mean);
  value = vectorDiv(value, std);
  value = transposeVec(matDot(weights, value));
  value = vectorAdd(value, bias);
  value = value.map(a => Math.floor(a * 10) + 1);
  value = value.map(a => Math.min(Math.max(1, a), 10));

  return value;
}

const initialNegativeNewsSetting = Number(getLocalStorageOrDefault('negativeNewsSetting', 5));
const initialUnrealisticImageSetting = Number(getLocalStorageOrDefault('unrealisticImageSetting', 5));
const initialPolarizedContentSetting = Number(getLocalStorageOrDefault('polarizedContentSetting'));
const initialKeywordsSetting = getLocalStorageOrDefault('keywordSettingSetting', []);
const initialDepressionSetting = Number(getLocalStorageOrDefault('depressionSetting', 21));
const initialAnxietySetting = Number(getLocalStorageOrDefault('anxietySetting', 16));
const initialStressSetting = Number(getLocalStorageOrDefault('stressSetting', 21));

sendSettingUpdateToContentScript('negativeNewsSetting', initialNegativeNewsSetting);
sendSettingUpdateToContentScript('unrealisticImagesSetting', initialUnrealisticImageSetting);
sendSettingUpdateToContentScript('polarizedContentSetting', initialPolarizedContentSetting);
sendSettingUpdateToContentScript('keywordsSetting', initialKeywordsSetting);
sendSettingUpdateToContentScript('depressionSetting', initialDepressionSetting);
sendSettingUpdateToContentScript('anxietySetting', initialAnxietySetting);
sendSettingUpdateToContentScript('stressSetting', initialStressSetting);


const useStateWithCallback = (initialState, callback) => {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => callback(state), [state]);

  return [state, setState];
};

const ToplevelSettingsView = () => {
  function updateSettingsFromDAASValues() {
    const [
      negativeNews,
      unrealisticImages,
      polarizedContent
    ] = settingsFromDAASValues(anxietySetting, depressionSetting, stressSetting);
  
    handleNegativeNewsSettingChange(negativeNews);
    handlePolarizedContentSettingChange(polarizedContent);
    handleUnrealisticSettingChange(unrealisticImages);
  }

  const [unrealisticImageSetting, setUnrealisticImageSetting] = useStateWithCallback(initialUnrealisticImageSetting, () => {
    localStorage.setItem("unrealisticImageSetting", unrealisticImageSetting);
    sendSettingUpdateToContentScript("unrealisticImagesSetting", unrealisticImageSetting);
  });
  const [negativeNewsSetting, setNegativeNewsSetting] = useStateWithCallback(initialNegativeNewsSetting, () => {
    localStorage.setItem("negativeNewsSetting", negativeNewsSetting);
    sendSettingUpdateToContentScript("negativeNewsSetting", negativeNewsSetting);
  });
  const [polarizedContentSetting, setPolarizedContentSetting] = useStateWithCallback(initialPolarizedContentSetting, () => {
    localStorage.setItem("polarizedContentSetting", polarizedContentSetting);
    sendSettingUpdateToContentScript("polarizedContentSetting", polarizedContentSetting);
  });
  const [keywordsSetting, setKeywordsSetting] = useStateWithCallback(initialKeywordsSetting, () => {
    localStorage.setItem("keywordsSettingSetting", keywordsSetting);
    sendSettingUpdateToContentScript("keywordsSetting", keywordsSetting);
  });
  const [depressionSetting, setDepressionSetting] = useStateWithCallback(initialDepressionSetting, () => {
    localStorage.setItem("depressionSetting", depressionSetting);
    sendSettingUpdateToContentScript("depressionSetting", depressionSetting);
    updateSettingsFromDAASValues();
  });
  const [anxietySetting, setAnxietySetting] = useStateWithCallback(initialAnxietySetting, () => {
    localStorage.setItem("anxietySetting", anxietySetting);
    sendSettingUpdateToContentScript("anxietySetting", anxietySetting);
    updateSettingsFromDAASValues();
  });
  const [stressSetting, setStressSetting] = useStateWithCallback(initialStressSetting, () => {
    localStorage.setItem("stressSetting", stressSetting);
    sendSettingUpdateToContentScript("stressSetting", stressSetting);
    updateSettingsFromDAASValues();
  });

  function handleUnrealisticSettingChange(value) {
    setUnrealisticImageSetting(Number(value))
  }
  function handleNegativeNewsSettingChange(value) {
    setNegativeNewsSetting(Number(value))
  }
  function handlePolarizedContentSettingChange(value) {
    setPolarizedContentSetting(Number(value))
  }
  function handleKeywordsSettingChange(event) {
    setKeywordsSetting(event.target.value.split(',').map(k => k.toLowerCase()).filter(s => s))
  }
  function handleDepressionChange(value) {
    setDepressionSetting(Number(value))
  }
  function handleAnxietyChange(value) {
    setAnxietySetting(Number(value));
  }
  function handleStressChange(value) {
    setStressSetting(Number(value));
  }

  return (
    <View
      onKeywordSettingChange={handleKeywordsSettingChange}
      onNegativeNewsSettingChange={handleNegativeNewsSettingChange}
      onPolarizedContentSettingChange={handlePolarizedContentSettingChange}
      onUnrealisticImagesSettingChange={handleUnrealisticSettingChange}
      onDepressionChange={handleDepressionChange}
      onAnxietyChange={handleAnxietyChange}
      onStressChange={handleStressChange}
      negativeNewsSetting={negativeNewsSetting}
      unrealisticImageSetting={unrealisticImageSetting}
      polarizedContentSetting={polarizedContentSetting}
      keywordsSetting={keywordsSetting}
      depressionSetting={depressionSetting}
      anxietySetting={anxietySetting}
      stressSetting={stressSetting}
    />
  )
}


render(
  <ToplevelSettingsView />,
  window.document.getElementById("app-container")
);
