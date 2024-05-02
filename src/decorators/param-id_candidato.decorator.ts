import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamCandidatoId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params.id_candidato)
});