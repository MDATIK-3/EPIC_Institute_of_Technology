function isLeapYear(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function getDaysInMonth(y, m) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (m === 1 && isLeapYear(y)) return 29;
    return days[m];
}

function getFirstDayOfMonth(y, m) {
    return new Date(y, m, 1).getDay();
}

function getPrevMonthOverflow(firstDay, daysInPrev) {
    const result = [];
    for (let i = 0; i < firstDay; i++) {
        result.push(daysInPrev - firstDay + i + 1);
    }
    return result;
}

function getNextMonthOverflow(firstDay, daysInMonth) {
    const totalUsed = firstDay + daysInMonth;
    const remaining = 42 - totalUsed;
    const result = [];
    for (let i = 1; i <= remaining; i++) result.push(i);
    return result;
}




// Test Runner 

let passed = 0;
let failed = 0;
const results = [];

function expect(description, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) passed++;
    else failed++;
    results.push({ ok, description, actual, expected });
}




// isLeapYear

expect("2000 is a leap year (divisible by 400)", isLeapYear(2000), true);
expect("2003 is NOT a leap year (divisible by 100)", isLeapYear(1900), false);
expect("2024 is a leap year (divisible by 4)", isLeapYear(2024), true);

// getDaysInMonth

expect("January always has 31 days", getDaysInMonth(2023, 0), 31);
expect("February 2024 has 29 days (leap year)", getDaysInMonth(2024, 1), 29);
expect("February 2023 has 28 days (non-leap)", getDaysInMonth(2023, 1), 28);
expect("February 1900 has 28 days (non-leap century)", getDaysInMonth(1900, 1), 28);

// getFirstDayOfMonth

expect("Oct 2017 starts on Sunday (0)", getFirstDayOfMonth(2017, 9), 0);
expect("Jan 2023 starts on Sunday (0)", getFirstDayOfMonth(2023, 0), 0);

// getPrevMonthOverflow

expect("No overflow when month starts on Sunday",
    getPrevMonthOverflow(0, 31), []);

expect("1 day overflow when month starts on Monday",
    getPrevMonthOverflow(1, 31), [31]);

// getNextMonthOverflow 

expect("Oct 2017: 31 days, starts Sun(0) → 11 next-month days",
    getNextMonthOverflow(0, 31).length, 11);

// Output 

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${results.length} tests\n`);
results.forEach(r => {
    if (r.ok) {
        console.log(`  ✓ ${r.description}`);
    } else {
        console.error(`  ✗ ${r.description}`);
        console.error(`      expected: ${JSON.stringify(r.expected)}`);
        console.error(`      received: ${JSON.stringify(r.actual)}`);
    }
});