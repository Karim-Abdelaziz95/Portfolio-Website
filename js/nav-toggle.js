(function () {
	var toggle = document.getElementById('nav-toggle');
	var links = document.getElementById('nav-links');
	if (!toggle || !links) return;
	toggle.addEventListener('click', function () {
		var open = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!open));
		links.classList.toggle('nav-open');
	});
	links.querySelectorAll('a').forEach(function (link) {
		link.addEventListener('click', function () {
			toggle.setAttribute('aria-expanded', 'false');
			links.classList.remove('nav-open');
		});
	});
})();
