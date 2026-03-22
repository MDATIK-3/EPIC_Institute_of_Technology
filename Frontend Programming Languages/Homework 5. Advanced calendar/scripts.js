class Calendar {
    constructor() {
        this.today = new Date();
        this.currentYear = this.today.getFullYear();
        this.currentMonth = this.today.getMonth();
        this.MONTHS = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        this.STORAGE_KEY = "calendar_notes";

        document.getElementById("prevBtn").addEventListener("click", () => this.prevMonth());
        document.getElementById("nextBtn").addEventListener("click", () => this.nextMonth());

        this.updateHeader();
        this.renderGrid();
    }

    isLeapYear(y) {
        return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    }

    getDaysInMonth(y, m) {
        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (m === 1 && this.isLeapYear(y)) return 29;
        return days[m];
    }

    prevMonth() {
        if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
        else this.currentMonth--;
        this.updateHeader();
        this.renderGrid("from-left");
    }

    nextMonth() {
        if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
        else this.currentMonth++;
        this.updateHeader();
        this.renderGrid("from-right");
    }

    updateHeader() {
        document.getElementById("monthName").textContent = this.MONTHS[this.currentMonth].toUpperCase();
        document.getElementById("yearName").textContent = this.currentYear;
    }

    renderGrid(dirClass) {
        const wrap = document.getElementById("cal-grid-wrap");
        wrap.innerHTML = "";

        const grid = document.createElement("div");
        grid.className = "cal-grid" + (dirClass ? " " + dirClass : "");
        wrap.appendChild(grid);

        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
        const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
        const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
        const daysInPrev = this.getDaysInMonth(prevYear, prevMonth);

        for (let i = 0; i < 42; i++) {
            const col = i % 7;
            let num, outside = false, cellYear, cellMonth;

            if (i < firstDay) {
                num = daysInPrev - firstDay + i + 1;
                outside = true;
                cellMonth = prevMonth;
                cellYear = prevYear;
            } else if (i >= firstDay + daysInMonth) {
                num = i - firstDay - daysInMonth + 1;
                outside = true;
                cellMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
                cellYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
            } else {
                num = i - firstDay + 1;
                cellMonth = this.currentMonth;
                cellYear = this.currentYear;
            }

            grid.appendChild(this.buildCell(num, col, outside, cellYear, cellMonth));
        }
    }


    buildCell(num, col, outside, y, m) {
        const isToday = !outside &&
            y === this.today.getFullYear() &&
            m === this.today.getMonth() &&
            num === this.today.getDate();

        const cell = document.createElement("div");
        cell.className = "cal-cell" +
            (outside ? " outside-cell" : "") +
            (isToday ? " today-cell" : "");

        const day = document.createElement("div");
        day.className = "cal-day" +
            (outside ? " outside" : "") +
            (col === 0 && !outside ? " sunday" : "") +
            (col === 0 && outside ? " sunday outside" : "") +
            (isToday ? " today" : "");
        day.textContent = num;
        cell.appendChild(day);

        if (outside) return cell;

        const noteList = document.createElement("div");
        noteList.className = "note-list";
        cell.appendChild(noteList);
        this.renderNotes(noteList, y, m, num);

        cell.addEventListener("click", (e) => {
            if (e.target.closest(".note-input-wrap") || e.target.closest(".note-remove")) return;
            if (cell.querySelector(".note-input-wrap")) return;
            this.openInput(cell, noteList, y, m, num);
        });

        return cell;
    }

    getNotes() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
    }

    getNotesForDate(y, m, d) {
        return this.getNotes()[`${y}-${m}-${d}`] || [];
    }

    saveNote(y, m, d, text) {
        const all = this.getNotes();
        const key = `${y}-${m}-${d}`;
        if (!all[key]) all[key] = [];
        all[key].push(text);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    }

    removeNote(y, m, d, index) {
        const all = this.getNotes();
        const key = `${y}-${m}-${d}`;
        if (!all[key]) return;
        all[key].splice(index, 1);
        if (all[key].length === 0) delete all[key];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    }

    renderNotes(container, y, m, d) {
        container.innerHTML = "";
        this.getNotesForDate(y, m, d).forEach((text, i) => {
            const item = document.createElement("div");
            item.className = "note-item";

            const span = document.createElement("span");
            span.className = "note-text";
            span.textContent = text;

            const btn = document.createElement("button");
            btn.className = "note-remove";
            btn.textContent = "✕";
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.removeNote(y, m, d, i);
                this.renderNotes(container, y, m, d);
            });

            item.appendChild(span);
            item.appendChild(btn);
            container.appendChild(item);
        });
    }

    openInput(cell, noteList, y, m, d) {
        const wrap = document.createElement("div");
        wrap.className = "note-input-wrap";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "note-input";
        input.placeholder = "Add a note…";

        const btn = document.createElement("button");
        btn.className = "note-save-btn";
        btn.textContent = "Save";

        const save = () => {
            const text = input.value.trim();
            if (text) {
                this.saveNote(y, m, d, text);
                this.renderNotes(noteList, y, m, d);
            }
            wrap.remove();
        };

        btn.addEventListener("click", (e) => { e.stopPropagation(); save(); });
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") save(); });

        wrap.appendChild(input);
        wrap.appendChild(btn);
        cell.appendChild(wrap);
        input.focus();
    }
}

new Calendar();