const requireRole = (role) => (req, res, next) => {
    if (!req.session?.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }

    if (req.session.user.role_name !== role) {
        return res.sendStatus(403);
    }

    next();
};

export { requireRole };