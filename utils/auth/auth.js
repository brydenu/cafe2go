import jwt from 'jsonwebtoken';

export function createToken(userId) {
  // Expires in one day
  const expiresIn = 24 * 60 * 60;
  console.log("userID", userId);
  
  const payload = {
    sub: userId,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  return signedToken;
}

export function decodeToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}