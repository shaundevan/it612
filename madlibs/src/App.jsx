import { useState } from "react";
import PartOfSpeech from "./PartOfSpeech";
import Sentence from "./Sentence";

function App() {
    const [noun, setNoun] = useState("");
    const [verb, setVerb] = useState("");
    const [adjective, setAdjective] = useState("");
    const [place, setPlace] = useState("");
    const [showStory, setShowStory] = useState(false);

    function handleClick() {
        setShowStory(true);
    }

    function handleReset() {
        setNoun("");
        setVerb("");
        setAdjective("");
        setPlace("");
        setShowStory(false);
    }

    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
                React MadLibs
            </h1>

            <PartOfSpeech
                label="Noun"
                value={noun}
                onChange={setNoun}
                placeholder="e.g. dinosaur"
            />
            <PartOfSpeech
                label="Verb (past tense)"
                value={verb}
                onChange={setVerb}
                placeholder="e.g. danced"
            />
            <PartOfSpeech
                label="Adjective"
                value={adjective}
                onChange={setAdjective}
                placeholder="e.g. sparkly"
            />
            <PartOfSpeech
                label="Place"
                value={place}
                onChange={setPlace}
                placeholder="e.g. the moon"
            />

            {!showStory ? (
                <button
                    onClick={handleClick}
                    style={{
                        backgroundColor: "#3B82F6",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginTop: "8px",
                    }}
                >
                    Make My MadLib!
                </button>
            ) : (
                <>
                    <Sentence
                        noun={noun}
                        verb={verb}
                        adjective={adjective}
                        place={place}
                    />
                    <button
                        onClick={handleReset}
                        style={{
                            backgroundColor: "#6B7280",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            border: "none",
                            fontSize: "16px",
                            cursor: "pointer",
                            marginTop: "12px",
                        }}
                    >
                        Play Again
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
