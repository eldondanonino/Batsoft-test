class Router {
  constructor(app, database) {
    this.login(app, database);
    this.logout(app, database);
    this.getstatus(app, database);
    this.signup(app, database);
  }

  //login endpoint checking with the database if the credentials are valid
  login(app, database) {
    app.post("/login", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;

      console.log(
        `\nreceived login request -> username : ${username} / password : ${password}`
      );

      let cols = [username];
      database.query(
        "SELECT * FROM user WHERE username = ? LIMIT 1",
        cols,
        (err, data) => {
          if (err) {
            res.json({ success: false, message: "cant login with the db" });
            return false;
          }

          if (data && data.length === 1) {
            if (data[0].password === password) {
              database.query(
                "UPDATE user SET logged = 1 WHERE username = ?",
                cols,
                (err, data) => {
                  if (err) {
                    res.json({
                      success: false,
                      message: "Cant update the login status",
                    });
                    return false;
                  }
                }
              );
              res.json({
                success: true,
                message: "LOGGED IN WITH DB",
                username: username,
              });
            } else {
              res.json({ success: false, message: "Wrong password" });
              return false;
            }
          } else {
            res.json({ success: false, message: "Wrong credentials" });
            return false;
          }
        }
      );
    });
  }

  //logout endpoint ensuring the user is disconnected
  logout(app, database) {
    app.post("/logout", (req, res) => {
      console.log(`received logout request`);

      database.query(
        "SELECT * FROM user WHERE logged = 1 LIMIT 1",
        (err, data) => {
          if (err) {
            res.json({ success: false, message: "cant logout with the db" });
            return false;
          }

          if (data && data.length === 1) {
            database.query(
              "UPDATE user SET logged = 0 WHERE username = ?",
              data[0].username,
              (err, data) => {
                if (err) {
                  res.json({
                    success: false,
                    message: "Cant update the login status",
                  });
                  return false;
                }
              }
            );
            res.json({ success: true, message: "LOGGED OUT WITH DB" });
            return true;
          } else {
            res.json({
              success: false,
              message: "Couldn't find the user in the database",
            });
            return false;
          }
        }
      );
    });
  }

  //signup endpoint adding a user to the database if it doesnt already have it 
  signup(app, database) {
    app.post("/signup", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;

      console.log(
        `\nreceived signup request -> username : ${username} / password : ${password}`
      );

      let cols = [username];
      console.log(cols);
      database.query(
        "SELECT * FROM user WHERE username = ? LIMIT 1",
        cols,
        (err, data) => {
          if (err) {
            res.json({ success: false, message: "cant login with the db" });
            return false;
          }

          if (data && data.length === 0) {
            database.query(
              "INSERT INTO user (username,password,logged) VALUES (? , ? , ?)",
              [username, password, 0],
              (err, data) => {
                if (err) {
                  res.json({ success: false, message: "Cant signup" });
                  return false;
                }
              }
            );
            res.json({
              success: true,
              message: "SIGNED UP WITH DB",
              username: username,
            });
            return true;
          } else {
            res.json({ success: false, message: "Already a user" });
            return false;
          }
        }
      );
    });
  }

  //Sends a success if a user is logged in
  getstatus(app, database) {
    app.post("/getstatus", (req, res) => {
      console.log(`received status request `);
      database.query(
        "SELECT * FROM user WHERE logged = 1 LIMIT 1",
        (err, data) => {
          if (err) {
            res.json({
              success: false,
              message: "cant get the user from the db",
            });
            return false;
          }

          if (data && data.length === 1) {
            console.log(`Sending login ${true} to front`);
            res.json({
              success: true,
              message: "Sending status",
              username: data[0].username,
            });
          } else {
            res.json({
              success: false,
              message: "Couldnt find a logged in user",
            });
            return false;
          }
        }
      );
    });
  }
}

module.exports = Router;
