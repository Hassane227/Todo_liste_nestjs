import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonnesModule } from './personnes/personnes.module';
import { TachesModule } from './taches/taches.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PersonnesModule, TachesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging:true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
