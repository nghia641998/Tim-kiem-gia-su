const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        minlength: 1,
        maxlength: 70
    },
    fbId: {type: String},
    email: {
        type: String,
        require: true,
        maxlength: 60
    },
    password: { 
        type: String,
        require: true
    },
    avatar: { 
        type: String,
        default: 'img/user.png'
    },
    role: { 
        type: Number,
        default: 1
    },
    status: { 
        type: String,
        default: 'pendingActive'
    },
    salaryPerHour: {type: Number},
    major: [{
        id: Schema.Types.ObjectId
    }]
});

const User = mongoose.model('User', userSchema);

module.exports= {
    registerAccount: (entity, passwordHash) => {
        let user = new User({
            email: entity.email,
            password: passwordHash,
            username: entity.username,
            role: entity.role,
        });

        return user.save();
    },

    findOneByEmail: (email) => {
        return User.findOne({email}).exec();
    },

    findOneAccountActiveById: (email) => {
        return User.findOne({email, status: 'active' }).exec();
    },

    findOneById: (id) => {
        return User.findById(id).exec();
    },

    updateOne: (conditionObject, properies) => {
        return User.updateOne(conditionObject, {$set: properies}).exec();
    },

    deleteOne: (conditionObject) => {
        return User.deleteOne(conditionObject).exec();
    }
}