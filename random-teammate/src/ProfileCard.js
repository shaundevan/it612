export default function ProfileCard({ name, email, image }) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", textAlign: "center", width: "250px" }}>
            <img src={image} alt="profile" style={{ borderRadius: "50%" }} />
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
}
