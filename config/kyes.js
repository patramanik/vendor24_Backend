const { PORT, CONNECTION_URL, JWT_SECRET, SENDER_EMAIL, EMAIL_PASSWORD } =
  process.env;

module.exports = {
  port: PORT,
  connectionURL: CONNECTION_URL,
  jwtSecret: JWT_SECRET,
  senderEmail: SENDER_EMAIL,
  emailPassword: EMAIL_PASSWORD,
};
