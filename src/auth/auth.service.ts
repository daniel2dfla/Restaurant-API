import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    async signUp(SignUpDto): Promise<User>{
        const { name, email, password }= SignUpDto;
        const user = await this.userModel.create({ name, email, password });

        return user
    }
 }
