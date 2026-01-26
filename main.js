document.addEventListener("DOMContentLoaded", () => {

  /* ================= CALENDAR ================= */
  function generateCalendar() {
    const container = document.getElementById('calendar-container');
    if (!container) return;

    container.innerHTML = '';

    const year = 2026;
    const month = 0;
    const monthName = "January";

    const title = document.createElement('h4');
    title.textContent = `${monthName} ${year}`;
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'calendar';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    days.forEach(day => {
      const th = document.createElement('th');
      th.textContent = day;
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
        cell.classList.add('service-day');
        cell.title = 'Sunday Worship: 8:00am';
      } else if (weekday === 3) {
        cell.classList.add('bible-study-day');
        cell.title = 'Bible Study: 6:00pm';
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
    table.appendChild(tbody);
    container.appendChild(table);
  }

  const toggleBtn = document.getElementById('toggle-calendar');
  const calendarDiv = document.getElementById('calendar-container');
  let generated = false;

  if (toggleBtn && calendarDiv) {
    toggleBtn.addEventListener('click', () => {
      if (!generated) {
        generateCalendar();
        generated = true;
      }

      const isHidden =
        calendarDiv.style.display === 'none' ||
        calendarDiv.style.display === '';

      calendarDiv.style.display = isHidden ? 'block' : 'none';
      toggleBtn.textContent = isHidden ? 'Hide Calendar' : 'Show Calendar';
    });
  }

  /* ================= MOBILE MENU ================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const closeMenuBtn = document.getElementById("close-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.add("show");
      hamburger.classList.add("show");
    });
  }

  if (closeMenuBtn && navMenu) {
    closeMenuBtn.addEventListener("click", () => {
      navMenu.classList.remove("show");
      hamburger.classList.remove("show");
    });
  }

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      hamburger.classList.remove("show");
    });
  });

});


