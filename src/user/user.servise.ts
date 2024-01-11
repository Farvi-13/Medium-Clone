import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@app/config";
import { userResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/login.dto";
import { compare } from "bcrypt";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        });
        const userByUsername = await this.userRepository.findOne({
            where: {
                username: createUserDto.username
            }
        });
        if (userByEmail || userByUsername) {
            throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);

        await this.userRepository.save(newUser)

        delete newUser.password;

        return newUser;
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email,
            },
            select: ['id', 'username', 'email', 'bio', 'image', 'password']
        });

        if (!user) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isPasswordCorrect = await compare(loginUserDto.password, user.password);

        if (!isPasswordCorrect) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        delete user.password;

        return user;
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
        return user;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        Object.assign(user, updateUserDto);

        return await this.userRepository.save(user);
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, 
        JWT_SECRET,
        );
    }

    buildUserResponse(user: UserEntity): userResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user),
            }
        }
    }
}