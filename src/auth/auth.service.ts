import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import APIFeatures from '../utils/apiFeatures.util';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(SignUpDto): Promise<{ token: string}> {
        const { name, email, password }= SignUpDto;

        const hashedPassword = await bcrypt.hash(password, 10)

        try{
            const user = await this.userModel.create({ 
                name, 
                email, 
                password: hashedPassword
            });

        const token = await APIFeatures.assignJwtToken(user._id, this.jwtService)

        return { token };
        } catch (e) {
            if(e.code === 11000) {
                throw new ConflictException('Duplicate email entered')
            }
        }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email }).select('+password');

        if(!user) {
            throw new UnauthorizedException('Invalid email address or password.')
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new UnauthorizedException('Invalid email address or password.')
        }

        const token = await APIFeatures.assignJwtToken(user._id, this.jwtService)

        return { token };
    }
 }
