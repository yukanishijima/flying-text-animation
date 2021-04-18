const textOne = document.querySelector(".text_1");
textOne.innerHTML = textOne.textContent.replace(/\S/g, "<span>$&</span>"); // match anything but white space
const textTwo = document.querySelector(".text_2");
textTwo.innerHTML = textTwo.textContent.replace(/\S/g, "<span>$&</span>");

const animationOne = anime.timeline({
	targets: ".text_1 span",
	loop: true,
});

animationOne
	.add(
		{
			translateY: [-200, 0],
			translateX: (el, i) => {
				if (i == 0) {
					return [-300, 0];
				} else if (i == 4) {
					return [300, 0];
				}
			},
			scale: [14, 1],
			opacity: [0, 1],
			easing: "easeOutCirc",
			duration: 500,
			delay: (el, i) => 500 * i,
		},
		1200 // absolute offset
	)
	.add({
		translateY: 500,
		easing: "easeInBack",
		duration: 800,
		delay: anime.stagger(100, { start: 400 }),
	});

const animationTwo = anime.timeline({
	targets: ".text_2 span",
	loop: true,
});

animationTwo
	.add({
		translateX: function () {
			return anime.random(-500, 500);
		},
		translateY: function () {
			return anime.random(-500, 500);
		},
		opacity: 0,
		duration: 2000,
		delay: anime.stagger(5, { start: 500 }),
	})
	.add({
		rotate: 0,
		translateX: 0,
		translateY: 0,
		duration: 20,
	})
	.add({
		opacity: 1,
	});
