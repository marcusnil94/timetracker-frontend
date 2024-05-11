import { useEffect, useState } from "react";

function Checkin() {
    const [checkedIn, setCheckedIn] = useState<boolean>(false);
    const [checkInId, setCheckInId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        const storedCheckInId = localStorage.getItem('checkInId');
        const storedCheckedIn = localStorage.getItem('checkedIn');
        
        if (storedCheckInId && storedCheckedIn) {
            setCheckInId(storedCheckInId);
            setCheckedIn(storedCheckedIn === 'true');
        }
    }, []);

    const handleCheckIn = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User not logged in');
                return;
            }
            
            const response = await fetch(`https://seal-app-du7qr.ondigitalocean.app/checkin/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: selectedCategory
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Check-in successful');
                localStorage.setItem('checkInId', data.id);
                localStorage.setItem('checkedIn', 'true');
                setCheckInId(data.id); 
                setCheckedIn(true); 
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
    
            const response = await fetch(`https://seal-app-du7qr.ondigitalocean.app/checkout/${checkInId}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
    
            if (response.ok) {
                console.log('Check-out successful');
                localStorage.removeItem('checkInId');
                localStorage.setItem('checkedIn', 'false');
                setCheckedIn(false); 
                setCheckInId(null);
    
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
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select category</option>
                <option value="Läsa">Läsa</option>
                <option value="Programmera">Programmera</option>
                <option value="Lunch">Lunch</option>
                <option value="Paus">Paus</option>
            </select>
            <br />
            {checkedIn ? (
                <button onClick={handleCheckOut}>Check out</button>
            ) : (
                <button onClick={handleCheckIn}>Check in</button>
            )}
        </div>
    );
}

export default Checkin;