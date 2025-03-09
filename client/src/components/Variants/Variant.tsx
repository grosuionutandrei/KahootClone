import React, {useEffect, useMemo, useState} from "react";
import {AnswerParams} from "../../paramModels/models.ts";
import {QuestionOptionDto} from "../../generated-client.ts";
import toast from "react-hot-toast";

export const Variant = (answerParams:AnswerParams) => {
    const colors = ["bg-red-500","bg-yellow-500","bg-blue-500","bg-green-500"];
    const [disabled,setDisabled] = useState<boolean>(answerParams.disabled);
    const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
    const [button, setButtons] = useState<{ shape: string, id: string, svg: JSX.Element }[]>([]);
    useEffect(() => {
        setDisabled(answerParams.disabled);
    }, [answerParams.disabled]);

    useEffect(() => {
        toast.success("options updated")
        toast.success(answerParams.options.length+"");
        setButtons(mapButtonsToQuestionId(answerParams.options));
    }, [answerParams.options]);



    const buttons = [
        { shape: "circle", id:"", svg: (
                <svg className="w-1/2 h-1/2 mx-auto" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )},
        { shape: "hexagon", id:"", svg: (
                <svg className="w-1/2 h-1/2 mx-auto"    fill="white" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path
                            d="M456.225,244.286L270.989,7.314C267.382,2.7,261.857,0,255.999,0c-5.856,0-11.381,2.7-14.989,7.314L55.775,244.286
                        c-5.378,6.884-5.378,16.544,0,23.428l185.236,236.972c3.608,4.616,9.132,7.314,14.989,7.314
                        c5.858,0,11.383-2.698,14.99-7.314l185.236-236.972C461.603,260.83,461.603,251.17,456.225,244.286z M255.999,477.522
                        L82.84,256L255.999,34.478L429.17,256L255.999,477.522z"
                            stroke="white"
                            strokeWidth={8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            )},
        { shape: "square", id:"", svg: (
                <svg className="w-1/2 h-1/2 mx-auto" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <rect
                        x="4"
                        y="4"
                        width="16"
                        height="16"
                        rx="2"
                        stroke="white"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )},
        { shape: "triangle", id:"", svg: (
                <svg className="w-1/2 h-1/2 mx-auto" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.2433 17.6513L10.5859 5.67095C11.0445 4.80456 11.2739 4.37136 11.5798 4.22973C11.8463 4.10637 12.1535 4.10637 12.42 4.22973C12.726 4.37136 12.9553 4.80456 13.414 5.67094L19.7565 17.6513C20.1668 18.4263 20.372 18.8138 20.3305 19.13C20.2943 19.4059 20.1448 19.6543 19.9179 19.8154C19.6579 19.9999 19.2194 19.9999 18.3425 19.9999H5.65737C4.78044 19.9999 4.34198 19.9999 4.08198 19.8154C3.85505 19.6543 3.70551 19.4059 3.66932 19.13C3.62785 18.8138 3.833 18.4263 4.2433 17.6513Z"
                        stroke="white"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
    ];

    const mapButtonsToQuestionId = (questionOptions:QuestionOptionDto[]) => {
        return buttons.map((btn,index) => {
            const matchingOption = questionOptions.find((option) => option.optionShape === btn.shape);
            return {
                ...btn,
                id: matchingOption ? matchingOption.optionId || "" : ""
            };
        });
    };


    const onAnswer = (value: string) => {
        toast.success(value);
        setSelectedButtonId(value);
        answerParams.retrieveValue(value);
    };

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full justify-center items-center">
            {button.map((btn, index) => (
                <button
                    key={btn.shape}
                    disabled={disabled}
                    className={`btn h-full w-full flex justify-center items-center p-6
        ${disabled ? (btn.id === selectedButtonId ? colors[index] : "bg-gray-400") : colors[index]}`}
                    onClick={() => onAnswer(btn.id!)}
                >
                    {btn.svg}
                </button>

            ))}
        </div>
    );
};
