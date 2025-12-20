import { useEffect } from "react";
import useFetchSlider from "../../hooks/useFetchSlider";
import Mainslider from "../Mainslider";
import Section from "../section/Section";
import { baseUrl } from "../../config";
import { useCategory } from "../../contexts/CategoryContext";

export default function MoviesHome() {  
  const { moviessliderdata, loader } = useFetchSlider("movies"); 
  const { category } = useCategory();

  const fetchLog = async () => {
    try {
      await fetch(baseUrl + '/log');
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchLog();
  }, []);

  if (!category) return null

    return(
    <>
      <Mainslider data={moviessliderdata} loader={loader} />
      {
        category && category?.movies?.map((cat) => (
          <div key={cat}>
            <Section title={cat.title} type={"movies"} category={cat.title} />
          </div>
        ))
      }
    </>
    )
}