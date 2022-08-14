// dailyEventsStorage is effectively the same as what is in localStorage
var dailyEventsStorage = new Array(9).fill("");
if(!localStorage.dailyEventsStorage) {
    localStorage.setItem("dailyEventsStorage", JSON.stringify(dailyEventsStorage));
}
// Add all the daily events to the text boxes first so that updateDocument() can adjust the border colors of the time cards based off of this.
var dailyEvents = JSON.parse(localStorage.dailyEventsStorage);
for(i=0; i<= 8; i++) {
    document.getElementById("textInput" + i).value = dailyEvents[i]
}

// Colorize the time cards based on whether or not they are in the past and/or have an event scheduled
function updateDocument() {
    var now = moment();
    document.getElementById("currentTime").textContent = now.format('MMMM Do YYYY, h:mm:ss a');

    for(i=0; i<=8; i++) {
        // If time card is in the past
        if( document.getElementById("timeStamp" + i).textContent <= now.format('H') ) {
            document.getElementById("inputField" + i).style.backgroundColor = "gray";
            // If this timecard already happened and had an event scheduled for it
            if( document.getElementById("textInput" + i).value ) {
                document.getElementById("inputField" + i).style.borderColor = "red";
            } else {
                document.getElementById("inputField" + i).style.borderColor = "black";
            }
        }
        // If timecard is in the future and has something scheduled for it
        else {
            document.getElementById("inputField" + i).style.backgroundColor = "white";

            if( document.getElementById("textInput" + i).value ) {
                document.getElementById("inputField" + i).style.borderColor = "green";
            }
            else {
                document.getElementById("inputField" + i).style.borderColor = "black";
            }
        }
    }
}
updateDocument(); // Prevents user from having to wait 1 second to see the current time and colors of the document
setInterval(updateDocument, 1000);

// Executed every time the user clicks on the save buttons. Each time slot is saved individually by each save button.
function updateData(index) {
    var dailyEventsStorage = JSON.parse(localStorage.dailyEventsStorage);

    if( document.getElementById("textInput" + index).value ) {
        dailyEventsStorage[index] = document.getElementById("textInput" + index).value;
    } else {
        dailyEventsStorage[index] = "";
    }
    localStorage.setItem("dailyEventsStorage", JSON.stringify(dailyEventsStorage));

    var now = moment()
    // Ex. Item 1 in localStorage was updated at August 14th 2022, 1:26:02 am with pet doggos
    document.getElementById("statusUpdate").textContent = "Item " + (index+1) + " in localStorage was updated at " + now.format('MMMM Do YYYY, h:mm:ss a') + " with \"" + dailyEventsStorage[index] + "\"";
    updateDocument();
}



