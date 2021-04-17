import mongoose from 'mongoose';

(async () => {
  try {
    await mongoose.connect(process.env.AUTH_DB_URL, {
      connectTimeoutMS: 2000,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    Logger.info(
      `Database connected successfully to ${process.env.AUTH_DB_URL}`
    );
  } catch (err) {
    Logger.error(
      `Failed to connect to Mongo running @ ${process.env.AUTH_DB_URL}`
    );
  }
})();
