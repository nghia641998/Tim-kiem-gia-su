const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSkillSchema = Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },

    avatar: {
        type: String,
        required: true,
        default: '/img/category.png'
    }
});

tagSkillSchema.index({content: 'text'});
const TagSkill = mongoose.model('TagSkill', tagSkillSchema);

module.exports = {
    addTagSkill: (entity) => {
        const tagSkill = new TagSkill({
            content: entity.content,
            avatar: entity.avatar
        });

        return tagSkill.save();
    },

    getListTagSkill: () => {
        return TagSkill.find().select('id avatar content').exec();
    }
}