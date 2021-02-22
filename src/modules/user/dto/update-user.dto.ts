import { Status } from '../user.model';

export class UpdateUserDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  birthdate?: string;
  street?: string;
  city?: string;
  country?: string;
  zip?: string;
  status?: Status;
}
