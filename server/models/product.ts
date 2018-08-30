import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'
import { IProductGroup } from '.'
import { IBDocument } from './document'

export interface IProduct extends Document {
    erp_id_reference: string
    erp_system_reference: string
    documents: IBDocument[]
    name: string
    groups: IProductGroup[]
}

export interface IProductModel extends Model<IProduct> {}

const schema = new Schema({
    erp_id_reference: { required: true, type: String },
    erp_system_reference: { required: true, type: String },
    documents: [{ type: Schema.Types.ObjectId, ref: 'BDocument' }],
    name: { required: true, type: String },
    groups: [{ type: Schema.Types.ObjectId, ref: 'ProductGroup' }],
})

export const Product: IProductModel = mongoose.model<IProduct>('Product', schema)

/*
    {
      "erp_id_reference": "slerpstring",
      "erp_system_reference": "slerpstring",
      "documents": ["5b87f4dc50feec342c5388ea"],
      "name": "slerpstring",
      "groups": ["5b87f6904678ec373a64901c"]
    }
*/
