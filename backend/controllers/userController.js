import UserModel from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const getUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find().sort({ _id: -1 }).select('-password');
        // const allUsers = await UserModel.find().sort({ _id: -1 }).select('-password -isAdmin');
        res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({ _id: user._id, name: user.username, lastName: user.lastName, email: user.email, preferences: user.preferences, isAdmin: user.isAdmin });
    } else {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
}

const register = async (req, res) => {
    const { username, lastName, email, password } = req.body;

    const userExits = await UserModel.findOne({ email });

    if(userExits) {
        return res.status(400).send({ message: 'This email is not available! Try another one.' });
    }

    const user = await UserModel.create({ username, lastName, email, password, createdAt: new Date().toISOString() });

    if(user) {
        res.status(201).json({ _id: user._id, name: user.name, email: user.email });
    } else {
        return res.status(400).send({ message: 'Invalid user data' });
    }
}

const updateUserProfile = async (req, res) => {
    const id = req.params.id;
    const { username, lastName, email, password, currentPassword } = req.body;

    try {   
        const user = await UserModel.findById(id);
        if(!user) {
            return res.status(404).send('No user found with that id.');
        }
        
        if(user) {
            user.username = username || user.username;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email
            ;
            // If the new password was provided then we need to hash it and save in DB as well
            if(password) {
                if(await user.matchPassword(currentPassword)) {
                    user.password = password;
                } else {
                    return res.status(500).send({ message: 'Current Password is wrong!' });
                }
            }
        }
        await user.save();
        res.status(200).send({ message: 'User profile upated', user: user, success: true });
    } catch (error) {   
        return res.status(500).send({ message: error.message });
    }
}

const updateUserPreferences = async (req, res) => {
    const { category } = req.body;
    // const userId = req.user.id;
    const userId = req.params.id;

    try {
        // Find the user by ID
        const user = await UserModel.findById(userId).select('-password');
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Check if the category already exists in preferences
        const existingCategory = user.preferences.find(pref => pref.category === category);
    
        if (existingCategory) {
          // If the category exists, increase the count
          existingCategory.count += 1;
        } else {
          // If it's a new category, add it with a count of 1
          user.preferences.push({ category, count: 1 });
        }
    
        await user.save();
        res.status(200).json({ message: 'Preferences updated successfully', user });
    } catch (error) {
        console.error('Error updating user preferences:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'User logged out' });
};

export { login, register, updateUserProfile, updateUserPreferences, logoutUser };