module.exports = {
  server: "http://localhost:8000",
  recaptcha_SITE_KEY: "6LfAPtEZAAAAAJ6Q-KCl_abAOm73lqyVpY5gFg7p",
  config: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("adminToken"),
    },
  },
};
