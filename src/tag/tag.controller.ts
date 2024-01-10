import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
    constructor(private readonly tagServise: TagService) {}

    @Get()
    async findAll(): Promise<{tags: string[]}> {
        const tags = await this.tagServise.findAll();

        return {
            tags: tags.map((tag) => tag.name),
        };
    }
}
