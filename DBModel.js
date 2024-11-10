const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
    name: { type: String, required: true },
    linkedin: { type: String, required: true },
    about: { type: String, required: true },
    email: { type: String, required: true },
    github: { type: String, required: true },
    twitter: { type: String, required: true },
    role: { type: String, required: true },
    shortDesc: { type: String, required: true },
    about: { type: String, required: true }
});

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveLink: { type: String, required: true },
    repoLink: { type: String },
    badges: [{ type: String, required: true }]
});

const Profile = mongoose.model('Profile', profileSchema);
const Project = mongoose.model('Project', projectSchema);

module.exports = { Profile, Project };