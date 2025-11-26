import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { previewDriveUrl } from "../../utils/helper";
import Player from "./Player";
import ScrollToTop from "../ScrollToTop";

export default function VideoPlayer() {
  const { videoId, id } = useParams();
  const sliderCachedData = useSelector((store) => store.cacheSlider.sliderDetail);
  const sectionCachedData = useSelector((store) => store.cacheSection.sectionDetailPage);
  const searchCachedData = useSelector(store => store.cacheSearch.searchDetailPageCache);
  const data = [...sliderCachedData, ...sectionCachedData, ...searchCachedData];
  const [currentSliderData, setCurrentSliderData] = useState(null);
  const navigate = useNavigate();
  const previewUrl = previewDriveUrl(videoId);
  const searchParams = new URLSearchParams(window.location.search);
  const isDash = searchParams.get('dash')
  console.log(currentSliderData)
  useEffect(() => {
    if (data.length === 0) {
      navigate(`/slider/detail/${id}`);
      //http://localhost:3000/section/detail/movies/English/1156593
    }

    if (data && id) {
      const item = data.find((item) => item.id === parseInt(id));
      setCurrentSliderData(item);
      
      const currentPath = window.location.href;
      const seasonMatch = currentPath.match(/[?&]season=(\d+)/);
      const episodeMatch = currentPath.match(/[?&]episode=(\d+)/);

      if (seasonMatch && episodeMatch) {
        setCurrentSliderData((prev) => ({ ...prev, season: seasonMatch[1], episode: episodeMatch[1] }))
      }
    }
  }, [data, videoId, id, navigate]);

  return (
    <>
      <ScrollToTop />
      <Player previewUrl={previewUrl} data={currentSliderData} isDash={isDash} />
    </>
  );
}
