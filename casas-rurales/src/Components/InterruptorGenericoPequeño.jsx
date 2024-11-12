import React, { useState, useEffect } from 'react';
import './InterruptorGenerico.css';

function InterruptorGenericoPequeño({ onToggle, index }) { // Acepta onToggle como prop
    const [isOn, setIsOn] = useState(() => {
        const savedState = localStorage.getItem("interruptorState");
        return savedState === "true";
    });

    useEffect(() => {
        localStorage.setItem("interruptorState", isOn);
        if (onToggle) onToggle(index, isOn);  // Llama a la función onToggle si está definida
    }, [isOn, onToggle]);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="interruptor-peq-container" onClick={handleToggle}>
            <div className={`interruptor-peq ${isOn ? "on" : ""}`}>
                <div className="interruptor-peq-circle"></div>
            </div>
        </div>
    );
}

export default InterruptorGenericoPequeño;
