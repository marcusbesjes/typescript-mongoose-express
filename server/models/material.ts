import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'
import { IPackaging, IProduct } from '.'
import { IBDocument } from './document'

export interface ICasNumber extends Document {
    number: Number
    blendRatio: Number
}
export interface IMaterial extends Document {
    active: boolean
    batch_managed: boolean
    casNumbers: ICasNumber[]
    description: string
    documents: IBDocument[]
    erp_id_reference: string
    erp_system_reference: string
    in_catalogue: boolean
    lead_time_days: number
    name: string
    needs_compliance: boolean
    packaging_is_bulk: boolean
    packaging: IPackaging
    pallet_size: number
    product: IProduct
    supplier: string
}

export interface ICasNumberModel extends Model<ICasNumber> {}

export interface IMaterialModel extends Model<IMaterial> {}

const casNumberSchema = new Schema({
    number: { type: Number, required: true },
    blendRatio: { type: Number, required: true },
})

const materialSchema = new Schema({
    active: { type: Boolean, required: true },
    batch_managed: { type: Boolean, required: true },
    casNumbers: [casNumberSchema],
    description: { type: String, required: true },
    documents: [{ type: Schema.Types.ObjectId, ref: 'BDocument' }],
    erp_id_reference: { type: String, required: true },
    erp_system_reference: { type: String, required: true },
    in_catalogue: { type: Boolean, required: true },
    lead_time_days: { type: Number, required: true },
    name: { type: String, required: true },
    needs_compliance: { type: Boolean, required: true },
    packaging_is_bulk: { type: Boolean, required: true },
    packaging: {
        type: Schema.Types.ObjectId,
        ref: 'Packaging',
    },
    pallet_size: { type: Number, required: true },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    supplier: { type: String, required: true },
})

export const Material: IMaterialModel = mongoose.model<IMaterial>('Material', materialSchema)

/*
{
  "active": true,
  "batch_managed": true,
  "casNumbers": [{
    "number": 1,
    "blendRatio": 0.5
  }],
  "description": "materialmockstring",
  "documents": ["5b87f4dc50feec342c5388ea"],
  "erp_id_reference": "materialmockstring",
  "erp_system_reference": "materialmockstring",
  "in_catalogue": true,
  "lead_time_days": 123,
  "name": "materialmockstring",
  "needs_compliance": true,
  "packaging_is_bulk": true,
  "packaging": "5b87f5a08f864434c3778514",
  "pallet_size": 123,
  "product": "5b87f74c75f03e3841b22d92",
  "supplier": "materialmockstring"
}
*/
