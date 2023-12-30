import prisma from "../config/db.js"

export const isAdmin = async (req, res, next) => {
  try {
    // Find the login user
    const user = await prisma.user.findUnique({
      where: {
        id: req.userAuth,
      },
    })

    // Check if admin
    if (user?.isAdmin) {
      next();
    } else {
      next(new Error("Access denied, admin only"))
    }
  } catch (error) {
    next(error)
  }
}

