import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('pokemons')
export class Pokemon {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'varchar'})
    name: string

    @Column({type: 'varchar'})
    type: string
    
    @Column({default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

}
