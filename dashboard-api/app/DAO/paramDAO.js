import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const paramSchema = new mongoose.Schema({
    temp: {type: String},
    humidity: {type: String},
    pressure: {type: String},
    extraParam: {type: Number, required: false, default: 0},
    date: {type: String}
}, {
    collection: 'params'
});
paramSchema.plugin(uniqueValidator);

const ParamModel = mongoose.model('params', paramSchema);

async function query() {
    const result = await ParamModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function get(id) {
    const result = await ParamModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
}

async function getLast() {
    const result = await ParamModel.findOne().sort({'_id': -1}).limit(1);
    if (result) {
        return mongoConverter(result);
    }
}

async function search(content) {
    return ParamModel.find({date: {$regex: content}}).then(function (result) {
        if (result) {
            return mongoConverter(result);
        }
    });
}

async function createNewOrUpdate(data) {
    data.date = new Date().toISOString().substr(0, 19).replace('T', ' ');
    return Promise.resolve().then(() => {
        if (!data.id) {
            return new ParamModel(data).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return ParamModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
        }
    });
}

export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,
    search,
    getLast,

    model: ParamModel
};
