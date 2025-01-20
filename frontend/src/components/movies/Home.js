import useFetchSlider from "../Hooks/useFetchSlider";
import Mainslider from "../Mainslider";
import Section from "../section/Section";

export default function Home() {  
  const { moviessliderdata, loader } = useFetchSlider("movies"); 

    return(
        <>
          <Mainslider data={moviessliderdata} loader={loader} />
          <Section title={"English"} type={"movies"} category={"English"} />
        </>
    )
}