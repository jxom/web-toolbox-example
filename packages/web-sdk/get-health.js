module.exports = async () => {
  const res = await fetch('https://dev-api-au.medipass.io/healthcheck');
  return res.json();
};
