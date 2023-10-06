import { Command, CommandProps } from '@src/libs/ddd/command-base';

export class VerificationUserCodeCommand extends Command {
  readonly code: string;
  constructor(props: CommandProps<VerificationUserCodeCommand>) {
    super(props);
    this.code = props.code;
  }
}
