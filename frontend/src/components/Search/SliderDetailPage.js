import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import ShareIcon from '@mui/icons-material/Share';
import { Crewcast } from '../Crewcast';
import { Feedbackform } from '../Feedback/Feedbackform';
import useSearchSliderApi from '../Hooks/useSearchSliderApi';
import Loader from '../admin/Loader';
import { poster_url } from '../../utils/constans';
import RatingCircle from '../RatingCircle';
import { extractDriveId } from '../../utils/helper';

const SliderDetailPage = () => {
  const [feedbackform , setfeedbackform] = useState(false);
  const { id } = useParams();
  const theme = useSelector(store => store.theme.toggletheme);
  const { data, loader } = useSearchSliderApi(id);
  const [seasons, setSeasons] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!data?.[0]?.drivePreviewUrl) return;
  
    setSeasons((prev) => {
      const updatedSeasons = { ...prev };
  
      data[0].drivePreviewUrl.forEach((item) => {
        const { season, url, moviespotFileName, fileType } = item;
  
        if (season) {
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

  const getImageSource = () => {
    if (data) {
      return `${poster_url}${data?.[0]?.backdropPath}`;
    } else if (data?.[0]?.backdropPath) {
      return data?.[0]?.backdropPath;
    }
  };

  const posterimg = () => {
    if (data) {
      return `${poster_url}${data?.[0]?.posterPath}`;
    } else if (data?.[0]?.posterPath) {
      return data?.[0].posterPath;
    }
  };

  const handlePlayVideo = () => {
    navigate(`/slider/detail/${id}/${extractDriveId(data?.[0]?.drivePreviewUrl?.[0]?.url)}`);
  }

 return (
  <> 
   {loader ? <Loader loading={loader}/> : ( 
    <div>  
      <div  className="flex flex-col">
        {feedbackform && <Feedbackform data={data} toggleform={setfeedbackform} movieid={id} theme={theme} />}
        <div className="relative  inset-0 ease-in-out shadow-lg rounded-lg text-white" >
            <img src={getImageSource()}  className="sm: w-full sm: h-[800px] lg:w-full lg:h-full object-cover  object-center brightness-50"/>
            <div
            className="absolute inset-0 flex flex-col  px-4  lg:py-[148px] sm: py-[120px]"
            style={{
              backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 50%)',
            }}
          >
            <div className="lg:flex lg:py-0">
              <img
                src={posterimg()}
                className={`mb-2 rounded-2xl duration-500 ml-5 transition-transform h-auto lg:w-80 sm: w-32`}
                style={{
                  zIndex: 10,
                }}
                alt=""
              />
             <div className="px-5">
                <h1 className={`text-white lg:text-6xl font-bold sm: text-3xl transition-transform duration-500 lg:mb-6 sm: mb-1`}>
                  {data?.[0]?.title}
                </h1>
                <p className="lg:text-xl sm: text-md text-gray-200 lg:mb-6 sm: mb-3 sm: line-clamp-4 lg:line-clamp-6">
                  {data?.[0]?.overview}
                </p>
                <div className='flex gap-2 lg:mb-6 sm: mb-4'>
                  {data?.[0]?.language?.map((u) => (
                    <span
                      key={u}
                      className="border-2 backdrop-blur-lg text-white rounded-lg lg:px-4 lg:py-2 sm: p-1 lg:text-xl font-semibold duration-300 ease-linear relative sm: text-lg"
                    >
                      {u}
                    </span>
                  ))}
                </div>
                <div className='lg:mb-6 sm: mb-4 flex gap-2'>
                 {data && <RatingCircle rating={data?.[0]?.averageRating} maxRating={10} />}
                </div>
                <div className='lg:mb-6 sm: mb-4 flex gap-2'>
                  <span
                    className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 ${
                      data?.[0]?.adult ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                    }`}
                  >
                    {data?.[0]?.adult ? (
                      <>
                        <span>This movie is suitable for adults only. 🔞</span>
                      </>
                    ) : (
                      <>
                        <span>This movie is suitable for all ages. 🧒</span>
                      </>
                    )}
                  </span>
                </div>
                <div className={theme ? 'text-gray-300 sm: grid lg:flex lg:gap-0 sm: grid-cols-2 sm: gap-3' : 'text-gray-700 lg:flex p-2'}>
                  {data?.[0]?.type === "movies" && <>
                   <div className={"px-6 py-3 text-center lg:w-auto rounded-md flex bg-rose-500 items-center gap-1 cursor-pointer hover:bg-rose-700"} onClick={handlePlayVideo}>
                      <span className='font-bold'>Play</span>
                      <FontAwesomeIcon icon={faPlay} />
                     </div>
                     <a
                        href={
                         `https://drive.google.com/uc?export=download&id=${extractDriveId(data?.[0]?.drivePreviewUrl?.[0]?.url)}`
                        }
                        className="px-6 py-3 rounded-md flex lg:ml-2 lg:w-auto bg-gradient-to-r from-rose-500 to-indigo-600 font-bold text-white hover:bg-indigo-700 transition duration-300"
                     >
                       Download HD
                     </a>
                     </>
                   }
                    <button
                      className={"bg-red-600 hover:bg-red-700 px-6 py-3 lg:w-auto rounded-md flex lg:ml-2 text-white font-bold"}
                      onClick={handleshowfeedbackform}
                    >
                    <FontAwesomeIcon icon={faStar} className='text-yellow-300 mt-1 m-1' /> Rate Now
                    </button>
                    <button
                      className={"bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md lg:w-auto flex lg:ml-2 text-white font-bold"}
                      onClick={handleshareclick}
                    >
                      Share <ShareIcon className='mt-[2px]' />
                    </button>
                      </div>
                 <div>
               </div>
            </div>         
          </div>
         </div>
       </div>
       </div>
     {
      data && data?.[0]?.type === "series" &&
      <div>
         {
           Object.entries(seasons).map(([title, item], seasonIndex) => (
             <div key={seasonIndex}>
                <div className="flex flex-col">
                  <div className='m-4'>
                    <span className="lg:text-3xl text-rose-600 font-bold sm: text-2xl">Season - <span className='lg:text-3xl sm: text-2xl text-white font-bold'>{seasonIndex + 1} </span></span>
                   </div>
                   <div className='flex flex-wrap ml-5 gap-0'>
                      {
                        item?.map((item, index) => (
                        <div key={index} className='flex flex-col gap-4 m-2'>
                          <button className='border text-white p-3 rounded-lg px-10 font-bold' onClick={() => navigate(`/slider/detail/${id}/${extractDriveId(item.url)}?season=${seasonIndex + 1}?episode=${index + 1}`)}>Episode 0{index + 1} <FontAwesomeIcon icon={faPlay} className="text-white"/></button>
                          <a className='p-3 bg-white text-black px-14 rounded-lg font-bold' href={`https://drive.google.com/uc?export=download&id=${extractDriveId(item.url)}`}>Download</a>
                        </div>  
                        ))
                      }
                   </div>
                </div>  
             </div>
           ))
         }
      </div>
     }  
     <Crewcast id={id} />
    </div>)}
    </>
    
  )
}

export default SliderDetailPage
























