import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { userResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/login.dto";
import { Request } from "express";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { User } from "./decorators/user.decorator";
import { UserEntity } from "./user.entity";
import { AuthGuard } from "./guards/user.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<userResponseInterface> {
        const user = await this.userService.createUser(createUserDto);

        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<userResponseInterface> {
        const user = await this.userService.login(loginUserDto);

        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UserEntity): Promise<userResponseInterface> {
        return this.userService.buildUserResponse(user);
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(@User('id') currentUserId: number, @Body('user') updateUserDto: UpdateUserDto): Promise<userResponseInterface> {
        const user = await this.userService.updateUser(currentUserId, updateUserDto);

        return this.userService.buildUserResponse(user);
    }
}
