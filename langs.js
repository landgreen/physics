const SELECT_TAG = "select";
const OPTION_TAG = "option";

window.onload = function() {
	let langs = ["en", "ru"];
	let header = document.getElementsByTagName('header')[0];

	// Creating <select>...</select>
	let select = document.createElement(SELECT_TAG);

	for (var i = 0; i < langs.length; i++) {
		// Creating <option>
		let option = document.createElement(OPTION_TAG);
		option.innerText = langs[i];
		option.value = langs[i];
		select.append(option);

		// Slected <option>
		if(langs[i] == localStorage.language) {
			select.selectedIndex = i;
		}
	}

	// On Change
	select.onchange = function() {
		localStorage.language = langs[select.selectedIndex];
		let link = document.createElement('a');
		link.href = "index.html";
		link.click();
	}

	// Add <select> to <header>
	header.append(select);
}