import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    director: { type: String, require: true },
    starring: { type: String, require: true },
    released: { type: String, require: true },
    runningTime: { type: String, require: true },
    image: { type: String, require: true },
    createdAt: { type: Date, default: new Date() },
});

const movieModel = mongoose.model('Movie', movieSchema);

export default movieModel;