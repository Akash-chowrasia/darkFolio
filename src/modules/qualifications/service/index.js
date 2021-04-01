import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import assert from 'assert';
import qualification from '../model';

const qualificationService = {};

qualificationService.addRecord = async ({ email, detail }) => {
  const { institute_name } = detail;
  const record = await qualification.findOne({ email, institute_name });
  assert(
    record === null,
    createError(StatusCodes.BAD_REQUEST, 'Already exists')
  );
  await qualification.create({ ...detail, email });
};

qualificationService.fetchRecord = async (email) => {
  const records = await qualification.find({ email }, { __v: 0 });
  return records;
};

qualificationService.updateRecord = async ({ id, detail }) => {
  await qualification.findByIdAndUpdate(id, { ...detail });
};

qualificationService.deleteRecord = async (id) => {
  await qualification.findByIdAndDelete(id);
};

export default qualificationService;
