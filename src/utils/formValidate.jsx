export const formValidation = (email,password) => {

    const isEmailValid = /^[a-z0-9][\w\.]+\@\w+?(\.\w+){1,}$/gi.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(password);
    if (!isEmailValid) return "email is not valid"
    if (!isPasswordValid) return "password is not valid"
    return null;

}