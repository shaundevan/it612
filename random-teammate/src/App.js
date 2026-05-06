import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();
            setUser(data.results[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <h1>Finding a teammate...</h1>;

    return (
        <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <h1>Teammate Generator</h1>

            {user && (
                <ProfileCard
                    name={`${user.name.first} ${user.name.last}`}
                    email={user.email}
                    image={user.picture.large}
                />
            )}

            <button
                onClick={fetchUser}
                style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
            >
                Hire Someone Else
            </button>
        </div>
    );
}
