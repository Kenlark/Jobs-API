import { StatusCodes } from "http-status-codes";
import * as jobService from "./jobs.service.js";
import { checkPermissions } from "../../utils/checkPermission.js";

const create = async (req, res) => {
  const createdJob = await jobService.create(req.body, req.user.userId);
  res.status(StatusCodes.CREATED).json({ job: createdJob });
};

const getUsersJobs = async (req, res) => {
  const jobs = await jobService.getUsersjobs(req.user.userId);
  res.status(StatusCodes.OK).json({ nbHits: jobs.length, jobs });
};

const get = async (req, res) => {
  const job = await jobService.get(req.params.id);
  checkPermissions(req.user, job.createdBy);
  res.status(StatusCodes.OK).json({ job });
};

const update = async (req, res) => {
  const job = await jobService.get(req.params.id);
  checkPermissions(req.user, job.createdBy);
  const updatedJob = await jobService.get(req.params.id);
  res.status(StatusCodes.OK).json({ job: updatedJob });
};

const remove = async (req, res) => {
  const job = await jobService.get(req.params.id);
  checkPermissions(req.user, job.createdBy);
  const remvovedJob = await jobService.remove(req.params.id);
  res.status(StatusCodes.OK).json({ job: remvovedJob });
};

export { create, get, getUsersJobs, update, remove };
