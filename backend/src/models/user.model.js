import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
        minLength: 6,
    },

    level: {
        type: Number,
        default: 1,
    },

    xp: {
        type:Number,
        default: 0,
    },

    workouts: {
        type: Number,
        default: 0,
    },

    achievements: {
        type: Number,
        default: 0,
    },

    location: {
        type: String,
    },

    weight: {
        type: Number,
        default: 65,
    },

    height: {
        type: Number,
        default: 180,
    },

    
    fatPercentage: {
        type: Number,
        default: 40,
    },

    musclePercentage: {
        type: Number,
        default: 40,
    },

    muscleMass: {
        type: Number,
        default: 65,
    },

    time5k: {
        type: Number,
        default: 10,
    },

    maxPullUps: {
        type: Number,
        default: 10,
    },

    rmBenchPress: {
        type: Number,
        default: 10,
    },

    fitnessGoals: {
        type: Array,
        default: ["Fix some Goals"],
    },

    streak: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
