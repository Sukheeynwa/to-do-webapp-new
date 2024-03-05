import { completedObj, currentProject, projectContent, inboxObj, todayObj, allProjects, } from "./project";

class Task {
	constructor (title, desc, date, priority) {
		this.title = title;
		this.desc = desc;
		this.date = date;
		this.priority = priority;
	}
};

function createNewTask (title, desc, date, priority) {
	const newTask = new Task(title, desc, date, priority);
	currentProject.tasks.push(newTask);
};

function deleteTask () {
	
};

// button deer darlaa -> tuhain buttoniig aguulj 

function editTask () {

};

export function renderTaskToProjectContent (project) {
	project.tasks.forEach((task) => {
		
		renderTask(task);
		});
};

export function renderTasks (project) {
	projectContent.innerHTML = '';
	renderTaskToProjectContent(project);
};

export function renderTask (task) {
	// Rendering text section
	const taskText = document.createElement('div');
	const taskTitleInputContainer = document.createElement('h2');
	const taskDescInputContainer = document.createElement('p');
	const taskDateInputContainer = document.createElement('div');
	
	taskTitleInputContainer.textContent = task.title;
	taskDescInputContainer.textContent = task.desc;
	taskDateInputContainer.textContent = task.date;
	
	taskText.appendChild(taskTitleInputContainer);
	taskText.appendChild(taskDescInputContainer);
	taskText.appendChild(taskDateInputContainer);

	// Rendering task check button
	const taskCheckBtn = document.createElement('button');
	taskCheckBtn.setAttribute('id', 'task-check-button');
	taskCheckBtn.textContent = "o";

	taskCheckBtn.addEventListener('click', () => {
		const index = project.tasks.indexOf(task);
		if (index > -1) { 
			project.tasks.splice(index, 1); 
		};
		createNewTask (taskTitleInput.value, taskDescInput.value, taskDateInput.value, taskPriorityInput.value, completedObj);
		renderTasks();
	});

	if (task.priority === "Priority 1") {
		taskCheckBtn.style.color = "coral";
		taskDateInputContainer.style.backgroundColor = "coral";
	} else if (task.priority === "Priority 2") {
		taskCheckBtn.style.color = "teal";
		taskDateInputContainer.style.backgroundColor = "teal";
	} else if (task.priority === "Priority 3") {
		taskCheckBtn.style.color = "yellow";
		taskDateInputContainer.style.backgroundColor = "yellow";
	} else if (task.priority === "Priority 4") {
		taskCheckBtn.style.color = "blue";
		taskDateInputContainer.style.backgroundColor = "blue";
	};

	// Rendering task more button
	const taskMoreBtn = document.createElement('button');
	taskMoreBtn.setAttribute('id', 'task-more-button');
	taskMoreBtn.textContent = "more";

	taskMoreBtn.addEventListener('click', () => {
		// Show modal that containes delete btn and edit btn;
		// Add event listeners to delete btn and edit btn;
	});

	const taskContent = document.createElement('div');
	taskContent.setAttribute('id', 'task-content');

	taskContent.appendChild(taskCheckBtn);
	taskContent.appendChild(taskText);
	taskContent.appendChild(taskMoreBtn);
	projectContent.appendChild(taskContent);
};

const taskDialog = document.querySelector('#task-dialog');

// Render show task dialog button
export function renderShowTaskDialogBtn () {
	// Rendering show task dialog button
	const showTaskDialogBtn = document.createElement('div');
	const showTaskDialogSidebar = document.querySelector('#show-task-dialog');
	showTaskDialogBtn.setAttribute('id', 'task-content');
	showTaskDialogBtn.textContent = 'Add Task';
	
	if (currentProject === todayObj) {
		taskDateInput.value = '2023-03-05';
		taskDateInput.disabled = true;
	} else {
		taskDateInput.value = '';
		taskDateInput.disabled = false;
	}

	// Show task dialog button
	showTaskDialogBtn.addEventListener('click', () => {
		taskDialog.showModal();
	});

	showTaskDialogSidebar.addEventListener('click', () => {
		taskDialog.showModal();
	});
	
	// Cancel task dialog button
	const cancelDialogBtn = document.querySelectorAll('#cancel');
	
	cancelDialogBtn.forEach((button) => {
		button.addEventListener('click', () => {
			taskDialog.close();
			taskTitleInput.value = '';
			taskDescInput.value = '';
			taskDateInput.value = '';
			taskPriorityInput.value = '';
		})
	});
	projectContent.appendChild(showTaskDialogBtn);
};


// Create task
const createNewTaskBtn = document.querySelector('#add-task');
const taskTitleInput = document.querySelector('#task-title');
const taskDescInput = document.querySelector('#task-description');
const taskDateInput = document.querySelector('#task-date');
const taskPriorityInput = document.querySelector('#task-priority-input');

createNewTaskBtn.addEventListener('click', ()=> {
	createNewTask (taskTitleInput.value, taskDescInput.value, taskDateInput.value, taskPriorityInput.value);
	if (currentProject === inboxObj) {
		renderTasks(inboxObj);
		allProjects.forEach((project) => {
			renderTaskToProjectContent(project)
		});
		renderShowTaskDialogBtn();
	} else if (currentProject === todayObj) {
		renderTasks(todayObj);
		allProjects.forEach((project) => {
			project.tasks.forEach((task) => {
					if (task.date === '2024-03-05') {
						renderTask(task);
					};
				});
		});
		renderShowTaskDialogBtn();
	} else {
		renderTasks(currentProject);
		renderShowTaskDialogBtn();
	};

	taskDialog.close();
	taskTitleInput.value = '';
	taskDescInput.value = '';
	taskDateInput.value = '';
	taskPriorityInput.value = '';
});
