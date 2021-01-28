import React, { useState, useEffect } from 'react'
import { BigSearchBar } from '../BigSearchBar/BigSearchBar'
import { Typography } from '@material-ui/core';

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
            <Typography variant="h2" align="center" gutterBottom>
              Welcome to FooDecisive!
            </Typography>
            <BigSearchBar/>
        </div>
    );
}
