import { QaModule } from './qa.module';

describe('QaModule', () => {
  let qaModule: QaModule;

  beforeEach(() => {
    qaModule = new QaModule();
  });

  it('should create an instance', () => {
    expect(qaModule).toBeTruthy();
  });
});
