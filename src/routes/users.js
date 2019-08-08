import { Router } from 'express';

const createUsersRoute = ({ usersController }) => {
  const router = Router();

  router.post('/', usersController.createUser);
  router.get('/', usersController.getAllUsers);
  router.get('/:id', usersController.getUser);
  return router;
};
export default createUsersRoute;
