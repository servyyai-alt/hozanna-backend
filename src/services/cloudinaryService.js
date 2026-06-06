const streamifier = require("stream");
const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

const buildPlaceholder = (name) => ({
  url: `https://placehold.co/1200x800/111111/F2C94C?text=${encodeURIComponent(name)}`,
  publicId: `local-${Date.now()}-${name.replace(/\s+/g, "-").toLowerCase()}`,
});

const uploadBuffer = (file, folder = "hozanna") =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    if (!isCloudinaryConfigured) {
      resolve(buildPlaceholder(file.originalname || "upload"));
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    streamifier.Readable.from(file.buffer).pipe(uploadStream);
  });

const uploadManyBuffers = async (files, folder) => {
  if (!Array.isArray(files) || files.length === 0) {
    return [];
  }

  const uploads = await Promise.all(files.map((file) => uploadBuffer(file, folder)));
  return uploads.filter(Boolean);
};

module.exports = { uploadBuffer, uploadManyBuffers };
