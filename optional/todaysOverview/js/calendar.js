const calendar = document.querySelector("#calendar");

let isWeekend = (i) => {
	return i % 7 === 6 || i % 7 === 0; //6 is Saturday, 7 is Sunday
};

let monthLength = 31; //TODO: this needs to change based on the month

buildCalendar();
function buildCalendar() {
	for (let i = 1; i <= monthLength; i++) {
		let weekend = isWeekend(i);

		let name = "";
		if (i <= 7) {
			let dayName = getDayName(i);
			name = `<div class="name">${dayName}</div>`;
		}

		calendar.insertAdjacentHTML(
			"beforeend",
			`<div class="day ${weekend ? "weekend" : ""}">${name}<br>${i}</div>`
		);
	}
}

function getDayName(i) {
	let date = new Date(Date.UTC(2021, 10, i)); //TODO: date should be generated and not hardcoded
	let dayName = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
		date
	);

	return dayName;
}

document.querySelectorAll("#calendar .day").forEach((day) => {
	day.addEventListener("click", (event) => {
		event.currentTarget.classList.toggle("selected");
	});
});
