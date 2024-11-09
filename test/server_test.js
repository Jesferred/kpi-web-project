import app from './app_test.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default server;