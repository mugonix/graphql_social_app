module.exports.validateRegistrationInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};

    if (username.trim() === "") {
        errors.username = "Username must not be empty!";
    }

    if (email.trim() === "") {
        errors.email = "Email must not be empty!";
    } else {
        const regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regExp)) {
            errors.email = "Email is not a valid !";
        }
    }


    if (password === "") {
        errors.password = "Password must not be empty!";
    } else if (password !== confirmPassword) {
        errors.password = "Password and Confirm Password must not match!";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};

    if (username.trim() === "") {
        errors.username = "Username must not be empty!";
    }

    if (password === "") {
        errors.password = "Password must not be empty!";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}