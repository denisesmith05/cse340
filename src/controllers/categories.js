import { getAllCategories, 
         getCategoryById, 
         getCategoriesByProjectId,
         getProjectsByCategoryId, 
         updateCategoryAssignments 
       } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js'

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);

    if (!projectDetails) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    res.render('assign-categories', {
        title: 'Assign Categories to Project',
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const submitted = req.body.categoryIds || [];

    // Ensures submitted is an array
    const categoryIds = Array.isArray(submitted) ? submitted : [submitted];

    await updateCategoryAssignments(projectId, categoryIds);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };