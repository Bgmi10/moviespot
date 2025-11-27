import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(400).json({ success: false, message: "Unauthroized" });
        return;
    }
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValidToken) {
        res.status(400).json({ success: false, message: "Unauthroized" });
        return;
    }
    //@ts-ignore
    req.user = isValidToken;
    next();
};
//# sourceMappingURL=auth.js.map