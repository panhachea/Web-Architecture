// ResponseService.js

// Return response for API as okay or error as json to request
exports.success = (res, message, code, options) => {
  if (!res.headersSent) {
    res.status(code || 200);
    res.json({
      success: true,
      result: message,
      code: code || 200,
      options: options || null,
      error: null,
    });
  }

};

exports.error = (res, message, code, opts) => {
  const result = {
    success: false,
    result: null,
    code: code || 400,
    error: message,
  };
  // Override to not show error detail
  if (opts) {
    if (opts.errorType) {
      result.errorType = opts.errorType;
    } else {
      result.errorType = 'Invalid';
    }
  }
  if ((!opts || !opts.loggingOnly) && !res.headersSent) {
    res.status(code || 400);
    res.json(result);
  }
};

exports.raw = (res, message, code) => {
  res.status(code || 400);
  res.write(message);
  res.end();
};
