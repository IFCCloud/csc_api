import { Document, Schema, Model, model } from 'mongoose';

export interface IFeeHeader {
    charge_type : String;
    charge_code : String;
    charge_on : String;
    effective_start : Date;
    effective_end : Date;
}

export interface IRateDetail extends Document {
    category : String;
    validate_on : String;
    currency :  String;
    fee :  Number;
}

export interface ISeaRate extends IFeeHeader, Document {
    carrier : String;
    origin : String;
    destination : String;    
    consortium : String;
    transhipment_type : String;
    tranship_via_port : String;
    transhipment_days : String;
    rate_details : Array<IRateDetail>;
    created_at : Date;
    modified_at : Date;
}

export interface ISeaSurcharge extends IFeeHeader , Document {
    carrier : String;
    description : String;
    on_origin? : String;
    on_destination? : String;
    surcharges : Array<IRateDetail>;
    created_at : Date;
    modified_at : Date;
}

let RateDtlSchema = new Schema({
    category : String,
    validate_on : String,
    currency :  String,
    fee :  Number
});
export const RateDetail : Model<IRateDetail> = model<IRateDetail>('RateDetail', RateDtlSchema);

let SeaFreightSchema = new Schema({
    carrier : String,
    origin : String,
    destination : String,    
    consortium : String,
    transhipment_type : String,
    tranship_via_port : String,
    transhipment_days : String,
    charge_type : String,
    charge_code : String,
    charge_on : String,    
    effective_start : Date,
    effective_end : Date,
    rate_details : [RateDtlSchema],
    created_at : Date,
    modified_at : Date,
});
SeaFreightSchema.pre('save', function<ISeaRate>(next) {
    const schema = this;
    let now = new Date();
    if (!schema.created_at) {
        schema.created_at = now;
    }
    schema.modified_at = now;    
    next();
 })
export const SeaFreight : Model<ISeaRate> = model<ISeaRate>('SeaFreight', SeaFreightSchema);

let SeaSurchargeSchema = new Schema({
    carrier : String,
    description : String,
    on_origin : String,
    on_destination: String,
    charge_type : String,
    charge_code : String,
    charge_on : String,
    effective_start : Date,
    effective_end : Date,
    surcharges : [RateDtlSchema],
    created_at : Date,
    modified_at : Date,
});
SeaSurchargeSchema.pre('save', function<ISeaSurcharge>(next) {
    const schema = this;
    let now = new Date();
    if (!schema.created_at) {
        schema.created_at = now;
    }
    schema.modified_at = now;    
    next();
 })
export const SeaSurcharge : Model<ISeaSurcharge> = model<ISeaSurcharge>('SeaSurcharge',SeaSurchargeSchema);