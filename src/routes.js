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
    projectValidation
} from './controllers/projects.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/new-category', showNewCategoryForm);

router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/new-project', showNewProjectForm);

router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.post('/edit-organization/:id', processEditOrganizationForm);
router.post('/new-project', projectValidation, processNewProjectForm);

router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

router.get('/test-error', testErrorPage);

export default router;