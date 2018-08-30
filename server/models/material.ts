import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'
import { IProduct } from './product'

export interface IMaterial extends Document {
    name: string
    description?: string
    product: IProduct
}

export interface IMaterialModel extends Model<IMaterial> {}

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }, 
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
})

export const Material: IMaterialModel = mongoose.model<IMaterial>('Material', schema)
