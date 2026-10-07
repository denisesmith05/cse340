import express from 'express';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Keep the existing /projects route unchanged.
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;