import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import skill from '../model';

const skillService = {};

skillService.addRecord = async ({ email, name, rating }) => {
  const record = await skill.findOne({ email, name });
  assert(
    record === null,
    createError(StatusCodes.BAD_REQUEST, 'skill already exists')
  );
  await skill.create({ email, name, rating });
};

skillService.fetchRecord = async (email) => {
  const records = await skill.find({ email }, { _id: 0, __v: 0 });
  return records;
};

skillService.updateRating = async ({ id, rating }) => {
  const record = await skill.findById(id);
  assert(
    record !== null,
    createError(StatusCodes.BAD_REQUEST, 'skill does not exists')
  );
  await skill.findByIdAndUpdate(id, { rating });
};

skillService.removeRecord = async (id) => {
  const record = await skill.findById(id);
  assert(
    record !== null,
    createError(StatusCodes.BAD_REQUEST, 'skill does not exists')
  );
  await skill.findByIdAndDelete(id);
};

export default skillService;
