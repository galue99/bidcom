import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './links.controller';
import { LinkService } from './links.service';

describe('LinkController', () => {
  let controller: LinkController;
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [LinkService],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    service = module.get<LinkService>(LinkService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear un link', () => {
    const targetUrl = 'https://example.com';
    jest.spyOn(service, 'createLink').mockImplementation(() => ({
      id: '1',
      stats: 0,
      isValid: true,
      target: targetUrl,
      link: 'http://localhost:3000/l/1'
    }));

    const result = controller.createLink({ target: targetUrl });
    expect(result).toEqual({
      message: 'Link creado exitosamente',
      maskedUrl: 'http://localhost:3000/l/1',
    });
  });

  it('debería redirigir a la URL original si el link es válido', () => {
    const targetUrl = 'https://example.com';
    jest.spyOn(service, 'getLinkById').mockImplementation(() => ({
      id: '1',
      stats: 0,
      isValid: true,
      target: targetUrl,
      link: 'http://localhost:3000/l/1'
    }));

    const result = controller.redirectToOriginal('1');
    expect(result).toEqual({ redirectUrl: targetUrl });
  });

  it('debería lanzar un 404 si el link no es válido o ha expirado', () => {
    jest.spyOn(service, 'getLinkById').mockImplementation(() => null);

    expect(() => controller.redirectToOriginal('invalid-id')).toThrowError('Link no válido o expirado.');
  });
});
