import React from "react";
import ImageUploading from 'react-images-uploading';
import {useRef} from 'react';


export function evidenceUpload(images,onChangeImage,maxNumber,setEv1,setEv2,setEv3,setVideo,video){
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);
    setVideo(fileObj)

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };
  return(
        <div className="w-100 mt-3">
        
        <p>
            <b>Video de evidencia</b>
          </p>
        <div>
            <input
              style={{display: 'none'}}
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
            />

            <button className="videoButton" onClick={handleClick}>Agregar video de evidencia</button>
          </div>
        {(video!=undefined || video!=null)?<p>
          <b>Nombre de video</b> {video.name}
          </p>:""}
        <b>Evidencia del incidente (opcional)</b>
          <ImageUploading
              multiple
              value={images}
              onChange={onChangeImage}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    className="btn btn-dark mt-3 mb-3"
                  >
                    Agregar o arrastrar aquí
                  </button>
                  &nbsp;
                  <button onClick={onImageRemoveAll} className="btn btn-light mt-3 mb-3">Eliminar todo</button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" width="100" />
                      <div className="image-item__btn-wrapper mt-3">
                      <div class="input-group mt-3 mb-3">
                            <span class="input-group-text"><b>Descripción de evidencia</b></span>
                            <textarea class="form-control" aria-label="With textarea" onChange={(e)=>{
                              if(index==0){
                                setEv1(e.target.value)
                              }else if(index==1){
                                setEv2(e.target.value)
                              }else if(index==2){
                                setEv3(e.target.value)
                              }
                            }}></textarea>
                        </div>
                        <button onClick={() => onImageUpdate(index)} className="btn btn-dark">Actualizar</button>
                        <button onClick={() => onImageRemove(index)} className="btn btn-light">Quitar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
        </div>
    )
}