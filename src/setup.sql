-- W02

-- organizations.sql

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

SELECT * FROM organization;

CREATE TABLE project (
	project_id SERIAL PRIMARY KEY,
	organization_id SERIAL NOT NULL,
	title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
	FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

-- projects.sql

CREATE TABLE project (
	project_id SERIAL PRIMARY KEY,
	organization_id SERIAL NOT NULL,
	title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
	FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

INSERT INTO project
    (organization_id, title, description, location, date)
VALUES
    -- BrightFuture Builders
    (1, 'Community Playground Build',
     'Build a safe and accessible playground for local children.',
     'Provo Community Park', '2026-10-03'),

    (1, 'Neighborhood Home Repair',
     'Help local families with basic home repairs and improvements.',
     'Provo, Utah', '2026-10-10'),

    (1, 'Community Garden Construction',
     'Build garden beds and prepare a community garden space.',
     'Provo Community Center', '2026-10-17'),

    (1, 'Senior Home Improvement Day',
     'Assist local seniors with small home improvement projects.',
     'Provo, Utah', '2026-10-24'),

    (1, 'Park Bench Restoration',
     'Repair and restore benches in a local community park.',
     'Rock Canyon Park', '2026-10-31'),

    -- GreenHarvest Growers
    (2, 'Community Garden Cleanup',
     'Clean and prepare community garden beds for the growing season.',
     'Provo Community Garden', '2026-10-04'),

    (2, 'Food Bank Garden Harvest',
     'Harvest fresh produce to donate to a local food bank.',
     'Provo, Utah', '2026-10-11'),

    (2, 'Tree Planting Project',
     'Plant trees around local neighborhoods and public spaces.',
     'Provo, Utah', '2026-10-18'),

    (2, 'Urban Garden Workshop',
     'Teach community members how to grow vegetables in small spaces.',
     'Provo Community Center', '2026-10-25'),

    (2, 'Neighborhood Beautification',
     'Plant flowers and maintain gardens in a local neighborhood.',
     'Provo, Utah', '2026-11-01'),

    -- UnityServe Volunteers
    (3, 'Food Drive',
     'Collect and organize food donations for families in need.',
     'Provo Community Center', '2026-10-05'),

    (3, 'Senior Center Volunteer Day',
     'Spend time assisting seniors with activities and daily needs.',
     'Provo Senior Center', '2026-10-12'),

    (3, 'Homeless Shelter Meal Service',
     'Prepare and serve meals to individuals experiencing homelessness.',
     'Provo, Utah', '2026-10-19'),

    (3, 'Community Clothing Drive',
     'Collect, sort, and distribute clothing to people in need.',
     'Provo Community Center', '2026-10-26'),

    (3, 'Neighborhood Cleanup',
     'Work with community members to clean up local streets and public areas.',
     'Provo, Utah', '2026-11-02');

SELECT * FROM project;

-- categories.sql

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO category (name)
VALUES
    ('Environment'),
    ('Education'),
    ('Community');

-- To avoid category duplicates 
DELETE FROM category a
USING category b
WHERE a.category_id > b.category_id
AND a.name = b.name;

SELECT*FROM category;


CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
	
    
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES project(project_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

INSERT INTO project_category (project_id, category_id)
VALUES
    -- Community
    (1, 3),   -- Community Playground Build
    (2, 3),   -- Neighborhood Home Repair
    (4, 3),   -- Senior Home Improvement Day
    (5, 3),   -- Park Bench Restoration
    (11, 3),  -- Food Drive
    (12, 3),  -- Senior Center Volunteer Day
    (13, 3),  -- Homeless Shelter Meal Service
    (14, 3),  -- Community Clothing Drive
    (15, 3),  -- Neighborhood Cleanup

    -- Environment
    (3, 1),   -- Community Garden Construction
    (6, 1),   -- Community Garden Cleanup
    (8, 1),   -- Tree Planting Project
    (9, 1),   -- Urban Garden Workshop
    (10, 1),  -- Neighborhood Beautification
    (15, 1),  -- Neighborhood Cleanup

    -- Education
    (9, 2);   -- Urban Garden Workshop

SELECT 
    project.title,
    category.name
FROM project_category
JOIN project
    ON project_category.project_id = project.project_id
JOIN category
    ON project_category.category_id = category.category_id
ORDER BY category.name, project.title;
	
SELECT*FROM project_category;