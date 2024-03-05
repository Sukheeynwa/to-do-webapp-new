import './style.css';
import { renderProjectToMainSection, renderProjectsToSidebar, createNewProject, allProjects, projectContent, inboxObj, todayObj, setCurrentProject, currentProject } from './project';
import { renderTaskToProjectContent, renderShowTaskDialogBtn, renderTasks, renderTask } from './task';

// Show task dialog button
const showProjectDialogBtn = document.querySelector('#show-project-dialog');
const projectDialog = document.querySelector('#project-dialog');

showProjectDialogBtn.addEventListener('click', () => {
	projectDialog.showModal();
});

// Cancel project dialog button
const cancelDialogBtn = document.querySelectorAll('#cancel');

cancelDialogBtn.forEach((button) => {
	button.addEventListener('click', () => {
		projectDialog.close();
		projectTitleInput.value = '';
		projectColorInput.value = '#000000';
	})
});

// Create project
const createNewProjectBtn = document.querySelector('#add-project');
const projectTitleInput = document.querySelector('#project-title');
const projectColorInput = document.querySelector('#project-color');

const sidebarContent = document.querySelector("#sidebar-content");
const projectMainSectionTitle = document.querySelector('#project-title-container');

createNewProjectBtn.addEventListener('click', ()=> {
	createNewProject(projectTitleInput.value, projectColorInput.value);
	renderTasks(currentProject);
	projectMainSectionTitle.textContent = currentProject.title;
	renderShowTaskDialogBtn();
	sidebarContent.innerHTML = '';
	renderProjectsToSidebar();
	projectTitleInput.value = '';
	projectColorInput.value = '#000000';
	projectDialog.close();
});

const inboxSidebarBtn = document.querySelector('#inbox');
const projectTitleContainer = document.querySelector('#project-title-container')

inboxSidebarBtn.addEventListener('click', () => {
	projectTitleContainer.textContent = 'Inbox';
	setCurrentProject(inboxObj);
	projectContent.innerHTML = '';
	renderTaskToProjectContent(inboxObj);
	renderTaskToProjectContent(todayObj);
	allProjects.forEach((project) => {
		renderTaskToProjectContent(project)
	});
	renderShowTaskDialogBtn();
});

const todaySidebarBtn = document.querySelector('#today');

todaySidebarBtn.addEventListener('click', () => {
	projectTitleContainer.textContent = 'Today';
	setCurrentProject(todayObj);
	renderTasks(todayObj);
	allProjects.forEach((project) => {
		project.tasks.forEach((task) => {
				if (task.date === '2024-03-05') {
					renderTask(task);
				};
			});
	});
	renderShowTaskDialogBtn();
})
