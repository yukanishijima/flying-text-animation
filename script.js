// .text_1
const textOne = document.querySelector(".text_1");
textOne.innerHTML = textOne.textContent.replace(/\S/g, "<span class='letter_1'>$&</span>"); // match anything but white space

// .text_2
const textTwo = document.querySelector(".text_2");
textTwo.innerHTML = textTwo.textContent.replace(/\S/g, "<span class='letter_2'>$&</span>");

// .text_3
// const textThree = document.querySelector(".text_3");
// textThree.innerHTML = textThree.textContent.replace(/\S/g, "<span class='letter_3'>$&</span>");

// .text_2 - create an array of letters in a random order
const RandomLetter = [];
const letters = document.querySelectorAll(".letter_2");
while (RandomLetter.length < letters.length) {
	let r = Math.floor(Math.random() * letters.length) + 1;
	let letter = `.letter_2:nth-child(${r})`;
	if (RandomLetter.indexOf(letter) === -1) RandomLetter.push(letter);
}

const tl = gsap.timeline();

tl.set(".letter_1", { opacity: 0 });
tl.set(".text_2", { display: "none" });
tl.set(".text_3", { display: "none" });

// fly in from the front and drop down
tl.from(".letter_1", { duration: 0.5, opacity: 0, scale: 10, y: -200, stagger: 0.5 });
tl.to(".letter_1", { duration: 1.5, opacity: 0, y: 300, ease: "back.inOut(4)", stagger: 0.1, display: "none" }, "+=0.4");

// appear a letter one by one and disappear all
tl.to(".text_2", { display: "flex" });
tl.from(RandomLetter, { duration: 0.5, opacity: 0, stagger: 0.1 });
tl.to(".text_2", { opacity: 0, display: "none" }, "+=0.4");

// WIP
tl.to(".text_3", { display: "flex" });
