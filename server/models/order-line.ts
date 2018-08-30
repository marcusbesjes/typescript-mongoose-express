import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'
import { IOrder } from '.'

export interface IOrderLine extends Document {
    materialName: string
    order: IOrder
}

export interface IOrderLineModel extends Model<IOrderLine> {}

const schema = new Schema({
    materialName: {
        required: true,
        type: String,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
})

export const OrderLine: IOrderLineModel = mongoose.model<IOrderLine>('OrderLine', schema)
