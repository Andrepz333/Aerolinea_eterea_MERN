import User from '../models/users.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';


//http://localhost:4000/api/create
export const create = async (req, res) => {
    try {
        const { name, nationality, documentType, documentNumber, birthday, gender, phone, email, password, dataProcessing, dataPolicy } = req.body;

        const userFound = await User.findOne({ email });

        if (userFound)
            return res.status(400).json({ 
                message: ['El email ya está registrado'],
            });
        

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({ 
            name,
            nationality,
            documentType,
            documentNumber,
            birthday,
            gender,
            phone,
            email, 
            password: hashedPassword, 
            dataProcessing,
            dataPolicy
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id: userSaved._id,
        });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV === 'desarrollo',
            secure: true,
            sameSite: 'none',
            });

        res.json({
            id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
        });
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

//http://localhost:4000/api/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (!userFound)
            return res.status(400).json({ 
                message: ['El email no está registrado'],
            });
        
            const isMatch = await bcryptjs.compare(password, userFound.password);
            if (!isMatch)
                return res.status(400).json({ 
                    message: ['Contraseña incorrecta'],
                });

            const token = await createAccessToken({
                id: userFound._id,
                email: userFound.email,
                });

            res.cookie("token", token, {
                httpOnly: process.env.NODE_ENV === 'desarrollo',
                secure: true,
                sameSite: 'none',
                });

            res.json({
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
                nationality: userFound.nationality,
                documentType: userFound.documentType,
                documentNumber: userFound.documentNumber,
                birthday: userFound.birthday,
                gender: userFound.gender,
                phone: userFound.phone,
                token: token  // También devolvemos el token
            });

    }catch (error) {
        res.status(500).json({message: error.message});
    }
};


export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.json(false);

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401);

    return res.json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        
    });
  });
};