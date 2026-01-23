import { HttpException, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { DeleteResult, FindManyOptions, FindOptionsUtils, Like, Repository } from 'typeorm';

@Injectable()
export class PokemonService {

  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
  ){}

  async create(createPokemonDto: CreatePokemonDto) : Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(createPokemonDto);
    try {
      await this.pokemonRepository.save(pokemon);
      return pokemon;
    }catch(error){
      throw new HttpException('Error creating Pokemon', 500);
    }
  }


  async findByName(name: string, page: number, size: number, orderBy: string) : Promise<{}> {
    let count = await this.pokemonRepository.count({where: {name: Like(`%${name}%`)}}) ?? 1;
    let query : FindManyOptions<Pokemon> = {
      where: {name: Like(`%${name}%`)},
      skip: (page - 1) * size,
      take: size
    }
    if(orderBy){
      query.order = {name: orderBy == 'ASC' ? 'ASC' : 'DESC'};
    }
    const result = await this.pokemonRepository.find(query);
    return {
      pages: Math.ceil(count / size),
      currentPage: page,
      data: result
    }
  }

  async findByType(type: string, page: number, size: number, orderBy: string): Promise<{}> {
    let count = await this.pokemonRepository.count({where: {type: Like(`%${type}%`)}}) ?? 1;
    let query : FindManyOptions<Pokemon> = {
      where: {type: Like(`%${type}%`)},
      skip: (page - 1) * size,
      take: size,
    }
    if(orderBy){
      query.order = {type: orderBy == 'ASC' ? 'ASC' : 'DESC'};
    }
    const result = await this.pokemonRepository.find(query);
    return {
      pages: Math.ceil(count / size),
      currentPage: page,
      data: result
    }
  }

  async findManyPokemon(page: number, size: number, orderBy: string) : Promise<{}> {
    let count = await this.pokemonRepository.count() ?? 1;
    let query : FindManyOptions<Pokemon> = {
      skip: (page - 1) * size,
      take: size,
    }
    if(orderBy){
      query.order = {type: orderBy == 'ASC' ? 'ASC' : 'DESC'};
    }
    const result = await this.pokemonRepository.find(query);
    return {
      pages: Math.ceil(count / size),
      currentPage: page,
      data: result
    }
  }

  async findById(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({id});
    if(!pokemon){
      throw new HttpException(`Pokemon with ID ${id} not found`, 404);
    }
    return pokemon
  }
  
  async update(id: number, updatePokemonDto: UpdatePokemonDto) : Promise<Pokemon> {
    let pokemon = await this.pokemonRepository.findOneBy({id});
    this.pokemonRepository.merge(pokemon, updatePokemonDto);
    return this.pokemonRepository.save(pokemon);
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.pokemonRepository.delete(id);
  }

  async importPokemonById(id:number): Promise<Pokemon> {

    const pokemon = await this.pokemonRepository.findOneBy({id});

    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await response.json();
      if(pokemon){
        const updatePokemonDto: UpdatePokemonDto = {
          name: data.forms[0].name,
          type: data.types[0].type.name
        }
        return this.update(id, updatePokemonDto);
      }else{
        const createPokemonDto: CreatePokemonDto = {
          name: data.forms[0].name,
          type: data.types[0].type.name
        }
        return this.create(createPokemonDto);
      }
    }catch(error){
      throw new HttpException('Error importing Pokemon', 500);
    }
  }
}
