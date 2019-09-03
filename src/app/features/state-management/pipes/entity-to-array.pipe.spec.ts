import { EntityToArray } from './entity-to-array.pipe';

describe('EntityToArray', () => {
  it('create an instance', () => {
    const pipe = new EntityToArray();
    expect(pipe).toBeTruthy();
  });
});
