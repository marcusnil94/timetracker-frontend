import { useState, useEffect } from "react";

interface CheckIn {
    id: string;
    category: string;
    checkInTime: string;
    checkOutTime: string;
}

function UserCheckins() {
    const [checkins, setCheckins] = useState<CheckIn[]>([]);

    useEffect(() => {
        const fetchCheckins = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User not logged in');
                    return;
                }

                const response = await fetch(`http://localhost:8080/checkins/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCheckins(data);
                } else {
                    console.error('Failed to fetch check-ins');
                }
            } catch (error) {
                console.error('Error fetching check-ins:', error);
            }
        };

        fetchCheckins();
    }, []);

    return (
        <div>
            <h2>Mina Incheckningar</h2>
            <ul>
                {checkins.map(checkin => (
                    <div key={checkin.id}>
                        <li>Uppgift: {checkin.category}</li>
                        <li>Checkin-tid: {checkin.checkInTime}</li>
                        <li>Utcheckning-tid: {checkin.checkOutTime}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default UserCheckins;