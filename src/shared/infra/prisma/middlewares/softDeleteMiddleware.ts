import { Prisma } from '@prisma/client';

export async function softDeleteMiddleware(
  params: Prisma.MiddlewareParams,
  next,
) {
  // Check incoming query type
  if (params.action == 'delete') {
    // Delete queries
    // Change action to an update
    params.action = 'update';
    params.args['data'] = { deletedAt: new Date() };
  }
  if (params.action == 'deleteMany') {
    // Delete many queries
    params.action = 'updateMany';
    if (params.args.data != undefined) {
      params.args.data['deleted'] = true;
    } else {
      params.args['data'] = { deletedAt: new Date() };
    }
  }
  return next(params);
}
