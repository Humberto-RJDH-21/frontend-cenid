import { CalificacionesModule } from './calificaciones.module';

describe('CalificacionesModule', () => {
  let calificacionesModule: CalificacionesModule;

  beforeEach(() => {
    calificacionesModule = new CalificacionesModule();
  });

  it('should create an instance', () => {
    expect(calificacionesModule).toBeTruthy();
  });
});
