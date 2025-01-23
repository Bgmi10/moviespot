export const extractDriveId = (url) => {
    return url.match(/\/d\/(.*?)\//)?.[1];
}

export const previewDriveUrl = (fileId) => {
 return `https://drive.google.com/file/d/${fileId}/preview`; 
}

export const convertToTitleCase = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
}
