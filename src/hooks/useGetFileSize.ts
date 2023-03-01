/**
 * Custom hook to return the 
 *
 * @param {number}  bytes - File size in bytes
 * @returns {string} Calculated number of bytes with unit
 */

const useGetFileSize = (bytes: number) => {
  const k:number = 1024;
  const sizes:string[] = ['Bytes', 'KB', 'MB']

  const i:number = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export default useGetFileSize;