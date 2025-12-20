import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlay, faShare, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Crewcast } from './Crewcast';
import { Feedbackform } from './Feedback/Feedbackform';
import Loader from './admin/Loader';
import { poster_url, poster_url_desktop } from '../utils/constants';
import RatingCircle from './RatingCircle';
import { extractDriveId } from '../utils/helper';
import ScrollToTop from './ScrollToTop';
import axios from 'axios';

const DetailPage = ({ data, loader }) => {
  const [feedbackform , setfeedbackform] = useState(false);
  const theme = useSelector(store => store.theme.toggletheme);
  const [seasons, setSeasons] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [shrinkloader, setShrinkLoader] = useState(false);
  const video = data?.[0];
  
  useEffect(() => { 
    if (!video?.drivePreviewUrl || video.drivePreviewUrl === "" || !video.drivePreviewUrl.length === 0) return;
  
    setSeasons((prev) => {
      const updatedSeasons = { ...prev };
  
      data[0].drivePreviewUrl.forEach((item) => {
        const { season, url, moviespotFileName, fileType } = item;
        
        if (season || url) {
          if (!updatedSeasons[season]) {
            updatedSeasons[season] = [];
          }
          updatedSeasons[season] = [
            ...updatedSeasons[season],
            { url, season, moviespotFileName, fileType },
          ];
        }
      });
  
      return updatedSeasons;
    });
  }, [data]);
  
  const handleshareclick = async() => {
   const url  = `https://movieapp-cd283.web.app/slider/detail/${id}`;
   const whatsappUrl = `https://api.whatsapp.com/send?text=${url}`;
   window.open(whatsappUrl , '_blank');
  }
  
  const handleshowfeedbackform = () =>{
    setfeedbackform(true);
  }

  const noImage = "https://dummyimage.com/600x400/000/fff&text=no+image";

  const handlePlayVideo = () => {
    if (video?.drivePreviewUrl?.[0]?.url !== "" && video?.drivePreviewUrl !== "" && video?.drivePreviewUrl?.length > 0) {
      navigate(`/slider/detail/${id}/${extractDriveId(data?.[0]?.drivePreviewUrl?.[0]?.url)}`);
    } else {
      navigate(`/slider/detail/${id}/${video.dashVideoId}?dash=true`);
    }
  }

  const handleGenerateShrinkLink = async(url) => {
    setShrinkLoader(true);
    try{
      const response = await axios.get(`https://shrinkme.io/api?api=f8c27b0bf544459944e809712ce63c02b4c3689d&url=${encodeURIComponent(url)}`, {}, { headers : { "Content-Type": "application/json" } });
      const finalUrl = response.data.shortenedUrl;
      window.location.href  = finalUrl;
    } catch (e) {
      console.log(e);
    } finally {
      setShrinkLoader(false);
    }
  } 

 return (
  <>
  <div className="relative">
    <ScrollToTop />
    {loader ? (
      <Loader loading={loader} />
    ) : (
      <div className="relative">
        <div className="flex flex-col">
          {feedbackform && (
            <Feedbackform
              data={data}
              toggleform={setfeedbackform}
              movieid={id}
              theme={theme}
            />
          )}
          <div className="inset-0 ease-in-out shadow-lg rounded-lg text-white lg:mb-20 mb-60">
            <div className="relative">
            <img
              src={data?.[0]?.backdropPath !== null ? poster_url_desktop + data?.[0]?.backdropPath : noImage}
              className="w-full lg:h-96 object-cover object-center sm: h-64"
              style={{ position: 'relative' }}
              alt='backdrop'
              loading='eager'
            />
            <div
              className="absolute inset-0 flex flex-col sm: px-4 lg:px-10 lg:py-[120px] sm: py-[80px] bg-gradient-to-t from-black/90 via-black/60 to-transparent"
            >
              <div className="lg:flex lg:py-0 space-y-4">
                <img
                  src={poster_url + data?.[0]?.posterPath}
                  className="mb-1 lg:rounded-2xl sm: rounded-xl duration-500 ml-5 transition-transform lg:w-48 sm: w-24"
                  style={{
                    zIndex: 10,
                  }}
                  alt=""
                  loading='eager'
                />
                <div className="px-5">
                  <h1 className="text-white lg:text-4xl font-bold sm: text-xl transition-transform duration-500 lg:mb-2 sm: mb-1">
                    {data?.[0]?.title} <span className='text-gray-200 text-xs'>({data?.[0]?.releaseDate.slice(0, 4)})</span>
                  </h1>
                  {<p className="text-xs text-gray-200 lg:mb-2 sm: mb-1 sm: line-clamp-3 lg:line-clamp-4 lg:text-lg">
                    {data?.[0]?.overview}
                  </p>}
                  <div className="flex gap-1 lg:mb-2 sm: mb-1 flex-wrap mt-4">
                    {data?.[0]?.language?.map((u) => (
                      <span
                        key={u}
                        className="border backdrop-blur-sm text-white rounded-lg lg:px-3 lg:py-1 sm: px-2 sm: py-1 lg:text-sm font-normal duration-300 ease-linear relative sm: text-xs"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                  <div
                    className={
                      theme
                        ? 'text-gray-300 sm: grid lg:flex lg:gap-2 sm: grid-cols-2 sm: gap-3 mt-4'
                        : 'text-gray-700 lg:flex p-2'
                    }
                  >
                    {data?.[0]?.type === 'movies' && (
                      <>
                        <div
                          className="lg:py-2 lg:px-4 sm: px-4 text-sm text-center lg:w-auto rounded-lg flex border border-gray-300 items-center gap-1 cursor-pointer "
                          onClick={handlePlayVideo}
                        >
                            <span>Play Now</span>
                            <FontAwesomeIcon icon={faPlay} className="text-sm" />
                        </div>
                        <button
                        onClick={() =>
                          handleGenerateShrinkLink(
                            `https://drive.google.com/uc?export=download&id=${extractDriveId(
                              data?.[0]?.drivePreviewUrl?.[0]?.url
                            )}`
                          )
                        }
                        className="sm: px-2 sm: py-1 lg:px-3 lg:py-1 lg:text-sm sm:text-xs rounded-lg flex lg:ml-1 lg:w-auto border bg-transparent 
                          bg-clip-padding
                          border-gradient-to-r from-silver-300 via-silver-400 to-silver-500
                          text-white duration-300 ease-in-out
                          "
                      >
                        {shrinkloader ? (
                          <div className="items-center flex gap-1">
                            <FontAwesomeIcon icon={faSpinner} spin />
                            <span>Generating...</span>
                          </div>
                        ) : (
                         <div className='flex items-center gap-1'> Download HD <FontAwesomeIcon icon={faDownload}  className="text-sm" /> </div>
                        )}
                      </button>
                      
                      </>
                    )}
                    <button
                      className="items-center bg-red-600 hover:bg-red-700 lg:py-3 sm: px-4 sm: py-1 lg:px-2 sm: text-sm lg:text-sm lg:w-auto rounded-lg flex lg:ml-1 text-white"
                      onClick={handleshowfeedbackform}
                    >
                      <FontAwesomeIcon icon={faStar} className="text-yellow-300 text-sm mr-1" /> Rate
                    </button>
                    <button
                      className="items-center bg-blue-500 hover:bg-blue-600 lg:py-3 sm: px-4 sm: py-1 lg:px-3 lg:text-sm sm: text-sm rounded-lg lg:w-auto flex lg:ml-1 text-white"
                      onClick={handleshareclick}
                    >
                      Share <FontAwesomeIcon icon={faShare} className="text-sm ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      
    )}
  </div>
  {data?.[0]?.type === 'series' && (
            <div>
              {Object.entries(seasons).map(([title, item], seasonIndex) => (
                <div key={seasonIndex}>
                  <div className="flex flex-col">
                    <div className="m-4">
                      <span className="lg:text-3xl text-rose-600 font-bold sm: text-2xl">
                        Season - <span className="lg:text-3xl sm:text-2xl text-white font-bold">{seasonIndex + 1}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap ml-5 gap-0">
                      {item?.map((episode, index) => (
                        <div key={index} className="flex flex-col gap-4 m-2 items-center">
                          <button
                            className="border text-white p-3 rounded-lg px-10 font-bold"
                            onClick={() =>
                              navigate(
                                `/slider/detail/${id}/${extractDriveId(
                                  episode.url
                                )}?season=${seasonIndex + 1}?episode=${index + 1}`
                              )
                            }
                          >
                            Episode 0{index + 1} <FontAwesomeIcon icon={faPlay} className="text-white" />
                          </button>
                          <button
                          onClick={() => handleGenerateShrinkLink(`https://drive.google.com/uc?export=download&id=${extractDriveId(
                           episode.url
                          )}`)}
                            className="p-3 bg-white text-black px-14 rounded-lg font-bold"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
  )}
  <Crewcast id={data?.[0]?.id} type={data?.[0]?.type} />
</>

  )
}

export default DetailPage