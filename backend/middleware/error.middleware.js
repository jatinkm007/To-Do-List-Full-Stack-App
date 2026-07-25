function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
}

function errorHandler(error, req, res, next) {
  console.error(error.message);

  if (error.name === "ValidationError") {
    const firstError = Object.values(error.errors)[0];

    return res.status(400).json({
      success: false,
      message: firstError.message
    });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Request body contains invalid JSON."
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server."
  });
}

module.exports = {
  notFound,
  errorHandler
};
