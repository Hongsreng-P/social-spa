import { applyDecorators, SetMetadata } from '@nestjs/common';

export const Public = () => {
    return applyDecorators(
        SetMetadata('public', true),
    )
}
