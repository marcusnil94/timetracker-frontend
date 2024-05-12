interface MenuProps {
    setPage: (page: string) => void;
    isLoggedIn: boolean;
    handleLogout: () => void;
}

function Menu({ setPage, isLoggedIn, handleLogout }: MenuProps) {
    return (
        <div>
            <button onClick={() => setPage("start")}>Start</button>
            {!isLoggedIn && <button onClick={() => setPage("register")}>Skapa ny användare</button>}
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logga ut</button>
            ) : (
                <button onClick={() => setPage("login")}>Logga in</button>
            )}
            <button onClick={() => setPage("checkin")}>Incheckning</button>
            <button onClick={() => setPage("usercheckins")}>Mina Incheckningar</button>
            <button onClick={() => setPage("stats")}>Veckostatistik</button>
        </div>
    );
}

export default Menu;