import jwt from 'jsonwebtoken';

export function createToken(userId) {
  // Expires in one day
  const expiresIn = 24 * 60 * 60;
  const secret = process.env.JWT_SECRET;

  const payload = {
    sub: userId,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  return signedToken;
}

export async function decodeToken(token) {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}