export const checkPassword = (password) => {
    if(password !== process.env.REACT_APP_ADMIN_PASSWORD){
        alert('password wrong');
        return false;
    }
    return true;
}