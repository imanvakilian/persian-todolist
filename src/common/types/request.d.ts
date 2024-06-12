import { UserEntity } from "src/src/user/entities/user.entity";

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity,
            todolistId?: number,
            today?: string,
        }
    }
}