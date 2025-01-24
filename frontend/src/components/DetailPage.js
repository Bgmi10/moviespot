import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faShare, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Crewcast } from './Crewcast';
import { Feedbackform } from './Feedback/Feedbackform';
import Loader from './admin/Loader';
import { poster_url, poster_url_desktop } from '../utils/constants';
import RatingCircle from './RatingCircle';
import { extractDriveId } from '../utils/helper';
import ScrollToTop from './ScrollToTop';
import axios from 'axios';

const DetailPage = ({ data, loader, error }) => {
  const [feedbackform , setfeedbackform] = useState(false);
  const theme = useSelector(store => store.theme.toggletheme);
  const [seasons, setSeasons] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [shrinkloader, setShrinkLoader] = useState(false);
  console.log(data);
  
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

  const noImage = "https://dummyimage.com/600x400/000/fff&text=no+image";

  const handlePlayVideo = () => {
    navigate(`/slider/detail/${id}/${extractDriveId(data?.[0]?.drivePreviewUrl?.[0]?.url)}`);
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
  <div className="relative min-h-screen">
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
          <div className="inset-0 ease-in-out shadow-lg rounded-lg text-white">
            <div className="relative">
            <img
              src={data?.[0]?.backdropPath !== null ? poster_url_desktop + data?.[0]?.backdropPath : noImage}
              className="w-full lg:h-full object-cover object-center brightness-50 sm: h-screen"
              loading='eager'
            />
            <div
              className="absolute inset-0 flex flex-col sm: px-4 lg:px-10 lg:py-[120px] sm: py-[120px]"
              style={{
                backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.4) 50%)',
              }}
            >
              <div className="lg:flex lg:py-0">
                <img
                  src={poster_url + data?.[0]?.posterPath}
                  className="mb-2 lg:rounded-3xl sm: rounded-xl duration-500 ml-5 transition-transform h-auto lg:w-[400px] sm: w-32"
                  style={{
                    zIndex: 10,
                  }}
                  alt=""
                  loading='eager'
                />
                <div className="px-5">
                  <h1 className="text-white lg:text-6xl font-bold sm: text-3xl transition-transform duration-500 lg:mb-6 sm: mb-1">
                    {data?.[0]?.title} <span>({data?.[0]?.releaseDate.slice(0, 4)})</span>
                  </h1>
                  <p className="lg:text-xl sm: text-md text-gray-200 lg:mb-8 sm: mb-3 sm: line-clamp-4 lg:line-clamp-6">
                    {data?.[0]?.overview}
                  </p>
                  <div className="flex gap-2 lg:mb-8 sm: mb-4 flex-wrap">
                    {data?.[0]?.language?.map((u) => (
                      <span
                        key={u}
                        className="border-2 backdrop-blur-sm text-white rounded-lg lg:px-5 lg:py-2 sm: p-1 lg:text-2xl font-bold duration-300 ease-linear relative sm: text-lg"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                  <div className="lg:mb-8 sm: mb-4 flex gap-2">
                    {data && <RatingCircle rating={data?.[0]?.averageRating} maxRating={10} />}
                  </div>
                  <div className="lg:mb-8 sm: mb-4 flex gap-2">
                    <span
                      className={`px-5 py-3 rounded-lg font-bold flex items-center gap-2 lg:text-xl ${
                        data?.[0]?.adult ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
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
                  <div
                    className={
                      theme
                        ? 'text-gray-300 sm: grid lg:flex lg:gap-2 sm: grid-cols-2 sm: gap-3'
                        : 'text-gray-700 lg:flex p-2'
                    }
                  >
                    {data?.[0]?.type === 'movies' && (
                      <>
                        <div
                          className="lg:py-4 lg:px-4  sm: px-6 text-xl text-center lg:w-auto rounded-lg flex bg-rose-500 items-center gap-2 cursor-pointer hover:bg-rose-700"
                          onClick={handlePlayVideo}
                        >
                            <span className="font-bold">Play Now</span>
                            <FontAwesomeIcon icon={faPlay} className="mt-1 text-xl" />
                        </div>
                        <button
                          onClick={() => handleGenerateShrinkLink(`https://drive.google.com/uc?export=download&id=${extractDriveId(
                            data?.[0]?.drivePreviewUrl?.[0]?.url
                          )}`)}
                          className="sm: px-3 sm: py-2 lg:px-4 lg:py-4 lg:text-xl sm: text-lg rounded-lg flex lg:ml-2 lg:w-auto bg-gradient-to-r from-rose-500 to-indigo-600 font-bold text-white hover:bg-indigo-700 transition duration-300"
                        >
                        {shrinkloader ? 
                         <div className="items-center flex gap-1"> 
                           <FontAwesomeIcon icon={faSpinner} spin /> <span>Generating link...</span> 
                         </div> 
                         :
                         "Download HD"}
                        </button>
                      </>
                    )}
                    <button
                      className="bg-red-600 hover:bg-red-700 lg:py-4 sm: px-6 sm: py-3 lg:px-4 sm: text-lg lg:text-xl lg:w-auto rounded-lg flex lg:ml-2 text-white font-bold"
                      onClick={handleshowfeedbackform}
                    >
                      <FontAwesomeIcon icon={faStar} className="text-yellow-300 mt-1 m-1 text-xl" /> Rate Now
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 lg:py-4 sm: px-6 sm: py-3 lg:px-4 lg:text-xl sm: text-lg rounded-lg lg:w-auto flex lg:ml-2 text-white font-bold"
                      onClick={handleshareclick}
                    >
                      Share <FontAwesomeIcon icon={faShare} className="text-xl ml-2 mt-1" />
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
                        <div key={index} className="flex flex-col gap-4 m-2">
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
  <Crewcast id={id} type={data?.[0]?.type}/>
</>

  )
}

export default DetailPage


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faShare, faStar } from '@fortawesome/free-solid-svg-icons';
// import { useSelector } from 'react-redux';
// import { Crewcast } from '../Crewcast';
// import { Feedbackform } from '../Feedback/Feedbackform';
// import Loader from '../admin/Loader';
// import { poster_url, poster_url_desktop } from '../../utils/constants';
// import RatingCircle from '../RatingCircle';
// import { extractDriveId } from '../../utils/helper';
// import ScrollToTop from '../ScrollToTop';

// const DetailPage = ({ data, loader, error }) => {
//   const [feedbackform, setfeedbackform] = useState(false);
//   const theme = useSelector(store => store.theme.toggletheme);
//   const [seasons, setSeasons] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (!data?.[0]?.drivePreviewUrl) return;

//     setSeasons((prev) => {
//       const updatedSeasons = { ...prev };

//       data[0].drivePreviewUrl.forEach((item) => {
//         const { season, url, moviespotFileName, fileType } = item;

//         if (season) {
//           if (!updatedSeasons[season]) {
//             updatedSeasons[season] = [];
//           }
//           updatedSeasons[season] = [
//             ...updatedSeasons[season],
//             { url, season, moviespotFileName, fileType },
//           ];
//         }
//       });

//       return updatedSeasons;
//     });
//   }, [data]);

//   const handleshareclick = async () => {
//     const url = `https://movieapp-cd283.web.app/slider/detail/${id}`;
//     const whatsappUrl = `https://api.whatsapp.com/send?text=${url}`;
//     window.open(whatsappUrl, '_blank');
//   }

//   const handleshowfeedbackform = () => {
//     setfeedbackform(true);
//   }

//   const noImage = "https://dummyimage.com/600x400/000/fff&text=no+image";

//   const handlePlayVideo = () => {
//     navigate(`/slider/detail/${id}/${extractDriveId(data?.[0]?.drivePreviewUrl?.[0]?.url)}`);
//   }

//   return (
//     <>
//       <div className="relative min-h-screen">
//         <ScrollToTop />
//         {loader ? (
//           <Loader loading={loader} />
//         ) : (
//           <div className="relative">
//             <div className="flex flex-col">
//               {feedbackform && (
//                 <Feedbackform
//                   data={data}
//                   toggleform={setfeedbackform}
//                   movieid={id}
//                   theme={theme}
//                 />
//               )}
//               <div className="relative text-white">
//                 <div className="relative">
//                   <img
//                     src={data?.[0]?.backdropPath !== null ? poster_url_desktop + data?.[0]?.backdropPath : noImage}
//                     className="w-full lg:h-full object-cover object-center brightness-50 sm: h-screen"
//                     loading='eager'
//                     alt="backdrop"
//                   />
//                   <div
//                     className="absolute inset-0 flex items-center"
//                     style={{
//                       backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.4) 50%)',
//                     }}
//                   >
//                     <div className="container mx-auto px-4 lg:px-8">
//                       <div className="lg:flex lg:items-start lg:gap-8">
//                         <img
//                           src={poster_url + data?.[0]?.posterPath}
//                           className="sm: rounded-xl lg:rounded-3xl w-32 lg:w-[350px] h-auto shadow-lg"
//                           alt={data?.[0]?.title}
//                           loading='eager'
//                         />
//                         <div className="mt-4 lg:mt-0 lg:flex-1">
//                           <h1 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-4">
//                             {data?.[0]?.title}
//                           </h1>
//                           <p className="text-md lg:text-xl text-gray-200 mb-4 lg:mb-6 line-clamp-4 lg:line-clamp-none">
//                             {data?.[0]?.overview}
//                           </p>
//                           <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
//                             {data?.[0]?.language?.map((u) => (
//                               <span
//                                 key={u}
//                                 className="border-2 backdrop-blur-sm text-white rounded-lg px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base font-bold"
//                               >
//                                 {u}
//                               </span>
//                             ))}
//                           </div>
//                           <div className="mb-4 lg:mb-6">
//                             {data && <RatingCircle rating={data?.[0]?.averageRating} maxRating={10} />}
//                           </div>
//                           <div className="mb-4 lg:mb-6">
//                             <span
//                               className={`px-4 py-2 lg:px-5 lg:py-3 rounded-lg font-bold text-sm lg:text-base ${
//                                 data?.[0]?.adult ? 'bg-red-500' : 'bg-blue-500'
//                               }`}
//                             >
//                               {data?.[0]?.adult ? 'Adults Only 🔞' : 'Family Friendly 🧒'}
//                             </span>
//                           </div>
//                           <div className="flex flex-wrap gap-3 lg:gap-4">
//                             {data?.[0]?.type === 'movies' && (
//                               <>
//                                 <button
//                                   onClick={handlePlayVideo}
//                                   className="bg-rose-500 hover:bg-rose-600 px-6 py-2 lg:px-8 lg:py-3 rounded-lg font-bold text-sm lg:text-base flex items-center gap-2"
//                                 >
//                                   Play Now
//                                   <FontAwesomeIcon icon={faPlay} />
//                                 </button>
//                                 <a
//                                   href={`https://drive.google.com/uc?export=download&id=${extractDriveId(
//                                     data?.[0]?.drivePreviewUrl?.[0]?.url
//                                   )}`}
//                                   className="bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 px-6 py-2 lg:px-8 lg:py-3 rounded-lg font-bold text-sm lg:text-base"
//                                 >
//                                   Download HD
//                                 </a>
//                               </>
//                             )}
//                             <button
//                               onClick={handleshowfeedbackform}
//                               className="bg-red-600 hover:bg-red-700 px-6 py-2 lg:px-8 lg:py-3 rounded-lg font-bold text-sm lg:text-base flex items-center gap-2"
//                             >
//                               <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
//                               Rate Now
//                             </button>
//                             <button
//                               onClick={handleshareclick}
//                               className="bg-blue-500 hover:bg-blue-600 px-6 py-2 lg:px-8 lg:py-3 rounded-lg font-bold text-sm lg:text-base flex items-center gap-2"
//                             >
//                               Share
//                               <FontAwesomeIcon icon={faShare} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {data?.[0]?.type === 'series' && (
//         <div className="container mx-auto px-4 py-8">
//           {Object.entries(seasons).map(([title, item], seasonIndex) => (
//             <div key={seasonIndex} className="mb-8">
//               <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//                 <span className="text-rose-600">Season</span>{' '}
//                 <span className="text-white">{seasonIndex + 1}</span>
//               </h2>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {item?.map((episode, index) => (
//                   <div key={index} className="flex flex-col gap-2">
//                     <button
//                       className="w-full bg-transparent border border-white text-white px-4 py-2 rounded-lg font-bold hover:bg-white/10 flex items-center justify-center gap-2"
//                       onClick={() =>
//                         navigate(
//                           `/slider/detail/${id}/${extractDriveId(
//                             episode.url
//                           )}?season=${seasonIndex + 1}?episode=${index + 1}`
//                         )
//                       }
//                     >
//                       Episode {String(index + 1).padStart(2, '0')}{' '}
//                       <FontAwesomeIcon icon={faPlay} />
//                     </button>
//                     <a
//                       className="w-full bg-white text-black px-4 py-2 rounded-lg font-bold text-center hover:bg-gray-100"
//                       href={`https://drive.google.com/uc?export=download&id=${extractDriveId(
//                         episode.url
//                       )}`}
//                     >
//                       Download
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//       <Crewcast id={id} />
//     </>
//   );
// }

// export default DetailPage;