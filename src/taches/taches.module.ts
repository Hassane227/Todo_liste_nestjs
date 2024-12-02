import { Module } from '@nestjs/common';
import { TachesService } from './taches.service';
import { TachesController } from './taches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personne_Entity } from 'src/entities/personne.entity';
import { Taches_Entity } from 'src/entities/taches.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Personne_Entity,Taches_Entity])],

  providers: [TachesService],
  controllers: [TachesController]
})
export class TachesModule {}
