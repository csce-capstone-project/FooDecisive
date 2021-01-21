import React, { useState, useEffect } from 'react'

export function Home() {
    const [currentMessage, setMessage] = useState(0);

    // Basically like the old componentDidMount method. Like a constructor.
    useEffect(() => {
        fetch('/test').then(res => res.json()).then(data => {
          setMessage(data.message);
        });
      }, []);

    return(
        <div className="App">
            <header className="App-header">
                <p>{currentMessage}</p>
            </header>
        </div>
    );
}
