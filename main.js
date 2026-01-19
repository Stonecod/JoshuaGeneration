function generateCalendar() {
  const container = document.getElementById('calendar-container');
  container.innerHTML = ''; // Clear previous content

  const year = 2026;
  const month = 0; // January
  const monthName = "January";

  // Month title
  const title = document.createElement('h4');
  title.textContent = monthName + ' ' + year;
  container.appendChild(title);

  // Create table
  const table = document.createElement('table');
  table.className = 'calendar';

  // Table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for (let d of days) {
    const th = document.createElement('th');
    th.textContent = d;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement('tbody');
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  let row = document.createElement('tr');

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement('td'));
  }

  // Fill in the days
  for (let day = 1; day <= totalDays; day++) {
    if (row.children.length === 7) {
      tbody.appendChild(row);
      row = document.createElement('tr');
    }

    const cell = document.createElement('td');
    cell.textContent = day;

    // Highlight Sundays and Wednesdays
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

  // Append last row
  if (row.children.length > 0) tbody.appendChild(row);

  table.appendChild(tbody);
  container.appendChild(table);
}

// Toggle button
const toggleBtn = document.getElementById('toggle-calendar');
const calendarDiv = document.getElementById('calendar-container');
let generated = false;

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

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});
