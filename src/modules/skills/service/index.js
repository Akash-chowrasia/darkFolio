import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import skill from '../model';

const skillService = {};

skillService.addSkill = async ({ name, rating }) => {
  const record = await skill.findOne({ name });
  assert(
    record === null,
    createError(StatusCodes.BAD_REQUEST, 'skill already exists')
  );
  await skill.create({ name, rating });
};

skillService.fetchSkill = async () => {
  const records = await skill.find({}, { _id: 0, __v: 0 });
  return records;
};

skillService.updateRating = async ({ name, rating }) => {
  const record = await skill.findOne({ name });
  assert(
    record !== null,
    createError(StatusCodes.BAD_REQUEST, 'skill does not exists')
  );
  await skill.findOneAndUpdate({ name }, { rating });
};

skillService.removeSkill = async (name) => {
  const record = await skill.findOne({ name });
  assert(
    record !== null,
    createError(StatusCodes.BAD_REQUEST, 'skill does not exists')
  );
  await skill.findOneAndDelete({ name });
};

export default skillService;
