import { Document } from 'mongoose'

export default interface IPrefernces extends Document {
    name: String,
    email: String,
    phone: String,
    Iam: String,
    location: String,
    gender: String,
    login_id:string
    // intrest:String
}