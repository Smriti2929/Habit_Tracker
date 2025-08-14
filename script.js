//Get the Date //
var date = new Date(); //create an instance of Date object
console.log(date); //print date to console

//Extract The Current Date Info//
var currentMonth = date.getMonth();
var currentDay= date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log("The current month is " + currentMonth); //current month - 1
console.log("The current weekday is " + currentDay); //day of the week
console.log("The current date is " + currentDate); //current date number
console.log("The current year is " + currentYear); //current year

//Important Date Info //
var months = [
    "January", //0
    "February", //1
    "March", //2
    "April", //3
    "May", //4
    "June",//5
    "July",//6
    "August",//7 <- current
    "September",//8 
    "October",//9
    "November",//10
    "December"//11
];

//Set the Correct Month//
var title = document.getElementById("title"); //reference to the title
title.innerHTML = "🌸" + months[currentMonth] + "🌸";//change title to current month

//Update The Calendar Info//
var habitTitle = document.getElementById("habitTitle"); //reference to habit
habitTitle.onclick = function (){

    //ask a question & save the answer to habits 
    let habits = prompt("What's your habit", habitTitle.innerHTML);
    if(habits.length == 0){ //if ther is no entry for habits
        habitTitle.innerHTML = "Click to set your habit";
    }
    else{ //update the habit to show what the chose in habits aur typed
        habitTitle.innerHTML = habits;    
    }
} 

    //Set The Total Days//
    var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var daysInThisMonth = daysInTheMonthList[currentMonth];
    //eg 1st index => 2nd month => Feb => 28 days

    var daysCompleted = 0;
    var totalDays = document.getElementById("totalDays");//reference to the days fraction
    totalDays.innerHTML = "0/" + daysInThisMonth; //updated fraction of dates in each month
    
    //Set The Calendar//
    var dayCount = 0;
    var rowCount = 0;
    var days = document.getElementsByClassName("days");//store a list of all the rows

    for(var i=0; i<days.length; i++){//search each row 
        var day = days[rowCount].getElementsByClassName("day");//temporarily choose a row
        for (var j = 0; j < day.length; j++){ //select column one by one
            
            //add a border to current date
            if (dayCount == currentDate - 1){
                day[j].setAttribute("style", "color: rgb(234,1,144); border: 2px solid black;");
            }

            //update the correct date number and id and hide any excess numbers
            if (dayCount < daysInThisMonth){
                day[j].innerHTML = dayCount + 1;
                day[j].setAttribute("id", "day" + (dayCount + 1));
                dayCount++; //repeat for every day
            } else {
                day[j].innerHTML = "";
                day [j].setAttribute("style", "background-color:white");
            }
        } 
        rowCount++;  //repeat for every row
    }

  //Initialise Completed Array
  var completed = new Array(31);
  for (var i =0; i < dayCount; i++){
    var tempString =
    "" + (currentMonth +1) + "-" + (i+1) + "-" + currentYear;
    console.log("storing date: " + tempString );
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if(tempDay == null || tempDay == "false"){
        localStorage.setItem(tempString, "false");
    } else if(tempDay == "true"){
        daysCompleted ++;
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
  }  
  console.log("completed array: " + completed);
  console.log("total days completed: " + daysCompleted);

  //check Storage and Update Completed Array//
  for (var i = 0; i < currentDate; i++){
    var tempString = 
    "" + (currentMonth +1) + "-" + (i+1) + "-" + currentYear;
    console.log(tempString);

    var chosenDay = localStorage.getItem(tempString);
    console.log(i+1 + ": " + chosenDay);
    var chosenDayDiv = document.getElementById("day" + (i+1));
    if (chosenDay ==="true"){
        chosenDayDiv.style.backgroundColor = "pink";
    } else if(chosenDay === "false"){
        chosenDayDiv.style.backgroundColor = "white";
    }
  }

  //Update Completed on Calendar//
  var dayDivs = document.querySelectorAll(".day");
  for(var i=0; i<currentDate; i++){
    dayDivs [i].onclick = function (e){
        var num = parseInt(e.target.innerText);
        var selectedDate = document.getElementById(e.target.id);
        var storageString = "" + (currentMonth +1) + "-"+num + "-" + currentYear;

        if(localStorage.getItem(storageString) === "false"){
            selectedDate.style.backgroundColor = "pink";
            localStorage.setItem(storageString, "true");
            daysCompleted ++;

            // Daily encouragement alert
        if (num === currentDate) {
            alert("Good! Keep going!");
        }
        } else if (localStorage.getItem(storageString) === "true") {
            selectedDate.style.backgroundColor = "white";
            localStorage.setItem(storageString, "false");
            daysCompleted--;
        }
    
        totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
        
        // Catch-up to today alert (optional)
    if (daysCompleted === currentDate) {
        alert("Nice! You're all caught up!");
    }

    // End-of-month success
    if (daysCompleted === daysInThisMonth) {
        alert("🎉 Great progress! You completed the whole month!");
    }
        
        
        //console.log(daysCompleted , currentDate);
        //if(daysCompleted === currentDate){
          //  alert("great progress!");
        //}
    };
}

  //Reset Button//
  var resetButton = document.getElementById("resetButton");
  resetButton.onclick = function(){
    for (var i =0; i < dayCount; i++){
        var tempStrings = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
        localStorage.setItem(tempStrings, "false");
        var curDay = document.getElementById("day" + (i + 1));
        curDay.style.backgroundColor ="white";
    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;

  }

