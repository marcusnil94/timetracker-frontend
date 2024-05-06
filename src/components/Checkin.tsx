import { useState } from "react";

function Checkin() {
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkInId, setCheckInId] = useState(null); // State to store the check-in id

    const handleCheckIn = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User not logged in');
                return;
            }
            
            const response = await fetch(`http://localhost:8080/checkin/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // You can include additional check-in data here if needed
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Check-in successful');
                setCheckInId(data.id); // Save the check-in id to state
                setCheckedIn(true); // Update state to indicate that the user has checked in
            } else {
                console.error('Failed to check in');
            }
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    const handleCheckOut = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId || !checkInId) {
                console.error('User not logged in or no check-in found');
                return;
            }

            const response = await fetch(`http://localhost:8080/checkout/${checkInId}`, {
                method: 'PATCH', // Use PATCH method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // You can include additional check-out data here if needed
                }),
            });
            if (response.ok) {
                console.log('Check-out successful');
                setCheckedIn(false); // Update state to indicate that the user has checked out
                setCheckInId(null); // Reset the check-in id
            } else {
                console.error('Failed to check out');
            }
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };

    return (
        <div>
            <h1>Check in</h1>
            {checkedIn ? (
                <button onClick={handleCheckOut}>Check out</button>
            ) : (
                <button onClick={handleCheckIn}>Check in</button>
            )}
        </div>
    );
}

export default Checkin;