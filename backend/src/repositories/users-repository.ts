import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByUuid(uuid: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
