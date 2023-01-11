import { Document } from 'mongoose'

export default interface IPrefernces extends Document{
    name: string,
    email: string
}