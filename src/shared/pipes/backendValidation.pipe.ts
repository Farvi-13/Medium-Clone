import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class backendValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        
    }
}