import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import Quiz from "./Quiz";
import Wallet from "./Wallet";
import Character from "./Character";
import Arena from "./Arena";
import Result from "./Result";
import Win from "./Win";
import Lose from "./Lose";


const steps = [
    { id: "quiz" },
    { id: "wallet" },
    { id: "character" },
    { id: "arena" },
    { id: "result" },
    { id: "win" },
    { id: "lose" }

];

const defaultData = {
    personType: '',
    scoreTotal: '',
    character: '',
    isMinted: false,
    hasBattled: false,
    hasBattled2: false
};

const Game = () => {
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    const [formData, setForm] = useForm(defaultData);
    const { go } = navigation;

    const props = { formData, setForm, navigation};

    switch (id) {
        case "quiz":
            return <Quiz {...props} />;
        case "wallet":
            return <Wallet {...props} />;
        case "character":
            return <Character {...props} />;
        case "arena":
            return <Arena {...props} />;
        case "result":
            return <Result {...props} />;
        case "win":
            return <Win {...props} />;    
        case "lose":
            return <Lose {...props} />;     
        default:
            return null;
    }
};
export default Game;
