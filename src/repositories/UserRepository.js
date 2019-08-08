import BaseRepository from './BaseRepository';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
class UserRepository extends BaseRepository {
  /**
   * UserRepository constructor
   */
  constructor({ db }) {
    super('User', db);
  }
}
export default UserRepository;
