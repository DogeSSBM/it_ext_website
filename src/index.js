
console.log('Running index.js...');

function insertIntoDirectory(data = []) {
	let table = document.getElementById('directory');
	let oldTbody = document.getElementById('directory-body');
	let newTbody = document.createElement('tbody');
	newTbody.innerHTML = '<tr></tr>';
	newTbody.setAttribute("id", "directory-body");

	oldTbody?.parentNode.replaceChild(newTbody, oldTbody);

	data.forEach(employee => {
		let row = table.insertRow(-1);

		// let id = row.insertCell(0);
		let firstName = row.insertCell(0);
		let lastName = row.insertCell(1);
		let ext = row.insertCell(2);
		let department = row.insertCell(3);
		let email = row.insertCell(4);

		// id.innerHTML = employee.id;
		firstName.innerHTML = employee.firstName;
		lastName.innerHTML = employee.lastName;
		ext.innerHTML = employee.ext;
		department.innerHTML = employee.department;
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

	let first_name = document.getElementById('first').value;
	let last_name = document.getElementById('last').value;
	let ext = document.getElementById('extension').value;
	let department = document.getElementById('department').value;
	let email = document.getElementById('email').value;

	let postData = {};
	Object.assign(postData,
		first_name && { first_name },
		last_name && { last_name },
		ext && { ext },
		department && { department },
		email && { email },
	);

	let url = 'http://localhost:3000/employees';
	postFetch(url, postData)
		.then(data => insertIntoDirectory(data))
		.catch(err => console.error(err));
}

insertIntoDirectory();

