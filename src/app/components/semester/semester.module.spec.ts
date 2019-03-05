import { SemesterModule } from './semester.module';

describe('SemesterModule', () => {
  let semesterModule: SemesterModule;

  beforeEach(() => {
    semesterModule = new SemesterModule();
  });

  it('should create an instance', () => {
    expect(semesterModule).toBeTruthy();
  });
});
