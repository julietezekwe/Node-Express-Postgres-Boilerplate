/* eslint-disable no-useless-constructor */
import autoBind from 'auto-bind';
// import models from '../models';

// const { User, Follow } = models;
/**
   * Creates an instance of UserController.
   */
class UsersController {
  /**
   * Creates an instance of UserController.
   * @param {object} param
   * @memberof UsersController
   */
  constructor({ userService }) {
    this.userService = userService;
    autoBind(this);
  }


  /**
     * Retrieves user details
     * @param {object} req
     * @param {object} res
     *@returns {object} - user
     */
  // eslint-disable-next-line class-methods-use-this
  async createUser(req, res) {
    const { sex, age, name } = req.body;
    try {
      const user = await this.userService.createAUser({ sex, age, name });
      return res.status(200).json({ user: user.dataValues });
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Retrieves user details
   * @param {object} req
   * @param {object} res
   *@returns {object} - user
   */
  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await this.userService.retrieveUser(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Retrieves all users details
   * @param {object} req
   * @param {object} res
   *@returns {object} - users
   */
  async getAllUsers(req, res) {
    try {
      const users = await this.userService.retrieveAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.json(error);
    }
  }
}
export default UsersController;
