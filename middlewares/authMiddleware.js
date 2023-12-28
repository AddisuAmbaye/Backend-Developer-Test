import prisma from "../config/db.js";

export const isAdmin = async (req, res, next) => {
    try {
        // find the login user
        const user = await prisma.user.findUnique({
            where: {
                id: req.userAuth,
            },
        });

        // check if admin
        if (user?.isAdmin) {
            next()
        } else {
            throw new Error("Access denied, admin only");
        }
    } catch (error) {
        next(error);
    }
}

// Middleware to check if the user owns the task
export const ownsTask = async (req, res, next) => {
    const userId = req.userAuth;
    const taskId = req.params.taskId; // Assuming task ID is in the request params
    const userOwnsTask = await prisma.user
        .findUnique({ where: { id: userId } })
        .tasks({ where: { id: taskId } });

    if (userOwnsTask || (await isAdmin(req, res, next))) {
        next(); // User owns the task or is an admin, proceed to the next middleware or route
    } else {
        res.status(403).json({ error: 'Permission denied' }); // User does not own the task
    }
};

// Middleware to check if the user owns the project
export const ownsProject = async (req, res, next) => {
    const userId = req.userAuth;
    const projectId = req.params.projectId; // Assuming project ID is in the request params
    const userOwnsProject = await prisma.user
        .findUnique({ where: { id: userId } })
        .projects({ where: { id: projectId } });

    if (userOwnsProject || (await isAdmin(req, res, next))) {
        next(); // User owns the project or is an admin, proceed to the next middleware or route
    } else {
        res.status(403).json({ error: 'Permission denied' }); // User does not own the project
    }
};
