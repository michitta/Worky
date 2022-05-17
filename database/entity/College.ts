// Подключение библиотек
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"

// Состав таблицы
@Entity()
export class College extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: ""
    })
    userID: string

    @Column({ nullable: true })
    proffesion: string

    @Column({ nullable: true})
    launguage: string

    @Column({ nullable: true})
    grafRabot: string

    @Column({ nullable: true})
    typeZanatosti: string

    @Column({ nullable: true})
    zarPlata: string

    @Column({ nullable: true})
    exp: string
}
