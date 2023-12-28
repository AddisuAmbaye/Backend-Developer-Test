import prisma from "../config/db.js";

const isAdmin = async (req, res, next) => {
  try {
    // find the login user
    const user = await prisma.user.findUnique({
      where: {
        id: req.userAuth,
      },
    });

    // check if admin
    if (user?.isAdmin) {
      next();
    } else {
      throw new Error("Access denied, admin only");
    }
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
