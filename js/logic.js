let triangles = document.getElementsByClassName("triangle");
let triangleText = document.getElementsByClassName("triangle-text");

let playAgainButton = document.getElementById("play-again");

let triangleValues = Array(triangles.length);
const maxValue = 9;

let triangleLighten = Array(triangles.length);

playAgainButton.onclick = () => {
	resetTriangleValues();
	renderTriangles();
	playAgainButton.style.opacity = "0";
};

document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});

for (let i = 0; i < triangles.length; i++) {
	triangleLighten[i] = 0;
	triangles[i].addEventListener("mouseover", (e) => {
		triangleLighten[i] = 20;
		renderTriangles();
	});
	triangles[i].addEventListener("mouseout", (e) => {
		triangleLighten[i] = 0;
		renderTriangles();
	});

	triangles[i].addEventListener("mousedown", (e) => {
		triangleLighten[i] = 10;
		renderTriangles();
		addTriangle(i, e.button);
	});

	triangles[i].addEventListener("mouseup", (e) => {
		triangleLighten[i] = 20;
		renderTriangles();
	});

	triangleText[i].addEventListener("mouseover", (e) => {
		triangleLighten[i] = 20;
		renderTriangles();
	});
	triangleText[i].addEventListener("mouseout", (e) => {
		triangleLighten[i] = 0;
		renderTriangles();
	});

	triangleText[i].addEventListener("mousedown", (e) => {
		triangleLighten[i] = 10;
		renderTriangles();
		addTriangle(i, e.button);
		let allInRange = triangleValues.every((num) => num >= -1 && num <= 1);
		if (allInRange) {
			playAgainButton.style.opacity = "1";
		}
	});

	triangleText[i].addEventListener("mouseup", (e) => {
		triangleLighten[i] = 20;
		renderTriangles();
	});
}

resetTriangleValues();
renderTriangles();

function addTriangle(index, button) {
	let neighborLeft = (index + 5) % 6;
	let neighborRight = (index + 1) % 6;
	if (button == 0) {
		triangleValues[neighborLeft] -= 1;
		triangleValues[neighborRight] -= 1;
		triangleValues[index] += 2;
	}
	if (button == 2) {
		triangleValues[neighborLeft] += 1;
		triangleValues[neighborRight] += 1;
		triangleValues[index] -= 2;
	}
}

function resetTriangleValues() {
	let sum = 0;
	for (let i = 0; i < triangles.length - 1; i++) {
		triangleValues[i] = randomInt(maxValue * 2 + 1) - maxValue;
		sum += triangleValues[i];
		triangleText[i].innerHTML = triangleValues[i];
	}
	triangleValues[5] = -sum;
	if (triangleValues[5] > 9 || triangleValues[5] < -9) {
		return resetTriangleValues();
	}
}

function renderTriangles() {
	for (let i = 0; i < triangles.length; i++) {
		triangleText[i].innerHTML = triangleValues[i];
		let textX = triangleText[i].getAttribute("x");
		console.log(textX);
		if (triangleValues[i] == 0) {
			triangles[i].style.fill = `hsl(60deg 0.2 ${50 + triangleLighten[i]}%)`;
			triangleText[i].setAttribute("transform", `translate(${10}, ${0})`);
		}
		if (triangleValues[i] > 0) {
			triangles[i].style.fill = `hsl(120deg ${
				(triangleValues[i] / maxValue) * 100
			}% ${50 + triangleLighten[i]}%)`;
			triangleText[i].setAttribute("transform", `translate(${10}, ${0})`);
		}
		if (triangleValues[i] < 0) {
			triangles[i].style.fill = `hsl(0deg ${
				(Math.abs(triangleValues[i]) / maxValue) * 100
			}% ${50 + triangleLighten[i]}%)`;
		}
	}
}

function randomInt(max) {
	return Math.floor(Math.random() * max);
}
