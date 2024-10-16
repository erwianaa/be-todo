const bcrypt = require('bcrypt');

module.exports = (userModel) => {
    async function registerUser(email, password) {
        const user = await userModel.findOne({
            where: {email: email},
        });

        if (user != null) {
            throw "Email already registered";
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await userModel.create({
            email: email,
            password: hashedPassword,
        });

        return createdUser;
    }

    async function loginUser(email, password) {
        const user = await userModel.findOne({
            where: {email: email},
        });

        if (!user) {
            throw "invalid email or password";
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw "invalid email or password";
        }

        return user;
    }

    return {
        registerUser,
        loginUser,
    };
}