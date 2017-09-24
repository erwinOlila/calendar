const daysName    = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months      = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthIndex  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const days = document.querySelector('.days');

const gpcon     = Array.from(document.querySelectorAll('.glyphicon'));
const prevMonth = document.querySelector('.glyphicon-chevron-left');
const nextMonth = document.querySelector('.glyphicon-chevron-right');
const monthName = document.querySelector('.month');
const currYear  = document.querySelector('.year');
const weekdays  = document.querySelector('.weekdays');

var year;
var febDays;

prevMonth.addEventListener('click', prevMon);
nextMonth.addEventListener('click', nextMon);
gpcon.forEach(icon => {
  icon.addEventListener('mouseover', function(){
    this.classList.add('colorize');
  });
  icon.addEventListener('mouseout', function(){
    this.classList.remove('colorize');
  })
})

var currMon = 0;

function nextMon() {
  currMon++;

  // remove  the first element and insert it at the last
  monthIndex.push(monthIndex.shift());
  months.push(months.shift());
  daysInMonth.push(daysInMonth.shift());
  makeCalendar();
}

function prevMon() {
  currMon--;

  // remove the last element and insert it at the first
  monthIndex.unshift(monthIndex.pop());
  months.unshift(months.pop());
  daysInMonth.unshift(daysInMonth.pop());
  makeCalendar();
}

function makeCalendar() {
  // gets the current date month and the first day of the tmonth
  var currentTime = new Date();
  var month       = currentTime.getMonth();
  year            = currentTime.getFullYear() + Math.floor((month+currMon)/12);
  var firstDay    = new Date(year, monthIndex[month], 1).getDay();
  var today       = currentTime.getDate();

  daysInMonth[monthIndex.indexOf(1)] = (year%4 ? 28 : 29);

  monthName.innerHTML = months[month];
  currYear.innerHTML  = year;

  var day = 0;
  var daysRow;

  // create the row for weekdays
  weekdays.innerHTML = '';
  for(var i = 0; i < daysName.length; i++){
    weekdays.innerHTML += `<div class="days-name">${daysName[i]}</div>`;
  }

  for (var i = 1; i < 7; i++){
    // populate each square by the icrementing 'day'
    daysRow = document.querySelector(`.cal-row[data-r="${i}"]`);
    daysRow.innerHTML = '';
    for(var j = 1; j < 8; j++ ) {
      if ((i == 1 && j < firstDay+1)) {
        day = ''; // if at first row, the firstday's column is not yet reached, this will set the value to blank
      }
      else {
        day++; // starts incrementing
      }
      // check if the date is today's date
      if (day == today && month == monthIndex[month] && year == currentTime.getFullYear()) {
        daysRow.innerHTML += `<div class="day today" data-d='${day}'>${day}</div>`
      } else {
        daysRow.innerHTML += `<div class="day" data-d='${day}'>${day}</div>`
      }

    }
  }

  var blank = Array.from(document.querySelectorAll('.day'));
  const empty = ((blank.filter(day => day.textContent == '')).length); // get the number of blank squares

  var n = 0;
  var m = 0;

  blank.forEach(day => {
    // replaces the blank squares with the previous's days
    if (day.textContent > daysInMonth[month]) {
      day.textContent = ++m;
      day.classList.add('extra');
    }
  })
  if(empty){ // if there is a blank square
    blank.forEach(day => {
      // replaces the exceeding days for the nex month's days
      if (day.textContent == '') {
        day.textContent = daysInMonth[month-1] - (empty-1-(n++));
        day.classList.add('extra');
      }
    })
  }




  var dummy = document.querySelector(`.day[data-r="${firstDay}"]`);
  /*for (var i = firstDay; i < daysInMonth[month]; i++) {
    document.querySelector(`.day[data-r="${i}"]`).innerHTML = i;
  }*/
}
