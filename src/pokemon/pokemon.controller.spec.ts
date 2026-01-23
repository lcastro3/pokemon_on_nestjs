import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('PokemonController', () => {
  let controller: PokemonController;

  const mockPokemonService = {
    create: jest.fn().mockResolvedValue(true),
    findById: jest.fn().mockResolvedValue(true),
    findByName: jest.fn().mockResolvedValue([]),
    findByType: jest.fn().mockResolvedValue([]),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue('200'),
    findAll: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        { 
          provide: PokemonService, 
          useValue: mockPokemonService 
        },
        { 
          provide: CACHE_MANAGER, 
          useValue: {}
        }
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.create).toBeDefined();
    expect(controller.findAll).toBeDefined();
    expect(controller.findOne).toBeDefined();
    expect(controller.findByName).toBeDefined();
    expect(controller.findByType).toBeDefined();
    expect(controller.update).toBeDefined();
    expect(controller.remove).toBeDefined();
  });
});
