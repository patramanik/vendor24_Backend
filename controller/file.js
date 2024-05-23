const uploadFile = async (req, res, next) => {
  try {
    // const file = req.file;
    // if (!file) {
    //   res.code = 400;
    //   throw new Error(`No file uploaded`);
    // }

    res.json({ok: true})

  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };
