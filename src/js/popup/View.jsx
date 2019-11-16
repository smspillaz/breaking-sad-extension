import React from "react";
import Setting from "./Setting.jsx";
import { hot } from "react-hot-loader";
import Questionaire from "./Questionaire.jsx";
const View = ({ onDepressionChange, onAnxietyChange, onStressChange, ...settingsProps }) => {
    const [showQuestionaire, setShowQuestionaire] = React.useState(false);

    return (
        <>
            {
                showQuestionaire ? (
                    <Questionaire
                      toggleShowQuestionnaire={() => setShowQuestionaire(!showQuestionaire)}
                      onDepressionChange={onDepressionChange}
                      onAnxietyChange={onAnxietyChange}
                      onStressChange={onStressChange}
                    />
                ) : (
                    <Setting
                      onDepressionChange={onDepressionChange}
                      onAnxietyChange={onAnxietyChange}
                      onStressChange={onStressChange}
                      toggleShowQuestionnaire={() => setShowQuestionaire(!showQuestionaire)}
                      {...settingsProps}
                    />
                )
             }
        </>
    );
  };
  
  export default hot(module)(View)
  