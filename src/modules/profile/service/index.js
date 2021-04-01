import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import profile from '../model';

const profileService = {};

profileService.addRecord = async ({ email, detail }) => {
  const record = await profile.findOne({ email });
  assert(
    record === null,
    createError(StatusCodes.BAD_REQUEST, 'already exists')
  );
  await profile.create({ ...detail, email });
};

profileService.getRecord = async (email) => {
  const record = await profile.findOne({ email });
  assert(
    record !== null,
    createError(StatusCodes.BAD_REQUEST, 'Not available')
  );
  return record;
};

profileService.updateRecord = async ({ id, data }) => {
  await profile.findByIdAndUpdate(id, data);
};

export default profileService;
