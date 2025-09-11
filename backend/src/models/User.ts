import mongoose, { model, Schema } from "mongoose";

export interface Users {
    email: string;
    password: string;
}


const userSchema = new Schema<Users>({
    //@ts-ignore
    email: { type: String, required: true, unique: true } as const,
    password: { type: String, required: true } as const
}, { timestamps: true });

export const UserModel = model<Users>("User", userSchema);