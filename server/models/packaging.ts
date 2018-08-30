import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'

export interface IPackaging extends Document {
    is_bulk: boolean
    name: string
    type: string
    weight_unit: string
    weight: number
}

export interface IPackagingModel extends Model<IPackaging> {}

const schema = new Schema({
    is_bulk: { required: true, type: Boolean },
    name: {
        required: true,
        type: String,
    },
    type: { required: true, type: String },
    weight_unit: { required: true, type: String },
    weight: { required: true, type: Number },
})

export const Packaging: IPackagingModel = mongoose.model<IPackaging>('Packaging', schema)
