import React, { useRef, useEffect, useState } from "react";
import shaka from "shaka-player";

export function DashPlayer({
  src = "https://mvsp-1.s3.amazonaws.com/dash/4bbf5133-8c2f-4075-965a-0279559af9a2/manifest.mpd"
}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [audioTracks, setAudioTracks] = useState([]);
  const [videoQualities, setVideoQualities] = useState([]);
  const [currentAudioTrack, setCurrentAudioTrack] = useState("");
  const [currentVideoQuality, setCurrentVideoQuality] = useState("");

  useEffect(() => {
    async function initPlayer() {
      shaka.polyfill.installAll();

      const video = videoRef.current;
      const player = new shaka.Player(video);

      playerRef.current = player;

      // Configure for better DASH support
      player.configure({
        streaming: {
          bufferingGoal: 30,
          rebufferingGoal: 5,
          bufferBehind: 30
        }
      });

      try {
        await player.load(src);
        // Get available audio tracks (languages)
        const tracks = player.getVariantTracks();
        const audioLanguages = [...new Set(tracks.map(track => track.language).filter(Boolean))];
        const activeTrack = tracks.find(track => track.active);

        if (activeTrack) {
          setCurrentAudioTrack(activeTrack.language);
        }
        setAudioTracks(audioLanguages);
        
        // Get available video qualities
        const videoQualities = [...new Set(tracks.map(track => track.height).filter(Boolean))];
        setVideoQualities(videoQualities);
        
        // Set initial state to 'auto' since Shaka Player starts with adaptive bitrate
        setCurrentVideoQuality('auto');
        console.log('Initial mode: Auto HD (adaptive bitrate enabled)');
        
        // Listen for adaptive bitrate changes
        player.addEventListener('adaptation', () => {
          if (currentVideoQuality === 'auto') {
            const currentTracks = player.getVariantTracks();
            const activeTracks = currentTracks.filter(track => track.active);
            if (activeTracks.length > 0) {
              console.log('Auto quality switched to:', activeTracks[0].height + 'p');
            }
          }
        });
        
        video.play();
      } catch (err) {
        console.error("Error loading DASH video", err);
      } 
    }

    initPlayer();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [src]);

  const switchAudioTrack = (language) => {
    if (playerRef.current) {
      const tracks = playerRef.current.getVariantTracks();
      const track = tracks.find(t => t.language === language);
      if (track) {
        playerRef.current.selectVariantTrack(track, true);
      }
    }
  };

  const switchVideoQuality = (height) => {
    if (playerRef.current) {
      // Disable adaptive bitrate when manually selecting quality
      playerRef.current.configure({abr: {enabled: false}});
      
      const tracks = playerRef.current.getVariantTracks();
      const track = tracks.find(t => t.height === height);
      if (track) {
        playerRef.current.selectVariantTrack(track, true);
        setCurrentVideoQuality(height);
        console.log(`Switched to ${height}p quality (manual mode)`);
      }
    }
  };

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl mt-20">
      {/* Video Player */}
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-auto max-h-[90vh] bg-black"
          controls
          autoPlay
          poster=""
        />
        
        {/* Gradient Overlay for Controls */}
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" />
      </div>

      {/* Enhanced Control Panel */}
      <div className="border-t border-gray-700 p-6 space-y-6">
        
        {/* Audio Language Controls */}
        {audioTracks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-orange-400 font-semibold text-lg">🎵</span>
              <h3 className="text-white font-semibold text-lg">Audio Language</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {audioTracks.map(lang => (
                <button 
                  key={lang}
                  onClick={() => {
                    setCurrentAudioTrack(lang);
                    switchAudioTrack(lang);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 border-2 ${
                    currentAudioTrack === lang 
                      ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-orange-500/25' 
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? '🇺🇸 English' : 
                   lang === 'hi' ? '🇮🇳 Hindi' :
                   lang === 'ta' ? '🇮🇳 Tamil' :
                   lang === 'te' ? '🇮🇳 Telugu' :
                   lang === 'ml' ? '🇮🇳 Malayalam' :
                   lang === 'kn' ? '🇮🇳 Kannada' :
                   lang === 'und' ? '🌐 Default' :
                   `🌐 ${lang || 'Default'}`}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Video Quality Controls */}
        {videoQualities.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-semibold text-lg">🎬</span>
              <h3 className="text-white font-semibold text-lg">Video Quality</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {videoQualities.map(quality => (
                <button 
                  key={quality}
                  onClick={() => switchVideoQuality(quality)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 border-2 ${
                    currentVideoQuality === quality
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-blue-400 hover:text-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                >
                  {quality}p {quality >= 1080 ? '' : quality >= 720 ? '' : ''}
                </button>
              ))}
              <button 
                onClick={() => {
                  playerRef.current?.configure({abr: {enabled: true}});
                  setCurrentVideoQuality('auto');
                  console.log('Switched to Auto HD mode');
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 border-2 ${
                  currentVideoQuality === 'auto'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-green-500/25'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-blue-400 hover:text-white'
                } focus:outline-none focus:ring-2 focus:ring-green-500/50 shadow-lg`}
              >
                Auto HD
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
