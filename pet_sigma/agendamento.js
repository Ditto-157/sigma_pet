var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();
var selectedDate = null;
var selectedTime = null;

function generateCalendar() {
  var calendarBody = document.getElementById("calendar-body");
  calendarBody.innerHTML = "";

  var startDate = new Date(currentYear, currentMonth, 1);
  var endDate = new Date(currentYear, currentMonth + 1, 0);
  var currentRow = document.createElement("tr");

  // Get the last day of the previous month
  var lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Add cells for the days of the previous month
  var startDay = startDate.getDay();
  for (var i = startDay; i > 0; i--) {
    var prevMonthCell = document.createElement("td");
    prevMonthCell.innerText = lastDayOfPrevMonth - (i - 1);
    prevMonthCell.classList.add("previous-month");
    prevMonthCell.dataset.date = new Date(currentYear, currentMonth - 1, lastDayOfPrevMonth - (i - 1)).toLocaleDateString();
    prevMonthCell.onclick = function() {
      selectDate(this);
    };
    currentRow.appendChild(prevMonthCell);
  }

  // Add cells for the days of the current month
  while (startDate <= endDate) {
    var currentCell = document.createElement("td");
    currentCell.innerText = startDate.getDate();
    currentCell.dataset.date = startDate.toLocaleDateString();
    currentCell.onclick = function() {
      selectDate(this);
    };
    currentRow.appendChild(currentCell);

    if (startDate.getDay() === 6) {
      calendarBody.appendChild(currentRow);
      currentRow = document.createElement("tr");
    }

    startDate.setDate(startDate.getDate() + 1);
  }

  // Add remaining cells for the next month
  var endDay = endDate.getDay();
  for (var i = 1; i < 7 - endDay; i++) {
    var nextMonthCell = document.createElement("td");
    nextMonthCell.innerText = i;
    nextMonthCell.classList.add("previous-month");
    nextMonthCell.dataset.date = new Date(currentYear, currentMonth + 1, i).toLocaleDateString();
    nextMonthCell.onclick = function() {
      selectDate(this);
    };
    currentRow.appendChild(nextMonthCell);
  }

  calendarBody.appendChild(currentRow);
}

function selectDate(dateElement) {
  var selectedElements = document.getElementsByClassName("selected");
  for (var i = 0; i < selectedElements.length; i++) {
    selectedElements[i].classList.remove("selected");
  }

  dateElement.classList.add("selected");
  selectedDate = dateElement.dataset.date;
  document.getElementById("selected-date").innerText = "Data selecionada: " + selectedDate;
}

function selectTime(timeElement) {
  var selectedElements = document.getElementsByClassName("selected");
  for (var i = 0; i < selectedElements.length; i++) {
    selectedElements[i].classList.remove("selected");
  }

  timeElement.classList.add("selected");
  selectedTime = timeElement.dataset.time;
  document.getElementById("selected-time").innerText = "Horário selecionado: " + selectedTime;
}

function updateMonthLabel() {
  var monthLabel = document.getElementById("current-month");
  var monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  monthLabel.innerText = monthNames[currentMonth] + " " + currentYear;
}

function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateMonthLabel();
  generateCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateMonthLabel();
  generateCalendar();
}

generateCalendar();
updateMonthLabel();

var timeSlots = document.getElementsByClassName("time-slot");
for (var i = 0; i < timeSlots.length; i++) {
  timeSlots[i].onclick = function() {
    selectTime(this);
  };
}

document.addEventListener("DOMContentLoaded", function() {
  const filterButton = document.getElementById("filter-button");
  const filterMenu = document.getElementById("filter-menu");

  filterButton.addEventListener("click", function() {
    filterMenu.style.display = filterMenu.style.display === "block" ? "none" : "block";
  });

  const submenus = document.getElementsByClassName("submenu");

  Array.from(submenus).forEach(function(submenu) {
    const parent = submenu.parentNode;
    parent.addEventListener("click", function() {
      submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    });
  });
});

// JavaScript (script.js)
document.addEventListener('DOMContentLoaded', function () {
  const days = document.querySelectorAll('#calendar-table td:not(.prev-month)');
  const timeSlots = document.querySelectorAll('.time-slot');

  days.forEach(function (day) {
    day.addEventListener('click', function () {
      const selectedDate = this.innerText;
      // Exibe a data selecionada
      console.log('Data selecionada:', selectedDate);
    });
  });

  timeSlots.forEach(function (timeSlot) {
    timeSlot.addEventListener('click', function () {
      const selectedDate = this.getAttribute('data-date');
      const selectedTime = this.getAttribute('data-time');
      // Exibe a data e hora selecionadas
      console.log('Data selecionada:', selectedDate);
      console.log('Hora selecionada:', selectedTime);
    });
  });
});

// JavaScript (script.js)
document.addEventListener('DOMContentLoaded', function () {
  const days = document.querySelectorAll('#calendar-table td:not(.prev-month)');
  const timeSlots = document.querySelectorAll('.time-slot');
  const selectedDateElement = document.getElementById('selected-date');
  const selectedTimeElement = document.getElementById('selected-time');

  days.forEach(function (day) {
    day.addEventListener('click', function () {
      const selectedDate = this.innerText;
      selectedDateElement.textContent = `Data: ${selectedDate}`;
    });
  });

  timeSlots.forEach(function (timeSlot) {
    timeSlot.addEventListener('click', function () {
      const selectedDate = this.getAttribute('data-date');
      const selectedTime = this.getAttribute('data-time');
      selectedDateElement.textContent = `Data: ${selectedDate}`;
      selectedTimeElement.textContent = `Hora: ${selectedTime}`;
    });
  });
});
