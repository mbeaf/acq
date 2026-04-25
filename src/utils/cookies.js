export const cookies = {
  getOptions: () => {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    };
  },
  setTokenCookie: (res, token) => {
    res.cookie('token', token, cookies.getOptions());
  },
  clearTokenCookie: (res) => {
    res.clearCookie('token', cookies.getOptions());
  },
  getTokenFromCookies: (req) => {
    return req.cookies.token || null;
  },
};
