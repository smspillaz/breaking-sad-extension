import React from "react";

import { hot } from "react-hot-loader";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import styled from 'styled-components'
import { Button } from '@material-ui/core';

const Container = styled.div`
    width: 600px;
    margin-left: 20px;
`
const Question = styled.div`
    width: 100%;
    margin: 20px;
`
const Scale = styled.div`
    font-style: italic;
`
const rStyle = {
    flexDirection: 'row'
};
const fieldset = {
    width: '90%',
    fontSize: '0.9rem'
};
const tempResult = {}
for (var i = 1; i <= 21 ; i++) {
    tempResult[String(i)] = 0;
}

const resultsMapping = {
    1: "S", 2: "A", 3: "D", 4: "A", 5: "D", 6: "S", 7: "A", 8: "S", 9: "A", 10: "D", 11: "S", 12: "S", 13: "D", 14: "S", 15: "A", 16: "D", 17: "D", 18: "S", 19: "A", 20: "A", 21: "D"
}

const MultipleChoiceQuestion = ({question, questionNo}) => {
    function handleSetResult(event) {
        tempResult[questionNo] = event.target.value;
        console.log("tempResult", tempResult)
    }
    return (
    <FormControl style={fieldset} component="fieldset" onChange={handleSetResult}>
        <FormLabel component="legend">{question}</FormLabel>
        <RadioGroup style={rStyle} defaultValue="0" aria-label="gender" name="customized-radios">
            <FormControlLabel value="0" control={<Radio />} label="0" />
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
        </RadioGroup>

    </FormControl>
    )
}

const Questionnaire = ({ onDepressionChange, onAnxietyChange, onStressChange, toggleShowQuestionnaire }) => {
    const DASresult = {
        "S": 0,
        "D": 0,
        "A": 0
    }

    const [results, setResults] = React.useState({});
    function handleSetResult () {
        setResults(tempResult)
        Object.keys(tempResult).forEach(ele => DASresult[resultsMapping[ele]] += Number(tempResult[ele])*2)
        onDepressionChange(DASresult.D);
        onAnxietyChange(DASresult.A);
        onStressChange(DASresult.S);
        toggleShowQuestionnaire();
    }
    return (
        <>
            <Container>
                <Scale>
                    0 Did not apply to me at all <br></br>
                    1 Applied to me to some degree, or some of the time <br></br>
                    2 Applied to me to a considerable degree, or a good part of time <br></br>
                    3 Applied to me very much, or most of the time <br></br>
                </Scale>
                <Question>
                    <MultipleChoiceQuestion question={"I found it hard to wind down"} questionNo={"1"}/>
                    <MultipleChoiceQuestion question={"I was aware of dryness of my mouth "} questionNo={"2"}/>
                    <MultipleChoiceQuestion question={"I couldn't seem to experience any positive feeling at all "} questionNo={"3"}/>
                    <MultipleChoiceQuestion question={'I experienced breathing difficulty (eg, excessively rapid breathing,breathlessness in the absence of physical exertion)'} questionNo={"4"}/>
                    <MultipleChoiceQuestion question={"I found it difficult to work up the initiative to do things"} questionNo={"5"}/>
                    <MultipleChoiceQuestion question={"I tended to over-react to situations"} questionNo={"6"}/>
                    <MultipleChoiceQuestion question={"I experienced trembling (eg, in the hands)"} questionNo={"7"}/>
                    <MultipleChoiceQuestion question={"I felt that I was using a lot of nervous energy"} questionNo={"8"}/>
                    <MultipleChoiceQuestion question={"I was worried about situations in which I might panic and make a fool of myself"} questionNo={"9"}/>
                    <MultipleChoiceQuestion question={"I felt that I had nothing to look forward to"} questionNo={"10"}/>
                    <MultipleChoiceQuestion question={"I found myself getting agitated "} questionNo={"11"}/>
                    <MultipleChoiceQuestion question={"I found it difficult to relax "} questionNo={"12"}/>
                    <MultipleChoiceQuestion question={"I felt down-hearted and blue"} questionNo={"13"}/>
                    <MultipleChoiceQuestion question={"I was intolerant of anything that kept me from getting on with what I was doing"} questionNo={"14"}/>
                    <MultipleChoiceQuestion question={"I felt I was close to panic"} questionNo={"15"}/>
                    <MultipleChoiceQuestion question={"I was unable to become enthusiastic about anything"} questionNo={"16"}/>
                    <MultipleChoiceQuestion question={"I felt I wasn't worth much as a person"} questionNo={"17"}/>
                    <MultipleChoiceQuestion question={"I felt that I was rather touchy "} questionNo={"18"}/>
                    <MultipleChoiceQuestion question={"I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat)"} questionNo={"19"}/>
                    <MultipleChoiceQuestion question={"I felt scared without any good reason "} questionNo={"20"}/>
                    <MultipleChoiceQuestion question={"I felt that life was meaningless"} questionNo={"21"}/>
                </Question>
                <Button color="secondary" onClick={handleSetResult}>Submit</Button>
            </Container>        
        </>
    );
  };
  
  export default hot(module)(Questionnaire)
  