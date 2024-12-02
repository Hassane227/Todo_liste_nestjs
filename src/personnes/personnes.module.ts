import { Module } from '@nestjs/common';
import { PersonnesService } from './personnes.service';
import { PersonnesController } from './personnes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personne_Entity } from 'src/entities/personne.entity';
import { Taches_Entity } from 'src/entities/taches.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Personne_Entity,Taches_Entity])],
  providers: [PersonnesService],
  controllers: [PersonnesController]
})
export class PersonnesModule {}
