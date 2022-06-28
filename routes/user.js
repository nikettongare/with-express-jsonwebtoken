const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES } = process.env;

console.log(JWT_SECRET);

exports.routesConfig = (app) => {
  app.post("/user/login", async (req, res) => {
    const jwtToken = jwt.sign(req.body, JWT_SECRET, {
      expiresIn: `${JWT_EXPIRES}`,
      algorithm: "HS256",
    });

    return res.send({
      success: true,
      message: "Logged In",
      token: `${jwtToken}`,
    });
  });

  app.get("/user/list", async (req, res) => {
    if (req.headers["x-auth-token"]) {
      return jwt.verify(
        req.headers["x-auth-token"],
        JWT_SECRET,
        function (err, decoded) {
          if (err) {
            return res.send({
              success: true,
              message: err,
            });
          }

          return res.send({
            success: false,
            message: "user authorized done!",
            data: decoded,
          });
        }
      );
    }

    return res.send({
      success: false,
      message: "anothorized!",
    });
  });
};
