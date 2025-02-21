import { checkPassword } from "../../utils/checkPassword";

export default function AdminCheck({ setpassword, password, setIsAuthenticated }) {

  const handleClick = () => {
    const isauth = checkPassword(password);

    if (isauth) {
      localStorage.setItem('isAdminAuth', isauth);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  return(
    <div className='justify-center flex'>
        <div className='h-screen flex justify-center items-center'>
            <input
              type='text'
              className='ml-2 outline-none rounded-md m-1 p-2'
              placeholder='password'
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              className='bg-rose-600 p-2 m-2 text-black rounded-md'
              onClick={handleClick}
            >
              Let`s go
            </button>
        </div>
    </div>
  )
}