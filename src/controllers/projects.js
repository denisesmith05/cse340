import { body, validationResult } from 'express-validator';
import { getAllOrganizations } from '../models/organizations.js';
import {
    addProjectVolunteer,
    createProject,
    getUpcomingProjects,
    getProjectDetails,
    isProjectVolunteer,
    removeProjectVolunteer,
    updateProject
} from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
    body('organizationId')
        .trim()
        .notEmpty()
        .withMessage('Please select an organization')
        .bail()
        .isInt()
        .withMessage('Please select a valid organization'),
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project name is required')
        .bail()
        .isLength({ min: 3, max: 150 })
        .withMessage('Project name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required'),
    body('date')
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('Please enter a valid project date')
];

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render('new-project', {
        title: 'Add New Project',
        organizations,
        errors: {},
        formData: {}
    });
};

const processNewProjectForm = async (req, res) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        const organizations = await getAllOrganizations();

        return res.status(400).render('new-project', {
            title: 'Add New Project',
            organizations,
            errors: validation.mapped(),
            formData: req.body
        });
    }

    const { organizationId, title, description, location, date } = req.body;
    const projectId = await createProject(
        title,
        description,
        location,
        date,
        organizationId
    );

    return res.redirect(`/project/${projectId}`);
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
        return res.sendStatus(404);
    }

    const categories = await getCategoriesByProjectId(projectId);
    const isVolunteer = req.session.user
        ? await isProjectVolunteer(projectId, req.session.user.user_id)
        : false;
    const title = 'Project Details';

    res.render('project', { title, project, categories, isVolunteer });
};

const processAddProjectVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const project = await getProjectDetails(projectId);

    if (!project) {
        return res.sendStatus(404);
    }

    await addProjectVolunteer(projectId, req.session.user.user_id);
    req.flash('success', 'You are now volunteering for this project.');
    return res.redirect(`/project/${projectId}`);
};

const processRemoveProjectVolunteer = async (req, res) => {
    const projectId = req.params.projectId;
    const project = await getProjectDetails(projectId);

    if (!project) {
        return res.sendStatus(404);
    }

    await removeProjectVolunteer(projectId, req.session.user.user_id);
    req.flash('success', 'You are no longer volunteering for this project.');

    if (req.body.returnTo === 'dashboard') {
        return res.redirect('/dashboard');
    }

    return res.redirect(`/project/${projectId}`);
};

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
        return res.sendStatus(404);
    }

    const organizations = await getAllOrganizations();

    res.render('edit-project', {
        title: 'Edit Project',
        project,
        organizations,
        errors: {},
        formData: {}
    });
};

const processEditProjectForm = async (req, res) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        const project = await getProjectDetails(req.params.id);

        if (!project) {
            return res.sendStatus(404);
        }

        const organizations = await getAllOrganizations();

        return res.status(400).render('edit-project', {
            title: 'Edit Project',
            project,
            organizations,
            errors: validation.mapped(),
            formData: req.body
        });
    }

    const { title, description, location, date, organizationId } = req.body;
    const projectId = req.params.id;

    await updateProject(projectId, title, description, location, date, organizationId);

    return res.redirect(`/project/${projectId}`);
};

export {
    projectValidation,
    showProjectsPage,
    showNewProjectForm,
    processNewProjectForm,
    showProjectDetailsPage,
    processAddProjectVolunteer,
    processRemoveProjectVolunteer,
    showEditProjectForm,
    processEditProjectForm
};