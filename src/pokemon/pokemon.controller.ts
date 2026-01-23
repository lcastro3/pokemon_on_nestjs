import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { SearchParamsDto } from './dto/searchParams.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('pokemon')
@UseInterceptors(CacheInterceptor)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new Pokemon' })
  @ApiBody({
    type: CreatePokemonDto,
    examples:{
      Add: {value: {name: 'Pikachu', type: 'Electric'}},
    }
  })
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Pokemons' })
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get one Pokemon with set id' })
  findOne(@Param('id') id: string) {
    return this.pokemonService.findById(+id);
  }

  @Get('filterByName')
  @ApiOperation({ summary: 'Get one or any Pokemons with name with parts of the query' })
  @ApiParam({name: 'query', required: true, description: 'Part of the name to search for'})
  @ApiParam({name: 'page', required: false, description: 'Page number for pagination'})
  @ApiParam({name: 'size', required: false, description: 'Number of items per page'})
  @ApiParam({name: 'order', required: false, description: 'Order of results, ASC or DESC'})
  findByName(@Query() {query, page, size, order}: SearchParamsDto) {
    page = page ?? 1;
    size = size ?? 10;
    return this.pokemonService.findByName(query ,page, size, order);
  }

  @Get('filterByType')
  @ApiOperation({ summary: 'Get one or any Pokemons with type with parts of the query' })
  @ApiParam({name: 'query', required: true, description: 'Part of the type to search for'})
  @ApiParam({name: 'page', required: false, description: 'Page number for pagination'})
  @ApiParam({name: 'size', required: false, description: 'Number of items per page'})
  @ApiParam({name: 'order', required: false, description: 'Order of results, ASC or DESC'})
  findByType(@Query() {query, page, size, order}: SearchParamsDto) {
    page = page ?? 1;
    size = size ?? 10;
    return this.pokemonService.findByType(query ,page, size, order);
  }

  @Patch(':id')
  @ApiBody({
    type: UpdatePokemonDto,
    examples:{
      Update: {value: {name: 'Pikachu', type: 'Electric'}},
    }
  })
  @ApiParam({name: 'id', required: true, description: 'Id of the Pokemon to be imported from PokeAPI'})
  @ApiOperation({ summary: 'Update a Pokemon with set id' })
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a Pokemon with set id' })
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }

  @Patch('importPokemonById/:id')
  @ApiParam({name: 'id', required: true, description: 'Id of the Pokemon to be imported from PokeAPI'})
  @ApiOperation({ summary: 'Import a Pokemon from PokeAPI by ID' })
  importPokemonById(@Param('id') id: string) {
    return this.pokemonService.importPokemonById(+id);
  }
}
