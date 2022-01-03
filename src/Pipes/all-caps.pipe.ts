import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class AllCapsPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(metadata.type === 'body'){
            value.name = value.name.toUpperCase();
            return value;
        }
        return value;
    }
}