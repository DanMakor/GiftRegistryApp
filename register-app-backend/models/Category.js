import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var category = new Schema({
    title: {
        type: String
    },
});
export default mongoose.model('Category', category);