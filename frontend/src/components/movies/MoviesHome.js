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
      <Section title={"Vijay’s Top Hits (Tamil)"} type={"movies"} category={"Vijay’s Top Hits (Tamil)"} />
      <Section title={"Upcoming"} type={"movies"} category={"Upcoming"} />
      <Section title={"Malayam"} type={"movies"} category={"Malayalam"} />
      <Section title={"Top Hits 2024"} type={"movies"} category={"Top Hits 2024"} />
    </>
    )
}