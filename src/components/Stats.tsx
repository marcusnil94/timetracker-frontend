import { useState, useEffect } from 'react';

function Stats() {
    const [weeklyStats, setWeeklyStats] = useState<{ weekStartDate: string; weekEndDate: string; stats: { [category: string]: { totalHours: number; totalMinutes: number } } }[]>([]);

    useEffect(() => {
        const fetchWeeklyStats = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User not logged in');
                    return;
                }

                const response = await fetch(`http://localhost:8080/weekstats/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setWeeklyStats(data);
                } else {
                    console.error('Failed to fetch weekly stats');
                }
            } catch (error) {
                console.error('Error fetching weekly stats:', error);
            }
        };

        fetchWeeklyStats();
    }, []);

    return (
        <div>
            <h2>Veckostatistik</h2>
            {weeklyStats.map((weeklyStat, index) => (
                <div key={index}>
                    <h3>Vecka {weeklyStat.weekStartDate} - {weeklyStat.weekEndDate}</h3>
                    <ul>
                    {Object.entries(weeklyStat.stats).map(([category, data]) => (
                        <li key={category}>
                            Kategori: {category}, Totalt tid: {data.totalHours} timmar {data.totalMinutes} minuter
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Stats;