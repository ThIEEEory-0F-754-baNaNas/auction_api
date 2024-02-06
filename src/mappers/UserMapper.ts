import { DbUser } from '../DbEntities/DbUser';

export class UserMapper {
  getUser(user: DbUser) {
    return {
      id: user.id,
      avatar: user.avatar,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
    };
  }
}
