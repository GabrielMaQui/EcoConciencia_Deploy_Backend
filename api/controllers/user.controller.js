import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id: user_id } = req.params;
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  //   const userToCreate = req.body;
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const userToCreate = { ...req.body, password: passwordHash };
    const user = new User(userToCreate);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: user_id } = req.params;
  const userToUpdate = req.body;
  try {
    const user = await User.findByIdAndUpdate(user_id, userToUpdate, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  // Verificamos la petición
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ message: "Bad request" });

  // Comprobamos que exista un usuario con el correo ingresado
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Validamos la contraseña encriptada
  bcrypt.compare(password, user.password, (error, isValid) => {
    if (isValid) {
      jwt.sign(
        { email: user.email },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.status(200).json({ token, user });
          } else res.status(401).json({ message: "Error generating token" });
        }
      );
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
