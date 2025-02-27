export const checkPassword = (password) => {
    console.log(process.env.REACT_APP_ADMIN_PASSWORD)
    if(password !== process.env.REACT_APP_ADMIN_PASSWORD){
        alert('password wrong');
        return false;
    }
    return true;
}