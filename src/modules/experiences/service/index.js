import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import experience from '../model';

const experienceService = {};

experienceService.addRecord = async ({ email, detail }) => {
  const { title, company, start_date, end_date } = detail;
  const record = await experience.findOne({
    email,
    title,
    company,
    start_date,
    end_date,
  });
  assert(
    record === null,
    createError(StatusCodes.BAD_REQUEST, 'already exists')
  );
  await experience.create({ ...detail, email });
};

experienceService.fetchRecord = async (email) => {
  const records = await experience.find({ email }, { __v: 0 });
  return records;
};

experienceService.updateRecord = async ({ id, detail }) => {
  await experience.findByIdAndUpdate(id, { ...detail });
};

experienceService.deleteRecord = async (id) => {
  await experience.findByIdAndDelete(id);
};

export default experienceService;
