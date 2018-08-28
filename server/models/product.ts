import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'

export interface IProduct extends Document {
    name: string
}

export interface IProductModel extends Model<IProduct> {}

const schema = new Schema({
    name: {
        required: true,
        type: String,
    },
})

export const Product: IProductModel = mongoose.model<IProduct>('Product', schema)
