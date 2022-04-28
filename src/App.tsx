import React from 'react';
import './App.css';
import {Search} from "./Search/Search";

function App() {
    return (
        <div className="App">
            <header>
                <h1>Kino Poisk</h1>
            </header>
            <Search/>
            <main>Films</main>
            <footer className="footer">
                <p>Used by<a href="http://www.omdbapi.com/" target={'blank'}> OMDB API</a></p>
            </footer>
        </div>
    );
}

export default App;
