

interface MenuProps {
    setPage: (page: string) => void;
    isLoggedIn: boolean;
    handleLogout: () => void;
}

function Menu(props: MenuProps) {
    return (
        <div>
            <button onClick={() => props.setPage("start")}>Start</button>
            <button onClick={() => props.setPage("register")}>Skapa ny användare</button>
            {props.isLoggedIn ? (
                <button onClick={props.handleLogout}>Logga ut</button>
            ) : (
                <button onClick={() => props.setPage("login")}>Logga in</button>
            )}
            <button onClick={() => props.setPage("checkin")}>Incheckning</button>
        </div>
    );
}

export default Menu;