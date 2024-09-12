import RegisterI from '../Models/RegisterI.js';
import RegisterT from '../Models/RegisterT.js';
import Login from '../Models/Login.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const adminRegister = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await Login.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'This username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newAdmin = new Login({ username, password: hashedPassword, userType: 'Admin' });
        const adminResponse = await newAdmin.save();
        res.json(adminResponse);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const TrainerRegister = async (req, res) => {
    try {
        let file=req.file.filename
        req.body={...req.body,photo:file}
        let newdata = new RegisterT(req.body);
        let response = await newdata.save();
        console.log(response);
        let user = new Login({ ...req.body, password: await bcrypt.hash(req.body.password, SALT_ROUNDS), userType: 'trainer', userId: response._id });
        let response1 = await user.save();
        res.json(response1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering trainer' });
    }
};

export const InternRegister = async (req, res) => {
    try {
        let file=req.file.filename
        req.body={...req.body,photo:file}
        let newdata = new RegisterI(req.body);
        let response = await newdata.save();
        let user = new Login({ ...req.body, password: await bcrypt.hash(req.body.password, SALT_ROUNDS), userType: 'intern', userId: response._id });
        let response1 = await user.save();
        console.log(response1);
        res.json(response1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering intern' });
    }
};

export const Logined = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Login.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ username: user.username, userType: user.userType, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in Login' });
    }
};
