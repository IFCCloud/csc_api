import { Document, Schema, Model, model, PaginateModel } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate';

export interface ISeaPort extends Document {
    unloc: String,
    iso: String,
    country: String,
    name: String,
    city: String,
    state: String,
    coordinates: String,
    timezone: String,
    unloc_pseudo: String,
    code: Number
}

export interface IAirPort extends Document {
    iata: String ,
    name: String ,
    city:  String ,
    country:  String ,
    icao: String,
    latitude: String,
    longitude: String,
    altitude: String,
    timezone: String,
    dst: String
 }

 export interface ISuburb extends Document {
    iso: String,
    country : String,
    postcode : String,
    state : String,
    suburb : String,
    region1 : String,
    region2 : String,
    region3 : String,
    locality : String,
    latitude : String,
    longtitude : String   
}

let SeaPortSchema = new Schema({ 
    unloc: { type : String, required : true },
    iso: { type : String, required : true },
    country: { type : String, required : true },
    name: String,
    city: String,
    state: String,
    coordinates: String,
    timezone: String,
    unloc_pseudo: String,
    code: Number
 });
 SeaPortSchema.plugin(mongoosePaginate);
 interface SeaPort<T extends Document> extends PaginateModel<T> {}
 export const SeaPort : Model<ISeaPort> = model<ISeaPort>('SeaPort', SeaPortSchema);

 let AirPortSchema = new Schema({ 
    iata: { type : String, required : true },
    name: { type : String, required : true },
    city: { type : String, required : true },
    country: { type : String, required : true },
    icao: String,
    latitude: String,
    longitude: String,
    altitude: String,
    timezone: String,
    dst: String
 });
 
 AirPortSchema.plugin(mongoosePaginate);
 interface AirPort<T extends Document> extends PaginateModel<T> {}
 export const AirPort : Model<IAirPort> = model<IAirPort>('AirPort', AirPortSchema);


 let SuburbSchema = new Schema({      
    iso: { type : String, required : true },
    country : { type : String, required : true },
    postcode : { type : String, required : true },
    state : String,
    suburb : { type : String, required : true },
    region1 : String,
    region2 : String,
    region3 : String,
    locality : String,
    latitude : String,
    longtitude : String   
});

SuburbSchema.plugin(mongoosePaginate);
interface Suburbs<T extends Document> extends PaginateModel<T> {}
export const Suburbs : Model<ISuburb> = model<ISuburb>('Suburbs', SuburbSchema);