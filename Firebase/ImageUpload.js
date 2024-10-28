const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { app } = require("./initializeApp");
const fs = require('fs');

const storage = getStorage(app);

async function handleImageUpload(filePath, fileName) {
  try {
    const storageRef = ref(storage, `images/${fileName}`);
    const fileBuffer = fs.readFileSync(filePath); // Read the file buffer from the provided file path
    
    // Upload the image if filePath is provided
    if (filePath) {
      const uploadTask = await uploadBytesResumable(storageRef, fileBuffer, { contentType: 'image/png' });
      
      
      // Get the download URL after the upload completes
      
      const downloadURL = await getDownloadURL(uploadTask.ref);
      console.log();
      console.log(downloadURL); // this is undefine
      console.log();
      return downloadURL;
    }

    // Get the download URL, whether the image was uploaded or not
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

module.exports = { handleImageUpload };
