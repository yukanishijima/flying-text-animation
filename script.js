const text = document.querySelector(".text");
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>"); // match anything but white space

const animation = anime.timeline({
	targets: ".text span",
	loop: true,
});

animation
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
