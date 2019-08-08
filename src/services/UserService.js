import autoBind from 'auto-bind';
/**
   * Creates an instance of UserController.
   */
class UserService {
  /**
   * Creates an instance of UserController.
   * @param {object} param
   * @memberof UsersController
   */
  constructor({ userRepository, redis }) {
    this.userRepository = userRepository;
    this.redis = redis;
    autoBind(this);
  }

  /**
   * Retrieves a user details
   * @param {number} - id
   *@returns {object} - user
   */
  async retrieveUser(id) {
    try {
      let user;
      user = await this.redis.getObject('id', id);
      if (user && Object.entries(user).length > 0) {
        return user;
      }
      user = await this.userRepository.findById(id);
      await this.redis.setObject('id', user.id, user, 86400);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new user
   * @param {object} - options
   *@returns {object} - new created user
   */
  async createAUser(options) {
    try {
      const newUser = await this.userRepository.create(options);
      await this.redis.setObject('id', newUser.dataValues.id, newUser.dataValues, 86400);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all users details
   *@returns {object} - users
   */
  async retrieveAllUsers() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
