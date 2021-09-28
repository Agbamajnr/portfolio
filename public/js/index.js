//header

let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () => {
	menu.classList.toggle('fa-times');
	header.classList.toggle('active');
}

window.onscroll = () => {
	menu.classList.remove('fa-times');
	header.classList.remove('active');
}

//typing text home
var typed = new Typed('.typing-text', {
	strings : [ 'backend developer', 'NodeJs developer', 'full stack developer'],
	loop : true,
	typeSpeed : 140
});

//vanilla tilt
VanillaTilt.init(document.querySelectorAll('.tilt'), {
	max : 25
});

//email cleient sender
