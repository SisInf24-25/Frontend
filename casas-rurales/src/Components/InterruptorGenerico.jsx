import React, { useState, useEffect } from 'react';
import './InterruptorGenerico.css';

function InterruptorGenerico({ onToggle }) { // Acepta onToggle como prop
    const [isOn, setIsOn] = useState(() => {
        const savedState = localStorage.getItem("interruptorState");
        return savedState === "true";
    });

    useEffect(() => {
        localStorage.setItem("interruptorState", isOn);
        if (onToggle) onToggle(isOn);  // Llama a la función onToggle si está definida
    }, [isOn, onToggle]);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="interruptor-container" onClick={handleToggle}>
            <div className={`interruptor ${isOn ? "on" : ""}`}>
                <div className="interruptor-circle"></div>
            </div>
        </div>
    );
}

export default InterruptorGenerico;
