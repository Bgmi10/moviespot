import { useState, useEffect } from 'react';
import { Star, Calendar, Globe, Film, Tag, Info, Tv, Hash } from 'lucide-react';
import { DashPlayer } from "../DashPlayer";

export default function EnhancedPlayer({ previewUrl, data, isDash }) {
  const [isLandscape, setIsLandscape] = useState(false);
  
  useEffect(() => {
    const handleOrientation = () => {
      const angle = window.orientation || window.screen.orientation?.angle || 0;
      setIsLandscape(angle === 90 || angle === -90);
    };

    window.addEventListener('orientationchange', handleOrientation);
    window.addEventListener('resize', handleOrientation);
    handleOrientation();

    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    return () => {
      window.removeEventListener('orientationchange', handleOrientation);
      window.removeEventListener('resize', handleOrientation);
    };
  }, []);

  return (
    <div className={`relative ${isLandscape ? 'landscape-mode' : ''}`}>
     { isDash !== "true" ? <div className={`video-wrapper sm: mt-0 lg:-mt-5 ${isLandscape ? 'fixed inset-0 z-50 bg-black' : 'relative'}`}>
        <div className={`
          video-container
          ${isLandscape ? 'w-screen h-screen' : 'w-full pb-[56.25%]'}
          relative overflow-hidden
        `}>
          <iframe
            src={`${previewUrl}?usp=drivesdk&embedded=true&rm=minimal`}
            allow="autoplay; fullscreen; accelerometer; gyroscope"
            allowFullScreen
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            className={`
              absolute left-0 w-full border-0
              ${isLandscape ? 'h-screen' : 'h-full'}
            `}
            style={{
              marginTop: isLandscape ? '0' : '-50px',
              height: isLandscape ? '100vh' : 'calc(100% + 50px)'
            }}
          />
        </div>
      </div> : <div>
        <DashPlayer src={data?.dashUrl} />
        </div>}

      {!isLandscape && (
        <div className="min-h-screen text-white mt-5 container mx-auto px-4">
          <div className="space-y-6">
            <h1 className="sm: text-3xl lg:text-5xl font-bold leading-tight">{data?.title}</h1>
            {(data?.season || data?.episode) && (
              <div className="text-2xl text-gray-400 flex items-center space-x-4">
                {data?.season && (
                  <div className="flex items-center">
                    <Tv className="w-5 h-5 mr-2 text-blue-400" />
                    <span>Season {data.season}</span>
                  </div>
                )}
                {data?.episode && (
                  <div className="flex items-center">
                    <Hash className="w-5 h-5 mr-2 text-green-400" />
                    <span>Episode {data.episode}</span>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-4 text-lg">
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <span>{data?.averageRating}/10</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-blue-400 mr-2" />
                <span>{data?.releaseDate}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-6 h-6 text-green-400 mr-2" />
                <span>{data?.language?.join(', ')}</span>
              </div>
              <div className="flex items-center">
                <Film className="w-6 h-6 text-purple-400 mr-2" />
                <span>{data?.type}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-6 h-6 text-pink-400 mr-2" />
                <span>{data?.category}</span>
              </div>
            </div>
            <div className="rounded-xl p-6 shadow-xl border-2">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-blue-400" />
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">{data?.overview}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .landscape-mode {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 100px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: black;
        }
        
        @media screen and (orientation: landscape) {
          .landscape-mode .video-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .landscape-mode iframe {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 100px;
            left: 0;
            margin: 0;
            padding: 0;
          }
        }
        
        /* Hide scrollbars when in landscape */
        .landscape-mode body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}