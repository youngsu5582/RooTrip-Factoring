import { Command, CommandProps } from '@src/libs/ddd/command-base';

export class CreateLocalUserCommand extends Command {
  readonly email: string;
  readonly password: string;
  readonly nickname: string;
  readonly name: string;
  readonly bio: string;
  readonly profileImage: string;

  constructor(props: CommandProps<CreateLocalUserCommand>) {
    super(props);
    this.email = props.email;
    this.password = props.password;
    this.nickname = props.nickname;
    this.name = props.name;
    this.bio = props.bio;
    this.profileImage = props.profileImage;
  }
}
