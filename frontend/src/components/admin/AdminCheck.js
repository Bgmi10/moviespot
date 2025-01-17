import { checkPassword } from "../../utils/checkpassword";

export default function AdminCheck({ setIsAuthenticated, setpassword, password }) {
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
              onClick={() => { 
                const a = checkPassword(password);
                setIsAuthenticated(a);
            }}
            >
              Let`s go
            </button>
        </div>
    </div>
  )
}