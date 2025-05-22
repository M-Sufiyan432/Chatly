import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // console.log("Cookies in request:", req.cookies); // 🔍 See if 'token' is present

    let token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "token is not found" });
    }

    let verfiytoken = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verfiytoken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: `isauth error ${error}` });
  }
};

export default isAuth;