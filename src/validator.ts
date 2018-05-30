namespace squadtd {
  export class Validator {
    public static IsStringValue(value: any) {
      return (typeof value) == 'string';
    }

    public static IsNumberValue(value: any) {
      return (typeof value) == 'number';
    }

    public static Validate(args: Array<any>){
      let count = 1;
      for(let i = 0; i < args.length; i ++){
        let argCheck = args[i];
        if(typeof argCheck[0] != argCheck[1])
          throw Utilities.formatString('Argument #%d[%s] is not of type %s', count, argCheck[0], argCheck[1]);
        count++;
      }
    }
  }
}