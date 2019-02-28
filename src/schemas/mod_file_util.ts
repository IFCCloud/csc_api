import { Document, Schema, Model, model } from 'mongoose';

export interface IMapField {
    db_field : String;
    type : String;
    map_header : String;     
    value_validate_on : String;
}

export interface IFileTemplate extends Document {
    template_name : String;
    header_row : Number;
    type : String;
    mappable : Array<IMapField>;
    created_at : Date;
    modified_at : Date;
}


 let FileUploadTemplateSchema = new Schema({ 
    template_name : { type : String, required : true },
    header_row : Number,
    type : String,
    mappable : [{
        db_field : String,
        type : String,
        map_header : String,      
        value_validate_on : String
     }],
     created_at : Date,
     modified_at : Date
 });
 FileUploadTemplateSchema.pre('save', function<IFileTemplate>(next) {
    const schema = this;
    let now = new Date();
    if (!schema.created_at) {
        schema.created_at = now;
    }
    schema.modified_at = now;    
    next();
 })

 export const FileUploadTemplate : Model<IFileTemplate> = model<IFileTemplate>('FileUploadTemplate', FileUploadTemplateSchema);