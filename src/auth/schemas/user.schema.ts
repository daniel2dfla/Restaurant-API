import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum UserRoles {
    ADIMIN = 'admin',
    USER = 'user'
}

@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop()
    name: string;

    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;
    
    @Prop({ selected: false })
    password: string;

    @Prop({
        enum: UserRoles,
        default: UserRoles.USER
    })
    role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);