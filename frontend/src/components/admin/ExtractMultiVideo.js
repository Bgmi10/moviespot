import { useState, useCallback } from 'react';
import MP4Box from 'mp4box';

export default function ExtractMultiVideo() {
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audioTracks, setAudioTracks] = useState([]);

    const processInChunks = async (file, mp4box) => {
        const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
        const fileSize = file.size;
        let offset = 0;
    
        const readChunk = () => {
            return new Promise((resolve, reject) => {
                const chunk = file.slice(offset, offset + CHUNK_SIZE);
                const reader = new FileReader();
    
                reader.onload = (e) => {
                    try {
                        const result = e.target.result;
    
                        // Ensure the result is an ArrayBuffer
                        if (!(result instanceof ArrayBuffer)) {
                            throw new Error('FileReader did not return an ArrayBuffer');
                        }
    
                        // Create a buffer from the ArrayBuffer
                        const buffer = new Uint8Array(result);
    
                        // Wrap the buffer in an object that includes the fileStart property
                        const chunkData = {
                            buffer: buffer,
                            fileStart: offset, // Set the fileStart property
                        };
    
                        // Pass the buffer to MP4Box correctly
                        mp4box.appendBuffer(chunkData.buffer.buffer); // `buffer.buffer` gets the underlying ArrayBuffer
    
                        // Update progress
                        offset += buffer.byteLength;
                        const percentComplete = (offset / fileSize) * 100;
                        setProgress(Math.round(percentComplete));
    
                        // Schedule the next chunk
                        if (offset < fileSize) {
                            setTimeout(() => readChunk().then(resolve), 0);
                        } else {
                            mp4box.flush();
                            resolve();
                        }
                    } catch (error) {
                        console.error('Error in chunk processing:', error);
                        reject(error);
                    }
                };
    
                reader.onerror = (e) => {
                    console.error('FileReader error:', e);
                    reject(e);
                };
    
                // Read the chunk as an ArrayBuffer
                reader.readAsArrayBuffer(chunk);
            });
        };
    
        await readChunk();
    };
    
    
    const extractAudioTracks = useCallback(async (file) => {
        setLoading(true);
        setProgress(0);

        return new Promise((resolve, reject) => {
            try {
                const mp4box = MP4Box.createFile();
                const audioTracks = [];

                mp4box.onReady = (info) => {
                    console.log("MP4Box ready:", info);
                    info.tracks.forEach((track) => {
                        if (track.type === 'audio') {
                            const audioTrack = {
                                id: track.id,
                                language: track.language,
                                codec: track.codec,
                                sampleRate: track.audio.sample_rate,
                                channelCount: track.audio.channel_count,
                                samples: [],
                            };
                            audioTracks.push(audioTrack);
                            
                            mp4box.setExtractionOptions(track.id, null, {
                                nbSamples: 100,
                                rapAlignement: true
                            });
                        }
                    });
                    
                    if (audioTracks.length > 0) {
                        mp4box.start();
                    }
                };

                mp4box.onSamples = (trackId, ref, samples) => {
                    const audioTrack = audioTracks.find(track => track.id === trackId);
                    if (audioTrack) {
                        audioTrack.samples.push(...samples);
                    }
                };

                mp4box.onError = (error) => {
                    console.error("MP4Box error:", error);
                    reject(new Error('Error processing video file: ' + error));
                };

                processInChunks(file, mp4box)
                    .then(() => {
                        setAudioTracks(audioTracks);
                        resolve(audioTracks);
                    })
                    .catch(reject);

            } catch (error) {
                console.error("Error in extractAudioTracks:", error);
                reject(error);
            }
        });
    }, []);

    const handleUpload = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setVideoFile(file);
            await extractAudioTracks(file);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setLoading(false);
        }
    }, [extractAudioTracks]);

    const generateVideos = useCallback(async () => {
        if (!videoFile || audioTracks.length === 0) return;
        setLoading(true);

        try {
            for (const audioTrack of audioTracks) {
                const mp4box = MP4Box.createFile();
                
                let offset = 0;
                const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

                while (offset < videoFile.size) {
                    const chunk = videoFile.slice(offset, offset + CHUNK_SIZE);
                    const arrayBuffer = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.onerror = reject;
                        reader.readAsArrayBuffer(chunk);
                    });

                    const buffer = new Uint8Array(arrayBuffer);
                    Object.defineProperty(buffer, 'fileStart', {
                        value: offset,
                        writable: true
                    });
                    
                    mp4box.appendBuffer(buffer);
                    
                    offset += arrayBuffer.byteLength;
                    setProgress((current) => Math.min(100, current + (100 / (audioTracks.length * (videoFile.size / CHUNK_SIZE)))));
                }

                mp4box.flush();

                // Create download
                const blob = new Blob([mp4box.getBuffer()], { type: 'video/mp4' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `video_with_audio_${audioTrack.language || 'track'}.mp4`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Failed to generate videos:', error);
        } finally {
            setLoading(false);
            setProgress(0);
        }
    }, [videoFile, audioTracks]);

    return (
        <div className="p-4 space-y-4">
            <div className="space-y-2">
                <input 
                    type="file" 
                    accept="video/*"
                    onChange={handleUpload}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
                {progress > 0 && progress < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>
            
            <button
                onClick={generateVideos}
                disabled={loading || !videoFile || audioTracks.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md
                    disabled:bg-gray-400 disabled:cursor-not-allowed
                    hover:bg-blue-700 transition-colors"
            >
                {loading ? 'Processing...' : 'Generate Videos'}
            </button>
        </div>
    );
}