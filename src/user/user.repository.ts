// import {User} from "./entities/user.entity";
//
// export const UserRepository = dataSource.getRepository(User).extend({
//     findByName(firstName: string, lastName: string) {
//         return this.createQueryBuilder("user")
//             .where("user.firstName = :firstName", { firstName })
//             .andWhere("user.lastName = :lastName", { lastName })
//             .getMany()
//     },
// });