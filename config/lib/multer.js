module.exports.profileUploadFileFilter = function (req, file, cb) {
  'use strict';
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Apenas imagens são permitadas!'), false);
  }
  cb(null, true);
};
