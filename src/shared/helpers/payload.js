const resSuccess = (res, code, status, message, data = null) => {
  return res.status(code).json({ status, message, data });
};

const resFailed = (res, code, status, message, errors) => {
  return res.status(code).json({ status, message, errors });
};

const resLogin = (res, code, status, message, token, user) => {
  return res.status(code).json({ status, message, token, user });
};

module.exports = {
  resSuccess,
  resFailed,
  resLogin,
};
