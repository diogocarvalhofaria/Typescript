import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './recados/entites/recado';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'mestre',
      database: 'recados',
      entities: [Recado],
      synchronize: true,
    }),
    RecadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
