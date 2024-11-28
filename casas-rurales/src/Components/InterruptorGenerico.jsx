import React, { useState, useEffect } from 'react';
import './InterruptorGenerico.css';

function InterruptorGenerico({ onToggle, isOnInicial=true }) { // Acepta onToggle como prop
    const [isOn, setIsOn] = useState(isOnInicial)

    useEffect(() => {
        if (onToggle) onToggle(isOn);  // Llama a la función onToggle si está definida
    }, [isOn]);

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
