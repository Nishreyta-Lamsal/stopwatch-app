import React, {useState, useEffect, useRef} from 'react';

function StopWatch(){

    const[isRunning, setIsRunning] = useState(false);
    const[elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function start(){

        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){

        setIsRunning(false);

    }

    function reset(){

        setElapsedTime(0);
        setIsRunning(false);

    }

    function formatTime(){

        //turning milliseconds to hour
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        //convert hours to string and pad the number with 2 zero characters
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");
        
        return(`${hours}: ${minutes}: ${seconds}: ${milliseconds}`)

    }
    return(
        <div className="stopwatch-container">
            <div className="display-time"> {formatTime()} </div>
                <div className="buttons">
                    <button className='start' onClick={start}> Start</button>
                    <button className='stop' onClick={stop}> Stop</button>
                    <button className='reset' onClick={reset}> Reset</button>
                </div>
        </div>
    )}

export default StopWatch 