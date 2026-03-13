function dayOfCalendar(year, month) {
  const w = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const m = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function isLeap(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }

  const daysPerMonth = [
    31,
    isLeap(year) ? 29 : 28,
    31, 30, 31, 30,
    31, 31,
    30, 31, 30, 31
  ];

  const daysInMonth = daysPerMonth[month - 1];
  const startDay = new Date(year, month - 1, 1).getDay();

  let cells = [];

  for (let i = 0; i < startDay; i++) {
    cells.push("  ");
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(String(d).padStart(2, " "));
  }

  let weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7).join(" "));
  }

  return `${m[month - 1]} ${year}\n${w.join(" ")}\n${weeks.join("\n")}`;
}

console.log(dayOfCalendar(2033, 7));