import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';

describe('PokemonService', () => {
  let service: PokemonService;

  const mockPokemonRepository = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: mockPokemonRepository,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.findAll).toBeDefined();
    expect(service.findById).toBeDefined();
    expect(service.findByName).toBeDefined();
    expect(service.findByType).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.remove).toBeDefined();
    expect(service.importPokemonById).toBeDefined();
  });
});
