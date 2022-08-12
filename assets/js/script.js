var dailyEventsStorage = new Array(9);
if(!localStorage.dailyEventsStorage) {
    localStorage.setItem("dailyEventsStorage", JSON.stringify(dailyEventsStorage));
}

function updateDocument() {
    var now = moment();
    document.getElementById("currentTime").textContent = now.format('MMMM Do YYYY, h:mm:ss a');
    console.log(now.format('H'));
    // Check if a timecard already happened today. If so, set its background color to gray
    for(i=0; i<=8; i++) {
        console.log(i);
        if(document.getElementById("timeStamp" + i).textContent <= now.format('H')) {
            document.getElementById("inputField" + i).style.backgroundColor = "gray";
        }
    }
}
updateDocument(); // Prevents user from having to wait 1 second to see the current time
setInterval(updateDocument, 1000);

function updateEvents() {
    var dailyEvents = JSON.parse(localStorage.dailyEventsStorage);
    for(i=0; i<= 8; i++) {
        document.getElementById("textInput" + i).value = dailyEvents[i]
    }
}
updateEvents();

// Executed every time the user clicks on the save buttons
function updateData() {
    var now = moment()
    for(i=0; i<=8; i++) {
        var temp =  document.getElementById("textInput" + i).value
        dailyEventsStorage[i] = temp;
        if(temp == "") {
            document.getElementById("inputField" + i).style.backgroundColor = "white";
        }
    }
    localStorage.setItem("dailyEventsStorage", JSON.stringify(dailyEventsStorage));
    document.getElementById("statusUpdate").textContent = "localStorage was updated at " + now.format('MMMM Do YYYY, h:mm:ss a');
}



