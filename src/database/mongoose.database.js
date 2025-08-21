import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cdt12.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log("Connected to the Database");
    } catch (error) {
        console.log(`Error connecting to the Database: ${error}`);
    }
};

export default connectToDatabase;
