const route = document.getElementById("route");
const time1 = document.getElementById("time1");
const time2 = document.getElementById("time2");
const timeLabel1 = document.getElementById("timeLabel1");
const timeLabel2 = document.getElementById("timeLabel2");
const num = document.getElementById("num");
const button = document.getElementById("button");
const result = document.getElementById("result");

const onRouteChange = (e) => {
	const value = e.target.value;
	if (value === "из A в B") {
		time1.hidden = false;
		timeLabel1.hidden = false;
		time2.hidden = true;
		timeLabel2.hidden = true;
	} else if (value === "из B в A") {
		time1.hidden = true;
		timeLabel1.hidden = true;
		time2.hidden = false;
		timeLabel2.hidden = false;
	} else if (value === "из A в B и обратно в А") {
		time1.hidden = false;
		timeLabel1.hidden = false;
		time2.hidden = false;
		timeLabel2.hidden = false;
	}
};

const getTravelTime = (route) => {
	if (route === "из A в B" || route === "из B в A") {
		return "0:50";
	} else if (route === "из A в B и обратно в А") {
		return "1:40";
	}
};

const getDepartureTime = (route) => {
	if (route === "из B в A") {
		return time2.value;
	} else {
		return time1.value;
	}
};

function timestrToSec(timestr) {
	var parts = timestr.split(":");
	return parts[0] * 3600 + parts[1] * 60;
}

function pad(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return "" + num;
	}
}

function formatTime(seconds) {
	return [pad(Math.floor(seconds / 3600)), pad(Math.floor(seconds / 60) % 60), pad(seconds % 60)].join(":");
}

const getArrivalTime = (departureTime, travelTime) => {
	return formatTime(timestrToSec(departureTime) + timestrToSec(travelTime)).slice(0, -3);
};

const getPrice = (route) => {
	if (route === "из A в B" || route === "из B в A") {
		return 700 * num.value;
	} else if (route === "из A в B и обратно в А") {
		return 1200 * num.value;
	}
};

const getReservation = (num, route) => {
	let departureTime = getDepartureTime(route);
	let travelTime = getTravelTime(route);

	console.log(travelTime);

	return `Вы выбрали ${num} билета по маршруту ${route} стоимостью ${getPrice(route)} р. <br/>
  Это путешествие займет у вас ${travelTime} минут. <br/>
  Теплоход отправляется в ${departureTime}, а прибудет в ${getArrivalTime(departureTime, travelTime)}.`;
};

const onResultButtonClick = () => {
	result.innerHTML = getReservation(num.value, route.value);
};

button.addEventListener("click", onResultButtonClick);
route.addEventListener("change", onRouteChange);
