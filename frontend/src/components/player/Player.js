import { Star, Calendar, Globe, Film, Tag, Info, Tv, Hash, Video } from 'lucide-react';

export default function EnhancedPlayer({ previewUrl, data }) {

  return (
    <div className="min-h-screen text-white mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl shadow-2xl">
            <iframe
              src={previewUrl + '?usp=drivesdk&embedded=true&rm=minimal'}
              allow="autoplay=true; fullscreen"
              allowFullScreen
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
            <style jsx>{`
                 iframe {
                   margin-top: -50px;
                   height: calc(100% + 50px);
                 }
            `}</style>
          </div>
        </div>
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
    </div>
  )
}

