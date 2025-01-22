import { useParams } from "react-router-dom"
import useFetchCategoryDetailPage from "../hooks/useFetchSectionDetailPage";
import DetailPage from "../DetailPage";

export default function SectionDetailPage() {
    const { id, category, type } = useParams();
    const { data, error, loader } = useFetchCategoryDetailPage(id, type, category);

    return(
       <> 
         <DetailPage data={data} loader={loader} error={error} />
        </>
    )
}