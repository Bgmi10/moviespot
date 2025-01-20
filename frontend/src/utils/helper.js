export const extractDriveId = (url) => {
    return url.match(/\/d\/(.*?)\//)?.[1];
}

export const previewDriveUrl = (fileId) => {
 return `https://drive.google.com/file/d/${fileId}/preview`; 
}