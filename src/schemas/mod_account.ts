import { Document,Model, Schema, model } from "mongoose";

export interface IAccount extends Document {
    code: String;
    account_type : Number;
    account_name : String;
    website : String;
    created_at : Date;
    modified_at : Date;
}


let AccountSchema = new Schema({   
    code: { type : String, required : true },
    account_type : { type : Number , required : true },
    account_name : String,
    website : String,
    created_at : Date,
    modified_at : Date
 });
 AccountSchema.pre('save', function<IAccount>(next) {
    const schema = this;
    let now = new Date();
    if (!schema.created_at) {
        schema.created_at = now;
    }
    schema.modified_at = now;    
    next();
 });
 export const Accounts : Model<IAccount> = model<IAccount>('Accounts', AccountSchema);