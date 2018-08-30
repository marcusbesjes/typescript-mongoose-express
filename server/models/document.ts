import { Document, Model, Schema } from 'mongoose'
import { mongoose } from '../config/database'

export interface IBDocument extends Document {
    description: string
    document_type: string
    language: string
    name: string
    url: string
}

export interface IBDocumentModel extends Model<IBDocument> {}

const schema = new Schema({
    description: { type: String, required: true },
    document_type: { type: String, required: true },
    language: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
})

export const BDocument: IBDocumentModel = mongoose.model<IBDocument>('BDocument', schema)
