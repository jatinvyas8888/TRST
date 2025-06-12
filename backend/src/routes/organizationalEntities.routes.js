import { Router } from 'express';
import {
  createOrganizationalEntity,
  getAllOrganizationalEntities,
  updateOrganizationalEntity,
  deleteOrganizationalEntity,
  getOrganizationalEntityDetails,
  updateApplications
} from '../controllers/organizationalEntity.controller.js';

const router = Router();

router.route("/create")
  .post(createOrganizationalEntity);

router.route("/all")
  .get(getAllOrganizationalEntities);

router.route("/:id")
  .get(getOrganizationalEntityDetails)
  .patch(updateOrganizationalEntity)
  .delete(deleteOrganizationalEntity);

router.route('/:id/applications')
  .patch(updateApplications);

export default router;
