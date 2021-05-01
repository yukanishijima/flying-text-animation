// .text_1
const textOne = document.querySelector(".text_1");
textOne.innerHTML = textOne.textContent.replace(/\S/g, "<span class='letter_1'>$&</span>"); // match anything but white space

// .text_2
const textTwo = document.querySelector(".text_2");
textTwo.innerHTML = textTwo.textContent.replace(/\S/g, "<span class='letter_2'>$&</span>");

// .text_3
const textThree = document.querySelector(".text_3");
textThree.innerHTML = textThree.textContent.replace(/\S/g, "<span class='letter_3'>$&</span>");

// .text_4
const textFour = document.querySelector(".text_4");
textFour.innerHTML = textFour.textContent.replace(/\S/g, "<span class='letter_4'>$&</span>");

// .text_5
const textFive = document.querySelector(".text_5");
textFive.innerHTML = textFive.textContent.replace(/\S/g, "<span class='letter_5'>$&</span>");

// .text_5 - create an array of letters in a random order
const RandomLetter = [];
const letters = document.querySelectorAll(".letter_5");
while (RandomLetter.length < letters.length) {
	let r = Math.floor(Math.random() * letters.length) + 1;
	let letter = `.letter_5:nth-child(${r})`;
	if (RandomLetter.indexOf(letter) === -1) RandomLetter.push(letter);
}

const tl = gsap.timeline();

tl.set(".letter_1", { opacity: 0 });
tl.set(".section_2", { display: "none" });
tl.set(".section_3", { display: "none" });

// fly in from the front and drop down
tl.from(".letter_1", { duration: 0.5, opacity: 0, scale: 10, y: -200, stagger: 0.5 });
tl.to(".letter_1", { duration: 1.5, opacity: 0, y: 300, ease: "back.inOut(4)", stagger: 0.1 }, "+=0.4");
tl.to(".section_1", { display: "none" });

// rolling in from the both sides
tl.set(".letter_2, .letter_3, .letter_4", {
	x: (i, t) => {
		console.log(i, t);
		if (i < 5 || 9 < i) {
			return -1000;
		} else {
			return 1000;
		}
	},
});

tl.to(".section_2", { display: "flex" });
tl.to(".letter_2, .letter_3, .letter_4", {
	duration: 3,
	x: 0,
	rotation: (i, t) => {
		if (i < 5 || 9 < i) {
			return 360 * 3;
		} else {
			return -360 * 3;
		}
	},
	// ease: "back.out(1)",
	ease: "elastic.out(1, 1)",
	stagger: {
		each: 0.2,
		from: (i, t) => {
			console.log(i, t);
			if (i < 6 || 9 < i) {
				return "end";
			} else {
				return "start";
			}
		},
	},
});

tl.to(".letter_2, .letter_3, .letter_4", {
	duration: 1,
	x: () => {
		return gsap.utils.random(-1000, 1000);
	},
	y: () => {
		return gsap.utils.random(-1000, 1000);
	},
	rotation: (i, t) => {
		if (i < 5 || 9 < i) {
			return 360 * 8;
		} else {
			return -360 * 8;
		}
	},
	scale: 0,
});
tl.to(".section_2", { opacity: 0, display: "none" }, "+=0.4");

// appear a letter one by one and disappear all
tl.to(".section_3", { display: "flex" });
tl.from(RandomLetter, { duration: 0.5, opacity: 0, stagger: 0.01 });
tl.to(".letter_5", { opacity: 0 }, "+=0.5");
tl.to(".letter_5:nth-child(51)", { opacity: 1 }, "-=0.5");
tl.to(".letter_5:nth-child(51)", { duration: 3, ease: "expo.in", scale: 300 });
