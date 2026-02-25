import React from "react";
import { useState } from "react";
import '../css/heroPage.css';


const HeroPage = ({ hero, onBack }) => {
    const [step, setStep] = useState(0);

    // Navigation logic
    const nextStep = () => {
        if (step < 2) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="hero-page-container">
            {step === 2 && (
                <button className="return-button" onClick={onBack}>BACK TO HEROES</button>
            )}

            <h2 className="hero-title">{hero.name}</h2>
            {/* <h3 >{hero.storyTitle}</h3> */}


            <div className="hero-details">
                <img
                    src={`src/assets/images/${hero.name}.jpg`}
                    alt={hero.name}
                    className="hero-detail-image"
                />
                <div className="hero-text-content">
                    {/* Wrap the dynamic text in its own div */}
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

                    {/* Navigation buttons stay in a fixed spot below the text */}
                    <div className="nav-controls">
                        <button className="button" onClick={prevStep} disabled={step === 0}>{"<<"}</button>
                        <span className="page-indicator">{step + 1} / 3</span>
                        <button className="button" onClick={nextStep} disabled={step === 2}>{">>"}</button>
                    </div>
                </div>            </div>
        </div>
    );
};

export default HeroPage;