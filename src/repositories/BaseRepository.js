import DocumentNotFound from './RepositoryErrors';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * constructor
   * @param {string} name
   * @param {string} schema
   */
  constructor(name, db) {
    this.name = name;
    this.model = db.sequelize.models[this.name];
  }

  /**
   * @description Creates a new data
   * @param {object} options
   * @returns {document} Returns a newly created data
   */
  async create(options) {
    try {
      const data = await this.model.create(options);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all data
   * @returns {document} Returns an array of data.
   */
  async findAll() {
    try {
      const data = await this.model.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch a data by id
   * @param {string} id data id
   * @returns {Document} Resolves to found data.
   */
  async findById(id) {
    try {
      const data = await this.model.findOne({
        where: { id },
      });
      if (!data) throw new DocumentNotFound(`${this.name} not found`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
