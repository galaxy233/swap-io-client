export const getImageResized = (width, height, filename) => {
  if (!filename) {
    return null
  }
  if (filename.substr(0,4) === 'blob') {
    return filename
  }
  return `http://swap-io.s3-website-us-east-1.amazonaws.com/${width}x${height}/${filename}`
}
