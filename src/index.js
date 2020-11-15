
console.log('Running index.js...');

function insertIntoDirectory(data = []) {
	let table = document.getElementById('directory');
	let oldTbody = document.getElementById('directory-body');
	let newTbody = document.createElement('tbody');
	newTbody.innerHTML = '<tr></tr>';
	newTbody.setAttribute("id", "directory-body");

	oldTbody.parentNode.replaceChild(newTbody, oldTbody);
	data.forEach(employee => {
		let row = table.insertRow(-1);

		// let id = row.insertCell(0);
		let firstName = row.insertCell(0);
		let lastName = row.insertCell(1);
		let alias = row.insertCell(2);
		let ext = row.insertCell(3);
		let department = row.insertCell(4);
		let position = row.insertCell(5);
		let email = row.insertCell(6);

		// id.innerHTML = employee.id;
		firstName.innerHTML = employee.firstName;
		lastName.innerHTML = employee.lastName;
		alias.innerHTML = employee.aliasName || '';
		ext.innerHTML = employee.ext;
		department.innerHTML = employee.department;
		position.innerHTML = employee.position;
		email.innerHTML = employee.email;
	});
}

async function postFetch(url, data) {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		referrerPolicy: 'no-referrer', // *no-referrer-when-downgrade
		body: JSON.stringify(data)
	});
	return response.json();
}

function search(event) {
	event.preventDefault();

	let first_lower = document.getElementById('first').value;
	let last_lower = document.getElementById('last').value;
	let alias_lower = document.getElementById('alias').value;
	let ext = document.getElementById('extension').value;
	let department = document.getElementById('department').value;
	let position = document.getElementById('position').value;
	let email = document.getElementById('email').value;

	let postData = {};
	Object.assign(postData,
		first_lower	&& { first_lower: first_lower.toLowerCase() },
		last_lower	&& { last_lower: last_lower.toLowerCase() },
		alias_lower	&& { alias_lower: alias_lower.toLowerCase() },
		ext		&& { ext },
		department	&& { department: department.toUpperCase() },
		position	&& { position: position.toUpperCase() },
		email		&& { email: email.toLowerCase() },
	);

	let url = 'http://localhost:3000/employees';
	postFetch(url, postData)
		.then(data => insertIntoDirectory(data))
		.catch(err => console.error(err));
}
