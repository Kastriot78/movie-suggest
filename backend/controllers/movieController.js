import MovieModel from "../models/Movie.js";

export const getMovies = async (req, res) => {
    try {
        const allMovies = await MovieModel.find().sort({ _id: -1 });
        res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await MovieModel.findById(id);

        if(movie) {
            return res.status(200).json({ movie, success: true });
        } else {
            return res.status(404).json({ mesage: 'Movie not found!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getMovieByCategory = async (req, res) => {
    try {
        const searchRegex = new RegExp(req.params.category, "i"); // Create a regular expression for case-insensitive search
        const movies = await MovieModel.find({ category: searchRegex });

        if(movies.length > 0) {
            res.status(200).send({ movies, success: true });
        } else {
            return res.status(404).send({ message: 'No movies found with that category', success: false });
        }

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const createMovie = async (req, res) => {
    const { title, category, director, description, starring, released, runningTime, image } = req.body;
    const newMovie = new MovieModel({
        title,
        category,
        director,
        description, 
        starring,
        released,
        runningTime,
        image,
        createdAt: new Date().toISOString()
    });
    
    try {
        await newMovie.save();
        res.status(200).json({ newMovie: newMovie, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteMovie = async (req, res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(404).send('No movie with that id');
    }

    const deletedMovie = await MovieModel.findByIdAndRemove(id);
    res.json({ message: 'Movie deleted successfully', movie: deletedMovie, success: true });
}