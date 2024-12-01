import { useState } from 'react'
// import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {

    const fileInput = ev.target;
    const file = fileInput.files[0]

    try {
      setIsUploading(true)
      console.log(file)
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        document.body.appendChild(imgElement); // For demonstration
      };
      reader.readAsDataURL(file)
      setImgData({ imgUrl:file })
      await onUploaded(file)

    } catch (err) {
      console.log("cant uplaod img", err);
    } 
      finally {
      setIsUploading(false)
    }

  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}
      <label htmlFor="imgUpload">{getUploadLabel()}</label>
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}