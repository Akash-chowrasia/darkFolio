import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import assert from 'assert';
import qualification from '../model';

const qualificationService = {};

qualificationService.addRecord = async (detail) => {
  const { institute_name } = detail;
  const record = await qualification.findOne({ institute_name });
  assert(
    record === null,
    createError(StatusCodes.BAD_REQUEST, 'Already exists')
  );
  await qualification.create({ ...detail });
};

qualificationService.fetchRecord = async () => {
  const records = await qualification.find({}, { __v: 0 });
  return records;
};

qualificationService.updateRecord = async ({ id, detail }) => {
  await qualification.findByIdAndUpdate(id, { ...detail });
};

qualificationService.deleteRecord = async (id) => {
  await qualification.findByIdAndDelete(id);
};

export default qualificationService;
