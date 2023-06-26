import { createToken } from "utils/auth/auth";
import bcrypt from 'bcrypt';
import CreateUser from "utils/users/CreateUser";

export default async function handler(req, res) {
//   console.log("req.body:", req.body);
  const data = req.body;
  const user = await CreateUser(data);

  // In a real application you would hash the password and save the user to a database
//   const hashedPassword = await bcrypt.hash(password, 10);


//   const token = createToken({ id: userId });

  // Return the JWT to the client
  res.status(200).json({ okay: "okay" });
}
