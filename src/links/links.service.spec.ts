import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './links.service';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkService],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un nuevo link', () => {
    const targetUrl = 'https://example.com';
    const link = service.createLink(targetUrl);

    expect(link).toBeDefined();
    expect(link.target).toBe(targetUrl);
    expect(link.link).toMatch(/http:\/\/localhost:3000\/l\//);
  });

  it('debería devolver un link por ID', () => {
    const targetUrl = 'https://example.com';
    const newLink = service.createLink(targetUrl);
    const foundLink = service.getLinkById(newLink.id);

    expect(foundLink).toBeDefined();
    expect(foundLink.target).toBe(targetUrl);
  });

  it('debería devolver null si el link no existe', () => {
    const invalidLink = service.getLinkById('invalid-id');
    expect(invalidLink).toBeNull();
  });

  it('debería incrementar el contador de estadísticas de redirección', () => {
    const targetUrl = 'https://example.com';
    const newLink = service.createLink(targetUrl);
    service.incrementStats(newLink.id);

    const updatedLink = service.getLinkById(newLink.id);
    expect(updatedLink.stats).toBe(1);
  });

  it('debería invalidar un link correctamente', () => {
    const newLink = service.createLink('https://example.com');
    service.invalidateLink(newLink.id);

    const invalidLink = service.getLinkById(newLink.id);
    expect(invalidLink).toBeNull();
  });
});
