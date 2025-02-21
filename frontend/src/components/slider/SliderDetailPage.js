import { useParams } from "react-router-dom";
import DetailPage from "../DetailPage";
import useSliderDetailPage from "../../hooks/useSliderDetailPage";

export default function SliderDetailPage() {
    const { id } = useParams();

    const { data, error, loader } = useSliderDetailPage(id);

    return(
        <DetailPage data={data} loader={loader} error={error} id={id} />
    )
}