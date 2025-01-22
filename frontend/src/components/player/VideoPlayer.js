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
  const data = [...sliderCachedData, ...sectionCachedData];
  const [currentSliderData, setCurrentSliderData] = useState(null);
  const navigate = useNavigate();
  const previewUrl = previewDriveUrl(videoId);
  
  useEffect(() => {
    if (data.length === 0) {
      navigate(`/slider/detail/${id}`);
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
      <Player previewUrl={previewUrl} data={currentSliderData} />
    </>
  );
}
