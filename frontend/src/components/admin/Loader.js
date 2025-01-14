export default function Loader({ loading }) {
    return(
      <>
         {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white">Loading...</div>
            </div>
         )}
       </>
    )
}