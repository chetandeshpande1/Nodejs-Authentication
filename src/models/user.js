import mongoose from 'mongoose';

const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
