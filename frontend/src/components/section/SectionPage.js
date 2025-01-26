import { Link, useParams } from "react-router-dom";
import useSectionPage from "../hooks/useSectionPage";
import Loader from "../admin/Loader";
import { poster_url } from "../../utils/constants";
import gif from "../../img/movieSpotgif.gif";
import ScrollToTop from "../ScrollToTop";

export default function SectionPage() {
    const { type, category, title } = useParams();
    console.log(title)
    const { data, loader, error } = useSectionPage(type, category, title);

    return(
        <div className={'px-4 py-32'}>
            <ScrollToTop />
            <div className="grid sm: grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {loader ? <div className="h-screen bg-black"><Loader loading={loader} /></div> : data?.map((item) => (
                 <Link to={`/search/detail/${item.id}`} key={item.id}>
                      <div className="flex flex-col gap-1 hover:scale-105 transition-transform">
                            <img
                              src={item.posterPath ? `${poster_url}${item.posterPath}` : gif}
                              alt="movie poster"
                              className="lg:w-full sm: w-32 lg:rounded-3xl sm: rounded-xl"
                            />
                            <span className="text-white lg:text-2xl sm: text-xs font-bold">
                             {item.title} ({item.releaseDate.slice(0, 4)})
                            </span>    
                            <div className="flex flex-wrap gap-2">
                              {
                               item.language.map((lang) => (
                               <span key={lang} className="lg:text-sm sm: text-[8px] rounded-xl text-rose-600 font-bold">{lang}</span>
                               ))
                              }
                        </div>
                      </div>
                  </Link>
                ))}
            </div>
        </div>
    )
}