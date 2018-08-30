import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'

export interface ISupplier extends Document {
    name: string
    isManufacturer: boolean
}

export interface ISupplierModel extends Model<ISupplier> {}

const schema = new Schema({
    name: { required: true, type: String },
    isManufacturer: { required: true, type: Boolean },
})

export const Supplier: ISupplierModel = mongoose.model<ISupplier>('Supplier', schema)
