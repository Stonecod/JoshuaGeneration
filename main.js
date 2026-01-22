document.addEventListener("DOMContentLoaded", () => {

  function generateCalendar() {
    const container = document.getElementById('calendar-container');
    if (!container) return;

    container.innerHTML = '';

    const year = 2026;
    const month = 0;
    const monthName = "January";

    const title = document.createElement('h4');
    title.textContent = monthName + ' ' + year;
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'calendar';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    days.forEach(d => {
      const th = document.createElement('th');
      th.textContent = d;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let row = document.createElement('tr');

    for (let i = 0; i < firstDay; i++) {
      row.appendChild(document.createElement('td'));
    }

    for (let day = 1; day <= totalDays; day++) {
      if (row.children.length === 7) {
        tbody.appendChild(row);
        row = document.createElement('tr');
      }

      const cell = document.createElement('td');
      cell.textContent = day;

      const weekday = (firstDay + day - 1) % 7;
      if (weekday === 0) {
        cell.className = 'service-day';
        cell.title = 'Sunday Worship: 8:00am';
      } else if (weekday === 3) {
        cell.className = 'bible-study-day';
        cell.title = 'Bible Study: 6:00pm';
      }

      row.appendChild(cell);
    }

    if (row.children.length) tbody.appendChild(row);

    table.appendChild(tbody);
    container.appendChild(table);
  }

  const toggleBtn = document.getElementById('toggle-calendar');
  const calendarDiv = document.getElementById('calendar-container');
  let generated = false;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!generated) {
        generateCalendar();
        generated = true;
      }

      if (calendarDiv.style.display === 'none' || calendarDiv.style.display === '') {
        calendarDiv.style.display = 'block';
        toggleBtn.textContent = 'Hide Calendar';
      } else {
        calendarDiv.style.display = 'none';
        toggleBtn.textContent = 'Show Calendar';
      }
    });
  }

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
      });
    });
  }

});
