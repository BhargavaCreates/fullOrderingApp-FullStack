import React, { useEffect, useState } from 'react';

const orderSound = require("../sound/order_sound.wav")

export const CommonContext = React.createContext({});

export const CommonProvider: React.FC = ({ children }) => {
    const orderPrepared = new Audio(orderSound);

    const [progress, setProgress] = useState<number>(
        sessionStorage.getItem('progress')
            ? JSON.parse(sessionStorage.getItem('progress')!)
            : 0
    );

    const [cooking, setCooking] = useState<boolean>(
        sessionStorage.getItem('cooking')
            ? JSON.parse(sessionStorage.getItem('cooking')!)
            : true
    );

    useEffect(() => {
        if (cooking && progress < 100 && progress > 0) {
            replicateChef()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const replicateChef = () => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                sessionStorage.setItem("progress", JSON.stringify(prevProgress));
                if (prevProgress === 100) {
                    setCooking(false)
                    sessionStorage.setItem("cooking", JSON.stringify(false));
                    clearInterval(timer)
                    orderPrepared.play();
                }
                return (prevProgress === 100 ? 100 : prevProgress + 2)
            });
        }, 500);

        // const cookingTimeOut = setTimeout(() => {
        //     setCooking(false)
        //     sessionStorage.setItem("cooking", JSON.stringify(false));
        //     clearInterval(timer);
        // }, 25300)
    }

    return (
        <CommonContext.Provider
            value={{
                progress,
                cooking,
                replicateChef,
                setCooking
            }}
        >
            {children}
        </CommonContext.Provider>
    );

}
