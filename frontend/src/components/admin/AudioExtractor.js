import React, { useState, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg'; // Import FFmpeg class

// Initialize FFmpeg
const ffmpeg = new FFmpeg();
ffmpeg.load({
  log: true,
});

const AudioVideoProcessor = () => {
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mergedVideos, setMergedVideos] = useState([]);

  // Load FFmpeg
  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        await ffmpeg.load();
        setIsReady(true);
        console.log('FFmpeg loaded successfully.');
      } catch (error) {
        console.error('FFmpeg load error:', error);
      }
    };
    loadFFmpeg();
  }, []);

  // Function to process the video file
  const processFile = async (file) => {
    try {
      setIsProcessing(true);

      // Step 1: Convert input video to .mp4 (if not already)
      const fileData = await file.arrayBuffer(); // Read file as ArrayBuffer
      const inputBlob = new Blob([fileData], { type: file.type });
      const inputUrl = URL.createObjectURL(inputBlob);

      // Step 2: Extract all audio tracks
      await ffmpeg.exec([
        '-i', inputUrl, // Input file
        '-map', '0:a', // Select all audio tracks
        '-acodec', 'libmp3lame',
        '-ab', '128k',
        '-ar', '44100',
        'output.mp3', // Output file
      ]);

      // Step 3: Create a copy of the video without audio
      await ffmpeg.exec([
        '-i', inputUrl, // Input file
        '-an', // Disable audio
        '-c:v', 'copy', // Copy video stream without re-encoding
        'video_no_audio.mp4', // Output file
      ]);
      const logs = await ffmpeg.readFile('output.txt', 'utf8');
      console.log('FFmpeg logs:', logs);
      const audioStreams = (logs.match(/Stream #0:a/g) || []).length; // Define audioStreams
      console.log(`Found ${audioStreams} audio tracks.`);
      // Step 4: Merge video with each audio track
      const mergedUrls = [];
      for (let i = 0; i < audioStreams; i++) {
        console.log(`Merging video with audio track ${i + 1}...`);

        // Merge video and audio
        await ffmpeg.exec([
          '-i', 'video_no_audio.mp4',
          '-i', `audio_${i}.mp3`,
          '-c:v', 'copy', // Copy video stream without re-encoding
          '-c:a', 'aac', // Encode audio as AAC
          '-strict', 'experimental',
          `merged_${i}.mp4`,
        ]);

        // Read the output file as binary data
        const data = await ffmpeg.readFile(`merged_${i}.mp4`);
        const mergedBlob = new Blob([data], { type: 'video/mp4' });
        const mergedUrl = URL.createObjectURL(mergedBlob);
        mergedUrls.push(mergedUrl);

        // Cleanup FFmpeg file system
        await ffmpeg.deleteFile(`merged_${i}.mp4`);
      }

      // Step 5: Cleanup FFmpeg file system
      await ffmpeg.deleteFile('input.mp4');
      await ffmpeg.deleteFile('video_no_audio.mp4');
      console.log('Cleaned up FFmpeg FS.');

      // Update state
      setMergedVideos(mergedUrls);
      console.log('Processing complete.');
    } catch (error) {
      console.error('Processing error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }

    try {
      await processFile(file);
    } catch (error) {
      console.error('File processing error:', error);
    }
  };

  // FFmpeg progress tracking
  ffmpeg.on('progress', ({ progress: ratio }) => {
    setProgress(Math.round(ratio * 100));
  });

  if (!isReady) return <div>Loading FFmpeg...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }} className='text-blue-500'>
      <h1>Audio-Video Processor</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        disabled={isProcessing}
        style={{ marginBottom: '10px' }}
      />

      {isProcessing && (
        <div>
          <progress value={progress} max="100" style={{ width: '100%' }} />
          <div style={{ marginTop: '5px' }}>
            Processing: {progress}%
          </div>
        </div>
      )}

      {mergedVideos.length > 0 && (
        <div>
          <h2>Merged Videos</h2>
          {mergedVideos.map((url, index) => (
            <div key={index}>
              <video controls src={url} style={{ width: '100%' }} />
              <a href={url} download={`merged_video_${index + 1}.mp4`}>
                Download Merged Video {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AudioVideoProcessor;