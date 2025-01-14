import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BackToAdmin({ setIsOpen }) {
    return(
        <>
         <FontAwesomeIcon icon={faArrowLeft} onClick={() => setIsOpen(true)} className="text-white cursor-pointer mb-3 mt-3" />
        </>
    )
}