const User = require('../../schemas/users-schema');

const handleError = (res, error) => {
    res.status(500).send(error.message);
};

const addUser = async (req, res) => {
    const { name, age, email, tel, role } = req.body;
    const existingUser = await User.find({ email: email });
    if (existingUser.length > 0) {
        res.status(400).send('User already created with this email');
        return;
    };
    let user = new User({ name, age, email, tel, role});
    try {
        user = await user.save();
        res.status(201).send(user);
    } catch(error) {
        handleError(res, error);
    };
};

const getUser = async (req, res) => {
    let existingUser;
    try {
        existingUser = await User.findById(req.params.id);
    } catch(error) {
        res.status(404).send('Current id is not exist');
        return;
    };
    try {
        res.status(200).json(existingUser);
    } catch(error) {
        handleError(res, error);
    };
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).send(users);
    } catch(error) {
        handleError(res, error);
    };
};

const updateUser = async (req, res) => {
    const { name, age, email, tel, role} = req.body;
    const { id } = req.params;
    let existingUser;
    try {
        existingUser = await User.findById(req.params.id);
    } catch(error) {
        res.status(404).send('Current id is not exist');
        return;
    };
    try {
        await User.findByIdAndUpdate(id, { name, age, email, tel, role}, { new: true });
        res.status(200).json('Current user is updated');
    } catch(error) {
        handleError(res, error);
    };
};

const deleteUser = async (req, res) => {
    let existingUser;
    try {
        existingUser = await User.findById(req.params.id);
    } catch(error) {
        res.status(404).send('Current id is not exist');
        return;
    };
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Current user is deleted');
    } catch(error) {
        handleError(res, error);
    }
};

module.exports = {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
}