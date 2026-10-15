import { body, validationResult } from 'express-validator';
import {
    getAllCategories,
    createCategory,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

const categoryValidation = [
    body('name')
        .isString()
        .withMessage('Category name must be text')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Add New Category',
        errors: {},
        formData: {}
    });
};

const processNewCategoryForm = async (req, res) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return res.status(400).render('new-category', {
            title: 'Add New Category',
            errors: validation.mapped(),
            formData: req.body
        });
    }

    const categoryId = await createCategory(req.body.name);
    req.flash('success', 'Category added successfully!');
    return res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const category = await getCategoryById(req.params.id);

    if (!category) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    return res.render('edit-category', {
        title: 'Edit Category',
        category,
        errors: {},
        formData: {}
    });
};

const processEditCategoryForm = async (req, res) => {
    const category = await getCategoryById(req.params.id);

    if (!category) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return res.status(400).render('edit-category', {
            title: 'Edit Category',
            category,
            errors: validation.mapped(),
            formData: req.body
        });
    }

    await updateCategory(category.category_id, req.body.name);
    req.flash('success', 'Category updated successfully!');
    return res.redirect(`/category/${category.category_id}`);
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

    const categoryIds = Array.isArray(submitted) ? submitted : [submitted];

    await updateCategoryAssignments(projectId, categoryIds);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export {
    categoryValidation,
    showCategoriesPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};