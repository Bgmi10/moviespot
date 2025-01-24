import { useParams } from "react-router-dom";
import DetailPage from "../DetailPage";
import useSearchDetailPage from "../hooks/useSearchDetailPage";

export default function SearchDetailPage() {
    const { id } = useParams();
   
    const { data, error, loader } = useSearchDetailPage(id);

    return(
        <>
          <DetailPage data={data} loader={loader} error={error} />
        </>
    )
}