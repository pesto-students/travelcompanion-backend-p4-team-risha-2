import {Document} from 'mongoose'

export default interface IPrefernces extends Document {
  name: String,
  email: String,
  phone: String,
  Iam: String,
  location: String,
  gender: String,
  user: Object
  travelInterests: Array<String>
}
