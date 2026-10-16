import express from 'express';
import {
    showOrganizationsPage,
    organizationValidation,
    processNewOrganizationForm,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import { showHomePage } from './controllers/index.js';
import {
    categoryValidation,
    showCategoriesPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation,
    processAddProjectVolunteer,
    processRemoveProjectVolunteer
} from './controllers/projects.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireRole,
    requireLogin,
    showDashboard,
    showUsersPage
} from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.post('/project/:projectId/volunteer', requireLogin, processAddProjectVolunteer);
router.post('/project/:projectId/volunteer/remove', requireLogin, processRemoveProjectVolunteer);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);

router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.post('/edit-organization/:id', requireRole('admin'), processEditOrganizationForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', requireRole('admin'), processAssignCategoriesForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), showUsersPage);

router.get('/test-error', testErrorPage);

export default router;