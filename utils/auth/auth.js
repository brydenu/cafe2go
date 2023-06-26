import jwt from 'jsonwebtoken';

export function createToken(user) {
  // Expires in one day
  const expiresIn = 24 * 60 * 60;

  const payload = {
    sub: user.id,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  return signedToken;
}

export function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}