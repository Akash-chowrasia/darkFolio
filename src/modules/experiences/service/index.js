import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import experience from '../model';

const experienceService = {};

experienceService.addRecord = async (detail) => {
  const { title, company, start_date, end_date } = detail;
  const record = await experience.findOne({
    title,
    company,
    start_date,
    end_date,
  });
  assert(
    record === null,
    createError(StatusCodes.BAD_REQUEST, 'already exists')
  );
  await experience.create({ ...detail });
};

experienceService.fetchRecord = async () => {
  const records = await experience.find({}, { __v: 0 });
  return records;
};

experienceService.updateRecord = async ({ id, detail }) => {
  await experience.findByIdAndUpdate(id, { ...detail });
};

experienceService.deleteRecord = async (id) => {
  await experience.findByIdAndDelete(id);
};

export default experienceService;
