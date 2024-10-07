import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkService } from './links/links.service';

describe('AppController', () => {
  let appController: AppController;
  let linkService: LinkService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: LinkService,
          useValue: {
            createLink: jest.fn(),
            getLinkById: jest.fn(),
            incrementStats: jest.fn(),
            getStats: jest.fn(),
            invalidateLink: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    linkService = moduleRef.get<LinkService>(LinkService);
  });

  describe('getHealth', () => {
    it('should return "Success"', () => {
      expect(appController.getHealth()).toBe('Success');
    });
  });
});
