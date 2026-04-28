import React, { useState, useEffect, useRef } from "react";
import '../css/heroPage.css';

const HeroPage = ({ hero, onBack }) => {
    const [step, setStep] = useState(0);

    // We create the audio object here
    const audioRef = useRef(new Audio(`${import.meta.env.BASE_URL}audio/${hero.name.toLowerCase()}.mp3`));

    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        audioRef.current.muted = !isMuted;
        // If it was blocked, this click will "unblock" it
        audioRef.current.play();
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = 0.4;

        // 1. Get the times from your JSON (the ones you just added!)
        const start = hero.startTime || 0;
        const end = hero.endTime || 120; // Default to 120s if no end time is found

        // 2. Set the audio to the start time immediately
        audio.currentTime = start;

        // 3. This function checks the time constantly while the song plays
        const handleTimeUpdate = () => {
            if (audio.currentTime >= end) {
                audio.currentTime = start; // Jump back to your start point
            }
        };

        // 4. Add the "time listener"
        audio.addEventListener("timeupdate", handleTimeUpdate);

        audio.play().catch(e => console.log("User interaction needed for audio"));

        // 5. Cleanup: Stop music and remove the listener when leaving the page
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [hero.name, hero.startTime, hero.endTime]); // Re-run if any of these change

    // Navigation logic
    const nextStep = () => { if (step < 2) setStep(step + 1); };
    const prevStep = () => { if (step > 0) setStep(step - 1); };

    return (
        <div className="hero-page-container">
            {step === 2 && (
                <button className="return-button" onClick={onBack}>BACK TO HEROES</button>
            )}

            <button className="audio-control-btn" onClick={toggleMute}>
                {isMuted ? "🔈 Unmute" : "🔊 Mute"}
            </button>

            <h2 className="hero-title">{hero.name}</h2>

            <div className="hero-details">
                <img
                    src={`${import.meta.env.BASE_URL}images/${hero.name.toLowerCase()}.jpg`}
                    alt={hero.name}
                    className="hero-detail-image"
                />
                <div className="hero-text-content">
                    <div className="story-scroll-area">
                        {step === 0 && (
                            <div className="info-fade">
                                <p><strong>Greek Name:</strong> {hero.greekName}</p>
                                <p><strong>Origin:</strong> {hero.origin}</p>
                                <p><strong>Parents:</strong> {hero.parents.father} & {hero.parents.mother}</p>
                                <p><strong>Special Abilities:</strong> {hero.specialAbilities.join(", ")}</p>
                                <p><strong>Fate:</strong> {hero.fate}</p>
                            </div>
                        )}
                        {step === 1 && <p className="hero-paragraph info-fade">{hero.storyPart1}</p>}
                        {step === 2 && <p className="hero-paragraph info-fade">{hero.storyPart2}</p>}
                    </div>

                    <div className="nav-controls">
                        <button className="button" onClick={prevStep} disabled={step === 0}>{"<<"}</button>
                        <span className="page-indicator">{step + 1} / 3</span>
                        <button className="button" onClick={nextStep} disabled={step === 2}>{">>"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroPage;