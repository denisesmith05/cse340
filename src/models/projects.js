import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM public.project
        JOIN public.organization
        ON project.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects};