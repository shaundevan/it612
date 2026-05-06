function Sentence({ noun, verb, adjective, place }) {
    return (
        <div
            style={{
                backgroundColor: "#FEF9C3",
                border: "2px solid #EAB308",
                borderRadius: "8px",
                padding: "20px",
                marginTop: "20px",
                fontSize: "18px",
                lineHeight: "1.6",
            }}
        >
            <p>
                One day, a <strong>{adjective}</strong> <strong>{noun}</strong>{" "}
                {verb} all the way to <strong>{place}</strong>.
                Everyone was so impressed that they built a giant statue of the{" "}
                <strong>{adjective}</strong> <strong>{noun}</strong> right in
                the middle of <strong>{place}</strong>.
            </p>
        </div>
    );
}

export default Sentence;
