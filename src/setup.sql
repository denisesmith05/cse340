// W02

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