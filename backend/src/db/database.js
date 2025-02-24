import mongoose from 'mongoose';

const ConnectDB = async () => {
  try {
    
    if (!process.env.DBMS_URL) {
      console.log('DBMS_URL environment variable is not defined');
      process.exit(1);
    }

    // Attempt to connect to the MongoDB instance
    const connectionInstance = await mongoose.connect(process.env.DBMS_URL, {
      
     
    });

    // Log successful connection
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    // Log connection failure and exit the process
    console.log('MONGODB connection FAILED', error);
    process.exit(1);
  }
};

export default  ConnectDB ;
