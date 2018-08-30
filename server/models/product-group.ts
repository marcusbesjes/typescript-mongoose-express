import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'

export interface IProductGroup extends Document {
    name: string
    group_type: string
}

export interface IProductGroupModel extends Model<IProductGroup> {}

const schema = new Schema({
    name: {
        required: true,
        type: String,
    },
    group_type: {
        required: true,
        type: String,
    },
})

export const ProductGroup: IProductGroupModel = mongoose.model<IProductGroup>(
    'ProductGroup',
    schema,
)

/*
    {
      "name": "Mesh 1: very fine",
      "group_type": "Mesh"
    }
*/
