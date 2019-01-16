import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var registryItem = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    userRegistered: {
        name: String
    },
    priority: {
        type: Number
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    }
});
export default mongoose.model('RegistryItem', registryItem);