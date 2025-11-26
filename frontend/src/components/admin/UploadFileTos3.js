import { useState } from "react"
import { baseUrl } from "../../config";
import { faVideo, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAws } from "react-icons/fa";

export const UploadFileTos3 = ({ setDashUrl, setVideoId }) => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(''); // 'success', 'error', ''

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setUploadStatus('');
        setUploadProgress(0);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        setUploadStatus('');
        setUploadProgress(0);
    };

    const handleDragOver = (e) => e.preventDefault();

    const uploadToS3 = async () => {
        if (!file) {
            alert('Please select a video file first.');
            return;
        }

        try {
            setIsUploading(true);
            setUploadStatus('');
            setUploadProgress(0);

            // Get signed URL
            const res = await fetch(baseUrl + `/generate-upload-url?filename=${file.name}&filetype=${file.type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            
            const { uploadUrl, videoId } = await res.json();

            if (res.status === 200) {
                // Real upload progress with XMLHttpRequest
                const uploadToS3WithProgress = () => {
                    return new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        
                        // Track upload progress
                        xhr.upload.addEventListener('progress', (e) => {
                            if (e.lengthComputable) {
                                const percentComplete = (e.loaded / e.total) * 100;
                                setUploadProgress(Math.round(percentComplete));
                            }
                        });

                        xhr.onload = function() {
                            if (xhr.status === 200) {
                                setUploadProgress(100);
                                resolve(xhr);
                            } else {
                                reject(new Error(`Upload failed with status: ${xhr.status}`));
                            }
                        };

                        xhr.onerror = function() {
                            reject(new Error('Upload failed'));
                        };

                        xhr.open('PUT', uploadUrl);
                        xhr.setRequestHeader('Content-Type', file.type);
                        xhr.send(file);
                    });
                };

                // Upload to S3 with real progress
                await uploadToS3WithProgress();

                // If we reach here, upload was successful
                setIsUploading(false);
                setIsConverting(true);
                setUploadStatus('converting');
                    
                    // Start DASH conversion
                    const convertRes = await fetch(baseUrl + `/convert-hls`, {
                        method: "POST",
                        body: JSON.stringify({
                            videoId
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    });

                    if (convertRes.status === 200) {
                        const finalDashUrl = `https://mvsp-1.s3.amazonaws.com/dash/${videoId}/manifest.mpd`;
                        setDashUrl(finalDashUrl);       // Pass to parent component
                        setVideoId(videoId);
                        setUploadStatus('success');
                        setIsConverting(false);
                    } else {
                        throw new Error('Conversion failed');
                    }
                } else {
                    throw new Error('Failed to get upload URL');
                }
        } catch (error) {
            console.error(error);
            setUploadStatus('error');
            setIsUploading(false);
            setIsConverting(false);
        }
    };

    const resetUpload = () => {
        setFile(null);
        setUploadProgress(0);
        setUploadStatus('');
    };

    return (
        <div className="w-full mt-6 border border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FaAws className="text-orange-500 text-2xl" />
                    <h3 className="text-white text-lg font-semibold">AWS S3 Upload & DASH Conversion</h3>
                </div>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    S3 STREAMING
                </span>
            </div>
            
            {/* Upload Area */}
            <div
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg hover:border-orange-500 transition duration-300 mb-4"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <FontAwesomeIcon
                    icon={faVideo}
                    className="text-orange-500 text-4xl mb-3"
                />
                <h2 className="text-gray-300 font-semibold text-lg">
                    Drag & Drop your video file here
                </h2>
                <p className="text-gray-500 text-sm mb-4">or click to upload (MP4, MKV, AVI)</p>
                <label className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300">
                    Browse Video Files
                    <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {/* Selected File Display */}
            {file && (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faVideo} className="text-orange-500" />
                            <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button 
                            onClick={resetUpload}
                            className="text-gray-400 hover:text-red-400 transition duration-300"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Upload Progress */}
            {(isUploading || isConverting) && (
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FontAwesomeIcon 
                            icon={faSpinner} 
                            className="text-orange-500 animate-spin" 
                        />
                        <span className="text-white">
                            {isUploading ? 'Uploading to S3...' : 'Converting to DASH...'}
                        </span>
                    </div>
                    {isUploading && (
                        <>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div 
                                    className="bg-orange-600 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{uploadProgress}% uploaded</p>
                        </>
                    )}
                    {isConverting && (
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-orange-600 h-2.5 rounded-full animate-pulse"></div>
                        </div>
                    )}
                </div>
            )}


            {/* Error Message */}
            {uploadStatus === 'error' && (
                <div className="bg-red-900 border border-red-500 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-red-400 font-medium">Upload failed. Please try again.</span>
                    </div>
                </div>
            )}

            {/* Upload Button */}
            <button 
                className="flex items-center gap-2 text-white p-3 rounded-md bg-orange-500 hover:bg-orange-600 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center"
                onClick={uploadToS3}
                disabled={!file || isUploading || isConverting}
            >
                <FaAws className="text-white text-xl" />
                <span>
                    {isUploading ? 'Uploading...' : 
                     isConverting ? 'Converting...' : 
                     'Upload to S3 & Convert to DASH'}
                </span>
            </button>

            <div className="mt-3">
                <p className="text-gray-400 text-xs">
                    • Video will be uploaded to S3 and automatically converted to DASH format
                    • Supports multi-resolution (1080p, 720p, 480p) and multi-audio streaming
                    • Conversion may take 10-20 minutes depending on video size
                </p>
            </div>
        </div>
    )
}