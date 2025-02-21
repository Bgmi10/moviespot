import { useAuth0 } from "@auth0/auth0-react"

const Useauth = () =>{
    const { user, isAuthenticated ,getAccessTokenSilently  } = useAuth0();
    return { user, isAuthenticated, getAccessTokenSilently };
}

export default Useauth