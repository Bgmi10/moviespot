import { FFmpeg } from '@ffmpeg/ffmpeg'; // Correct import for version 0.12.15
import { useState } from 'react';

export default function ExtractMultiVideo() {
    const [videofile, setVideoFile] = useState();
    const [loader, setLoader] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audiotracks, setAudioTracks] = useState([]);

    const ffmpeg = new FFmpeg({ log: true }); // Create FFmpeg instance

    const handleUpload = (e) => {
        const file = e.target.files?.[0];
        
        if (file) {
            setVideoFile(file);
            extractAudioTracks(file);
        }
    };

    const extractAudioTracks = async (file) => {
        setLoader(true);
        setProgress(0);

        try {
            await ffmpeg.load(); // Load the ffmpeg module

            // Convert file to ArrayBuffer and write it to FFmpeg's virtual filesystem (FS)
            const arrayBuffer = await file.arrayBuffer();
            ffmpeg.FS('writeFile', file.name, new Uint8Array(arrayBuffer));

            // Run ffmpeg command to extract audio streams
            const { stdout } = await ffmpeg.run("-i", file.name);
            const audio = parseAudioTracks(stdout);
            setAudioTracks(audio);
        } catch (e) {
            console.error(e);
        } finally {
            setLoader(false);
        }
    };

    const parseAudioTracks = (stdout) => {
        const regex = /Stream #(\d+):(\d+)(?:\([^)]*\))?\s+Audio:\s+([^\s,]+)/g;
        const tracks = [];
        let match;

        while ((match = regex.exec(stdout)) !== null) {
            tracks.push({
                id: `${match[1]}:${match[2]}`,
                codec: match[3]
            });
        }
        return tracks;
    };

    const generateVideos = async () => {
        if (!videofile || audiotracks.length === 0) return;

        setLoader(true);

        for (let i = 0; i < audiotracks.length; i++) {
            const audiotrack = audiotracks[i];
            const outputFileName = `video_with_${audiotrack.id}.mp4`;

            try {
                await ffmpeg.run(
                    "-i",
                    videofile.name,
                    "-map",
                    `0:v:0`,
                    "-map",
                    `${audiotrack.id}`,
                    "-c:v",
                    "copy",
                    "-c:a",
                    "aac",
                    "-strict",
                    "-2",
                    outputFileName
                );

                const data = ffmpeg.FS("readFile", outputFileName);
                const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
                const url = URL.createObjectURL(videoBlob);
                console.log(url);
            } catch (e) {
                console.error(e);
            } finally {
                setLoader(false);
            }
        }
    };

    return (
        <>
            <div className="p-3 m-3 border w-full">
                <input 
                    type="file" 
                    placeholder="upload a video" 
                    className="p-3 rounded-md border border-gray-600"   
                    onChange={handleUpload} 
                />
                <button onClick={generateVideos} className="bg-white">
                    Generate videos
                </button>
            </div>
        </>
    );
}
