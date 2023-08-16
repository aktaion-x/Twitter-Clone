const cloudinary = require("../config/cloudinary");

const uploadSingle = async function(username, image) {
  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: `twitter_clone/${username}/`
    });
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const uploadVideo = async function(username, image) {
  const result = await cloudinary.uploader.upload(image.path, {
    folder: `twitter_clone/${username}/`
  });
  return result;
};

const uploadMultiple = async function(userId, media) {
  try {
    const uploadedFiles = await Promise.all(
      media.map(async file => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: `twitter_clone/users/${userId}/`
          });
          return result;
        } catch (error) {
          throw Error(error);
        }
      })
    );
    return uploadedFiles;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { uploadSingle, uploadMultiple, uploadVideo };

/* 
save original_filename in a variable
original_filename.split('.')
*/
