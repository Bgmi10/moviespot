import useFetchSlider from "../hooks/useFetchSlider";
import Mainslider from "../Mainslider";
import Section from "../section/Section";

export default function MoviesHome() {  
  const { moviessliderdata, loader } = useFetchSlider("movies"); 

    return(
    <>
      <Mainslider data={moviessliderdata} loader={loader} />
      <Section title={"English"} type={"movies"} category={"English"} />
      <Section title={"Tamil"} type={"movies"} category={"Tamil"} />
      <Section title={"New Releases"} type={"movies"} category={"New Releases"} />
    </>
    )
}