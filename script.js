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

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
	// markers: true,
	scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
});

// fly in from the front and drop down

// prettier-ignore
gsap.timeline({
  scrollTrigger: {
    trigger: ".section_1",
	start: "5", // animation starts when the center of trigger hits the middle of the viewport
	end: "bottom top", // animation ends when the bottom of trigger hit the top of the viewport
    pin: true, // pin the trigger element while active
    // pinSpacing: false,  // delete any padding which is automatically added for pinning
    id: "section_1",
	},
})
.set(".letter_1", { opacity: 0 })
.from(".letter_1", { duration: 5, opacity: 0, scale: 10, y: -200, stagger: 1.5 })
.to(".letter_1", { duration: 5, opacity: 0, y: 300, ease: "back.inOut(4)", stagger: 0.2 })

// rolling in from the both sides

// prettier-ignore
gsap.timeline({
	scrollTrigger: {
	trigger: ".section_2",
	start: "top top", // animation starts when the center of trigger hits the middle of the viewport
    end: "bottom top", // animation ends when the bottom of trigger hit the top of the viewport
    pin: ".section_2",
    id: "section_2",
	},
})
.set(".letter_2, .letter_3, .letter_4", {
  	x: (i, t) => {
  		if (i < 5 || 9 < i) {
  			return -1000;
  		} else {
  			return 1000;
  		}
  	},
  })
.to(".letter_2, .letter_3, .letter_4", {
	x: 0,
	rotation: (i, t) => {
		if (i < 5 || 9 < i) {
			return 360 * 3;
		} else {
			return -360 * 3;
		}
	},
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
})
.to(".letter_2, .letter_3, .letter_4", {
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
    ease: "slow(0.3, 0.4, false)",
	scale: 0,
})

// appear a letter one by one and disappear all

// prettier-ignore
gsap.timeline({
	scrollTrigger: {
	trigger: ".section_3",
	start: "top top",
    end: "bottom top", 
    pin: ".section_3",
    id: "section_3",
	},
})
.from(RandomLetter, { duration: 10, opacity: 0, stagger: 1 })
.to(".letter_5", { duration: 5, opacity: 0, display: "none" })
.to(".letter_5:nth-child(51)", { duration: 50, opacity: 1, display: "inline-block" })
.to(".letter_5:nth-child(51)", { duration: 80, ease: "expo.out", scale: 80 })
.to(".letter_5:nth-child(51)", { duration: 1, opacity: 0, display: "none"});

// make circular texts
// https://codepen.io/DevelopIntelligenceBoulder/pen/rrzZoK
function circularText(text, radius, index) {
	const txt = text.toUpperCase().split("");
	const classIndex = document.getElementsByClassName("circularText")[index];

	let deg = 360 / txt.length;
	let origin = 0;

	txt.forEach((ea) => {
		ea = `<p style='height:${radius}px; position:absolute; transform:rotate(${origin}deg);transform-origin:0 100%'>${ea}</p>`;
		classIndex.innerHTML += ea;
		origin += deg;
	});
}
circularText("Blink * The Power of Thinking Without Thinking * Malcolm Gladwell * ", 200, 0);

// rotate circular texts when coming up from the bottom

// prettier-ignore
gsap.timeline({
	scrollTrigger: {
	trigger: ".section_4",
	id: "section_4",
	},
})
.to(".circularText", { duration: 3, rotation: 360 * 2, transformOrigin: '0 50%' })
.to(".malcolm", { duration: 1, attr: { src: "assets/MG_CLOSED.png" } }, "-=2")
.to(".malcolm", { duration: 0.5, attr: { src: "assets/MG_OPEN.png" }}, "-=1.8" );

// make Malcolm blink on hover

function blink() {
	const malcolm = document.querySelector(".malcolm");
	malcolm.src = "assets/MG_CLOSED.png";
	setTimeout(() => {
		malcolm.src = "assets/MG_OPEN.png";
		setTimeout(() => {
			malcolm.src = "assets/MG_CLOSED.png";
			setTimeout(() => {
				malcolm.src = "assets/MG_OPEN.png";
			}, 200);
		}, 200);
	}, 500);
}

// standalone scrollTrigger for background
// https://codepen.io/GreenSock/pen/eYpGLYL
let proxy = { skew: 0 },
	skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
	clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

ScrollTrigger.create({
	onUpdate: (self) => {
		let skew = clamp(self.getVelocity() / -300);
		// only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
		if (Math.abs(skew) > Math.abs(proxy.skew)) {
			proxy.skew = skew;
			gsap.to(proxy, { skew: 0, duration: 1.2, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
		}
	},
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });
