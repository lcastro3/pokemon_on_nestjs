import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { SearchParamsDto } from './dto/searchParams.dto';

@Controller('pokemon')
@UseInterceptors(CacheInterceptor)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('findById/:id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findById(+id);
  }

  @Get('filterByName')
  findByName(@Query() {query, page, size, order}: SearchParamsDto) {
    page = page ?? 1;
    size = size ?? 10;
    return this.pokemonService.findByName(query ,page, size, order);
  }

  @Get('filterByType')
  findByType(@Query() {query, page, size, order}: SearchParamsDto) {
    page = page ?? 1;
    size = size ?? 10;
    return this.pokemonService.findByType(query ,page, size, order);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }

  @Patch('importPokemonById/:id')
  importPokemonById(@Param('id') id: string) {
    return this.pokemonService.importPokemonById(+id);
  }
}
