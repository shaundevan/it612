function PartOfSpeech({ label, value, onChange, placeholder }) {
    return (
        <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
                {label}:
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "100%",
                    fontSize: "16px",
                }}
            />
        </div>
    );
}

export default PartOfSpeech;
