export function handleResponse(req, res, next) {
  // ✅ SUCCESS RESPONSE
  res.success = ({
    message = "Success",
    data = null,
    statusCode = 200,
  }) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      error: null,
    });
  };

  // ❌ ERROR RESPONSE
  res.error = ({
    message = "Something went wrong",
    errors = null,
    statusCode = 500,
  } ) => {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
      error: errors,
    });
  };

  next();
}
