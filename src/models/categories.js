import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);
    return result.rows;
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO public.category (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const result = await db.query(query, [name]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

const getCategoryById = async (id) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM public.category AS c
        JOIN public.project_category AS pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id
        FROM public.project AS p
        JOIN public.project_category AS pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date ASC;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO public.project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    await db.query(
        'DELETE FROM public.project_category WHERE project_id = $1;',
        [projectId]
    );

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE public.category
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0].category_id;
};

export {
    getAllCategories,
    createCategory,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    updateCategory
};