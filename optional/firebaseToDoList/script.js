var currentTab = 1;

function getItems() {
	//all tasks
	if (currentTab === 1) {
		db.collection("todo-items").onSnapshot((snapshot) => {
			let items = [];
			snapshot.docs.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() });
			});
			generateItems(items);
		});
	}
	//active tasks
	else if (currentTab === 2) {
		db.collection("todo-items").onSnapshot((snapshot) => {
			let items = [];
			snapshot.docs.forEach((doc) => {
				if (doc.data().status === "active") {
					items.push({ id: doc.id, ...doc.data() });
				}
			});
			generateItems(items);
		});
	}
	//completed tasks
	else if (currentTab === 3) {
		db.collection("todo-items").onSnapshot((snapshot) => {
			let items = [];
			snapshot.docs.forEach((doc) => {
				if (doc.data().status === "completed") {
					items.push({ id: doc.id, ...doc.data() });
				}
			});
			generateItems(items);
		});
	}
}

function generateCounterContent(items) {
	counterDiv = document.getElementById("counter");
	let counterContent = 0;
	for (let i = 0; i > items.length; i++) {
		if (items[i].status === "active") {
			counterContent++;
		}
	}
	counterDiv.innerText == counterContent;
}

function generateItems(items) {
	let todoItems = [];
	let activeCounter = 0;
	items.forEach((item) => {
		let todoItem = document.createElement("div");
		todoItem.classList.add("todoItem");

		// checkmark
		let checkContainer = document.createElement("div");
		checkContainer.classList.add("check");

		let checkMark = document.createElement("div");
		checkMark.classList.add("checkMark");
		checkMark.innerHTML = '<img src="images/checkIcon.svg">';
		checkMark.addEventListener("click", function () {
			markCompleted(item.id);
		});
		checkContainer.appendChild(checkMark);

		// text
		let todoText = document.createElement("div");
		todoText.classList.add("todoText");
		todoText.innerText = item.text;

		// delete entry
		let deleteContainer = document.createElement("div");
		deleteContainer.classList.add("delete");

		let todoDelete = document.createElement("div");
		todoDelete.classList.add("todoDelete");
		todoDelete.innerHTML = '<img src="images/deleteIcon.svg"/>';
		todoDelete.addEventListener("click", function () {
			deleteItem(item.id);
		});
		deleteContainer.appendChild(todoDelete);

		if (item.status === "completed") {
			checkMark.classList.add("checked");
			todoText.classList.add("checked");
		}

		if (item.status === "active") {
			activeCounter++;
		}
		todoItem.appendChild(checkContainer);
		todoItem.appendChild(todoText);
		todoItem.appendChild(deleteContainer);
		todoItems.push(todoItem);
		generateCounterContent(items);
	});
	document.querySelector(".todoItems").replaceChildren(...todoItems);
	document.getElementById("counter").innerText = activeCounter;
}

function addItem(event) {
	event.preventDefault();
	let text = document.getElementById("todoInput");
	let newItem = db.collection("todo-items").add({
		text: text.value,
		status: "active",
	});
	text.value = "";
}

function markCompleted(id) {
	let item = db.collection("todo-items").doc(id);
	item.get().then(function (doc) {
		if (doc.exists) {
			if (doc.data().status == "active") {
				item.update({ status: "completed" });
			} else {
				item.update({ status: "active" });
			}
		}
	});
}

function deleteItem(id) {
	let item = db.collection("todo-items").doc(id);
	item.get().then(function (doc) {
		if (doc.exists) {
			doc.ref.delete();
		} else return;
	});
}

function clearCompleted() {
	let confirmDialogue = confirm(
		"Are you sure you want to delete all completed entries?\nThis can not be undone."
	);
	if (confirmDialogue) {
		db.collection("todo-items").onSnapshot((snapshot) => {
			snapshot.docs.forEach((doc) => {
				if (doc.data().status == "completed") {
					doc.ref.delete();
				}
			});
		});
	} else return;
}

function changeTab(tab) {
	clearClass();
	all = document.getElementById("all");
	active = document.getElementById("active");
	completed = document.getElementById("completed");

	if (tab === "all") {
		all.classList.add("active");
		currentTab = 1;
		console.log('switched to the "all" tab');
	} else if (tab === "active") {
		active.classList.add("active");
		currentTab = 2;
		console.log('switched to the "active" tab');
	} else if (tab === "completed") {
		completed.classList.add("active");
		currentTab = 3;
		console.log('switched to the "completed" tab');
	}
	getItems();
}

function clearClass() {
	all = document.getElementById("all");
	all.classList.remove("active");

	active = document.getElementById("active");
	active.classList.remove("active");

	completed = document.getElementById("completed");
	completed.classList.remove("active");
}

getItems();
