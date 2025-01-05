let myInterval;
let isTimerExpired;

function updateTimer(startTime, endTime) {
    const currTime = new Date().getTime(); //calculate current time
    
    //calculate the parameters for the progress bar
    const timeCovered = currTime - startTime;
    const timePending = endTime - currTime;

    //calculate days, mins, hrs, secs for the countdown blocks from the time pending :
    
    //1 day = 24 * 60 * 60 * 1000 ms
    const days = Math.floor(timePending/(24 * 60 * 60 * 1000)); //x days + y ms inside floor method

    //1 hour = 60 * 60 * 1000 ms
    const hrs = Math.floor((timePending%(24 * 60 * 60 * 1000))/(60 * 60 * 1000)); //x hrs + y ms inside floor method

    //1 min = 60 * 1000 ms
    const mins = Math.floor(((timePending%(24 * 60 * 60 * 1000))%(60 * 60 * 1000))/(60 * 1000)); //x mins + y ms inside floor method

    //1 sec = 1000 ms
    const secs = Math.floor((((timePending%(24 * 60 * 60 * 1000))%(60 * 60 * 1000))%(60 * 1000))/(1000)); //x secs + y ms inside floor method

    //now show these in UI
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hrs;
    document.getElementById("minutes").textContent = mins;
    document.getElementById("seconds").textContent = secs;

    //calculate width percentage for progress bar
    const totalTime = endTime - startTime;
    const timeCoveredPercentage = (timeCovered/totalTime)*100;

    //set width for progress bar to show in UI
    document.querySelector(".progress-bar").style.width = timeCoveredPercentage+"%";

    //expiring the timer and clearing the set interval
    if((days==0 && hrs==0 && mins==0 && secs==0) || timePending<=0){
        clearInterval(myInterval);
        isTimerExpired = true;
        document.querySelector(".countdown").textContent = "EXPIRED";
        document.querySelector(".progress-bar").style.width = "100%";
    }
}

document.getElementById('start-button').addEventListener('click', function () {
    const endTimeInput = document.getElementById('end-time').value;
    isTimerExpired = false;

    // Ensure the input is provided
    if (!endTimeInput) {
        alert("Please provide the end time.");
        return;
    }

    //fetch the actual times in ms
    const startTime = new Date().getTime(); //the current time at this instant is marked as the start time
    const endTime = new Date(endTimeInput).getTime();

    // Ensure the end time is after the start time
    if (endTime <= startTime) {
        alert("End time must be after start time.");
        return;
    }

    document.querySelector(".welcome-container").style.opacity = 0;
    document.querySelector(".form-container").style.opacity = 0;
    document.querySelector(".timer-container").style.opacity = 1;
    document.querySelector(".display-header").style.opacity = 1;

    // After 0.5 seconds, set position of welcome container to absolute and change the displays of the 
    // elements who have a transition on their opacity
    setTimeout(() => {
        document.querySelector(".welcome-container").style.position = "absolute";
        document.querySelector(".form-container").style.display = "none";
        document.querySelector(".timer-container").style.display = "block";
        document.querySelector(".display-header").style.display = "flex";

        document.getElementById("start-display").textContent = "Start: " + new Date(startTime).toLocaleString();
        document.getElementById("end-display").textContent = "End: " + new Date(endTime).toLocaleString();
    }, 500); // 500 ms = 0.5 seconds

    // Start the countdown
    myInterval = setInterval(() => updateTimer(startTime, endTime), 1000);
});

document.getElementById('reset-button').addEventListener('click', function () {
    if(!isTimerExpired)
    clearInterval(myInterval); //clear the current running interval if the timer didn't expire and yet the reset button was clicked
    else { //reset the timer UI if the timer expired
        document.querySelector(".countdown").innerHTML = `
        <div>
            <span id="days">00</span>
            days
        </div>
        <div>
            <span id="hours">00</span>
            hrs
        </div>
        <div>
            <span id="minutes">00</span>
            mins
        </div>
        <div>
            <span id="seconds">00</span>
            secs
        </div>
        `;
        document.querySelector(".progress-bar").style.width = "0%";
    }
    
    document.querySelector(".form-container").style.opacity = 1;
    document.querySelector(".timer-container").style.opacity = 0;
    document.querySelector(".display-header").style.opacity = 0;

    // After 0.5 seconds, change the displays of the elements who have a transition on their opacity
    setTimeout(() => {
        document.querySelector(".form-container").style.display = "block";
        document.querySelector(".timer-container").style.display = "none";
        document.querySelector(".display-header").style.display = "none";
    }, 500); // 500 ms = 0.5 seconds
});