import {useEffect, useRef, useState} from "react";
import {CounterParams} from "../../paramModels/models.ts";

export const CountdownTimer = (counterParams:CounterParams) => {
    const [count, setCount] = useState(counterParams.limit);
    const completed = useRef(false);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        } else if (completed) {
            counterParams.onComplete()
        }
        completed.current=true;
    }, [count, completed]);

    return (
        <div className="flex justify-center items-center h-1/4 bg-orange-300 text-black text-6xl font-bold">
            {count > 0 ? count : "Go!"}
        </div>
    );
};
