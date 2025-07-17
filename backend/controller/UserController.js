const Usermodel = require('../models/Usermodel');





const getUsername = async (req, res) => {
    const userEmail = req.query.email;
    const user = await Usermodel.findOne({ email: userEmail }, 'firstname lastname');
    const fullName = `${user.firstname} ${user.lastname}`;
    res.send(fullName);
}




const signUp = async (req, res) => {

    try {

        const signupdata = new Usermodel({ ...req.body });
        await signupdata.save();
        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).send({ success: false, message: 'Server error' });
    }


}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        if (user.password !== password) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }


}


module.exports = { getUsername, signUp, login }



