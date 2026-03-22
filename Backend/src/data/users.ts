import bcrypt from "bcrypt";
import { User } from "../types/auth.types";

const hashedPassword = bcrypt.hashSync("123456", 10);

export const users: User[] = [
  {
    id: 1,
    email: "admin@observability.com",
    password: hashedPassword,
    role: "admin",
    name: "Admin User",
  },
];
