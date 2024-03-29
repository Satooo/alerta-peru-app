import firebaseStorageInterface from "./firebaseStorageInterface";
import { getDatabase, ref, child, set, get, onValue } from "firebase/database";

import { getStorage,ref as storageRef, uploadBytesResumable, getDownloadURL , 
    uploadBytes,
    listAll,
    list,} from "firebase/storage";

import { getStorageData } from "../backend/db";
import { firebaseStorage } from "../backend/firebaseStorage";

//const storage= getStorageData();

const storage = firebaseStorage.getInstance();

export default class firebaseStorageImpl extends firebaseStorageInterface{
    uploadImages(file, title, num,setUploadCompletion,setUploadedImages,uploadedImages){
        const metadata = {
            contentType: 'image/jpeg'
          };
    
        const imagesRef = storageRef(storage, `images/${title}/${num}.png`);
        const uploadTask = uploadBytesResumable(imagesRef, file, metadata);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setUploadCompletion(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
    
            // ...
    
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            //window.location.pathname="/incidente"
            setUploadedImages(uploadedImages+1)
          });
        }
        );
    }

    getImages(titulo,setImageUrls){
        const imagesListRef = storageRef(storage, `images/${titulo}/`);
        console.log(imagesListRef);
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageUrls((prev) => [...prev, url]);
            });
          });
        });
    }
    uploadVideo(titulo,file,setUploadCompletion){
      console.log("videeo")
      const imagesRef = storageRef(storage, `videos/${titulo}/${file.name}`);
  const metadata = {
    contentType: 'video/mp4'
  };
  const uploadTask = uploadBytesResumable(imagesRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setUploadCompletion(progress);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
    );
    }

    getVideo(titulo,setVideoUrl){
      const videoRef = storageRef(storage, `videos/${titulo}/`);
      listAll(videoRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setVideoUrl(url)
            console.log(url)
          });
        });
      });
  }
}