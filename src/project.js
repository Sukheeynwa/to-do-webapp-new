import { renderShowTaskDialogBtn, renderTasks } from "./task";

class Project {
	constructor (title, color) {
		this.title = title;
		this.color = color;
		this.tasks = [];
	}
};

export const defaultProject = new Project('Default');
export const inboxObj = new Project('Inbox');
export const todayObj = new Project('Today');
export const upcomingObj = new Project('Upcoming');
export const completedObj = new Project('Completed');

export const allProjects = [defaultProject];
export let currentProject = {};

export function createNewProject (title, color) {
	const newProject = new Project(title, color);
	allProjects.push(newProject);
	setCurrentProject(newProject);
};

export function setCurrentProject (project) {
	currentProject = project;
};

function deleteProject () {

};

function editProject() {

};

export const projectContent = document.querySelector('#project-content');
const projectMainSectionTitle = document.querySelector('#project-title-container');

export function renderProjectsToSidebar() {
	allProjects.forEach((project) => {
		const projectSidebarContainer = document.createElement('div');
		const projectSidebarName = document.createElement('div');
		const projectSidebarLabel = document.createElement('div');

		projectSidebarName.textContent = project.title;
		projectSidebarLabel.textContent = "ꞏ";
		projectSidebarLabel.style.color = project.color;
		projectSidebarLabel.setAttribute('id', 'project-sidebar-label');

		projectSidebarContainer.appendChild(projectSidebarLabel);
		projectSidebarContainer.appendChild(projectSidebarName);
		
		const sidebarContent = document.querySelector('#sidebar-content');
		sidebarContent.appendChild(projectSidebarContainer);

		projectSidebarName.addEventListener('click', () => {
			setCurrentProject(project);
			projectMainSectionTitle.textContent = currentProject.title;
			renderTasks(currentProject);
			renderShowTaskDialogBtn();
		});

		const projectDeleteBtn = document.createElement('button');
		const projectShowEditDialog = document.createElement('button');
		const projectMoreBtn = document.createElement('div');
		const projectMoreContainer = document.createElement('dialog');

		projectDeleteBtn.textContent = 'x';
		projectShowEditDialog.textContent = 'edit';
		projectMoreBtn.textContent = '…';
		projectMoreContainer.setAttribute('id', 'project-more-container');

		projectMoreContainer.appendChild(projectDeleteBtn);
		projectMoreContainer.appendChild(projectShowEditDialog);
		projectSidebarContainer.appendChild(projectMoreBtn);

		projectSidebarContainer.addEventListener('mouseover', () => {
			projectMoreBtn.style.opacity = '1';
		});

		projectSidebarContainer.addEventListener('mouseout', () => {
			projectMoreBtn.style.opacity = '0';
		});
		
		projectMoreBtn.addEventListener('click', () => {
			projectSidebarContainer.appendChild(projectMoreContainer);
		});

		projectDeleteBtn.addEventListener('click', () => {
			const index = allProjects.indexOf(project);
			allProjects.splice(index, 1);
			sidebarContent.innerHTML = '';
			renderProjectsToSidebar();
			setCurrentProject(inboxObj);
			projectMainSectionTitle.textContent = currentProject.title;
			renderTasks(inboxObj);
			allProjects.forEach((project) => {
				renderTaskToProjectContent(project)
			});
			renderShowTaskDialogBtn();
		});

		const projectEditDialog = document.querySelector('#project-edit-dialog');
		const projectEditTitle = document.querySelector('#project-edit-title');
		const projectEditColor = document.querySelector('#project-edit-color');
		const projectEditBtn = document.querySelector('#edit-project');

		projectShowEditDialog.addEventListener('click', () => {
			currentProject = project;
			renderProjectToMainSection();
			projectEditTitle.value = project.title;
			projectEditColor.value = project.color;
			projectEditDialog.showModal();
		});

		projectEditBtn.addEventListener('click', () => {
			currentProject.title = projectEditTitle.value;
			currentProject.color = projectEditColor.value;
			renderProjectToMainSection();
			sidebarContent.innerHTML = '';
			renderProjectsToSidebar();
			projectEditDialog.close();
			console.log(allProjects);
		});
	});
};
