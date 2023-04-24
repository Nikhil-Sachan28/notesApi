const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) =>{

    try{
        // tokens are passed into headers and we are selecting that authorization token
        let token = req.headers.authorization;
        if(token){
            // token has some extra info and generally it is in form of bearer space( ) token value
            // so we storing the second element after splitting the token in variable token
            token = token.split(" ")[1];
            // jwt.verify verifies the token and if it verifies then we get used the user info like id and mail
            let user = jwt.verify(token, SECRET_KEY);
            //assigning the id to req 
            req.userId = user.id;

        }
        else{
            return res.status(401).json({ message : "Unauthorized User"});
        }

        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({ message : "Unauthorized User"});
    }
}

module.exports = auth;