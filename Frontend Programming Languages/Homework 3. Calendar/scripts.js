const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function isLeapYear(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function getDaysInMonth(y, m) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (m === 1 && isLeapYear(y)) return 29;
    return days[m];
}

function updateHeader() {
    document.getElementById("monthName").textContent = MONTHS[currentMonth].toUpperCase();
    document.getElementById("yearName").textContent = currentYear;
}

function renderGrid(dirClass) {
    const wrap = document.getElementById("cal-grid-wrap");
    wrap.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "cal-grid" + (dirClass ? " " + dirClass : "");
    wrap.appendChild(grid);

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrev = getDaysInMonth(prevYear, prevMonth);

    for (let i = 0; i < 42; i++) {
        const col = i % 7;

        const cell = document.createElement("div");
        cell.className = "cal-cell";

        const day = document.createElement("div");
        day.className = "cal-day";

        let num, outside = false;

        if (i < firstDay) {
            num = daysInPrev - firstDay + i + 1;
            outside = true;
        } else if (i >= firstDay + daysInMonth) {
            num = i - firstDay - daysInMonth + 1;
            outside = true;
        } else {
            num = i - firstDay + 1;
        }

        day.textContent = num;

        if (outside) {
            day.classList.add("outside");
            if (col === 0) day.classList.add("sunday");
        } else {
            if (col === 0) day.classList.add("sunday");
            if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && num === today.getDate()) {
                day.classList.add("today");
            }
        }

        cell.appendChild(day);
        grid.appendChild(cell);
    }
}

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentMonth === 0) { currentMonth = 11; currentYear--; }
    else currentMonth--;
    updateHeader();
    renderGrid("from-left");
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentMonth === 11) { currentMonth = 0; currentYear++; }
    else currentMonth++;
    updateHeader();
    renderGrid("from-right");
});

updateHeader();
renderGrid();
