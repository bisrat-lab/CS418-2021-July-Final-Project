const User = require("../model/users");
const jwt = require("jsonwebtoken");
const secret = "AB_product";

exports.login =async (req, res, next) => {
  const user = await new User(null,req.body.username,null,null,req.body.password,null).login()
  console.log(user)
  // user.login()

  if (user) {
    //generate token, send back
    const jwtToken = jwt.sign(
      {id:user._id,username: user.username, role: user.role },
      secret
    );
    res.json({ jwtToken });
  } else {
    res.json({ error: "Invalid user name and password" });
  }
};

exports.authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const jwtToken = authHeader.split(" ")[1];
    // console.log(jwtToken);
    try {
      const payload = jwt.verify(jwtToken, secret);
      console.log(payload);
      req.user = payload;

      next();
    } catch (error) {
      res.status(403).json({ error: "Forbiden" });
    }
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

// to get the user and we can give to a specific user an authorization
exports.authorizeAdmin = (req, res, next) => {
  console.log(req.user.role)
  // if (req.user.role === "admin") {
  //   next();
  // } else {
  //   res.status(401).json({ error: "Unauthorized!" });
  // }
};
