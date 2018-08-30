import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'
import { IOrderLine } from './order-line'

export interface IOrder extends Document {
    name: string
    orderLines: IOrderLine[]
}

export interface IOrderModel extends Model<IOrder> {}

const schema = new Schema({
    poReference: {
        required: true,
        type: String,
    },
    orderLines: [{ type: Schema.Types.ObjectId, ref: 'OrderLine' }],
})

export const Order: IOrderModel = mongoose.model<IOrder>('Order', schema)
