export class StringUtils {

  static brPrimeNg = {
    closeText: 'Fechar',
    prevText: 'Anterior',
    nextText: 'Próximo',
    currentText: 'Começo',
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    weekHeader: 'Semana',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    timeOnlyTitle: 'Só Horas',
    timeText: 'Tempo',
    hourText: 'Hora',
    minuteText: 'Minuto',
    secondText: 'Segundo',
    // currentText: 'Data Atual',
    ampm: false,
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    allDayText: 'Todo Dia'
  };

  static isEmpty(value: string): boolean {

    return value == undefined || value == null || value.trim() == "";
  }

  static extraiNumeros(value: string): string {
    let result = "";
    let numeros = ['0', '1', '2', '3', '4', '5', "6", "7", "8", "9"];
    for (let index = 0; index < value.length; index++) {
      const caracter = value[index];

      if (caracter in numeros) {
        result += caracter;
      }
    }
    return result;
  }

  static string2Decimal(valor: string): string {

    valor = valor.replace(/\./gi, '');
    valor = valor.replace(',', '.');

    return valor;
  }

  static decimal2String(decimal) {
    decimal.replace('.', ';');
    decimal.replace(',', '.');
    decimal.replace(';', ',');
  }

  static string2Date(str: string): Date {
    let formatada = str.substr(0, 4);
    formatada += '-' + str.substr(4, 2);
    formatada += '-' + str.substr(6, 2);
    formatada += ' ' + str.substr(8, 2);
    formatada += ':' + str.substr(10, 2);
    formatada += ':' + str.substr(12, 2);

    return new Date(formatada);
  }

  static validarCNPJ(cnpj): boolean {
    // alert(cnpj);
    //var cnpj = ObjCnpj.value;
    var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    var dig1: number = null;
    var dig2: number = null;

    const exp = /\.|\-|\//g
    cnpj = cnpj.toString().replace(exp, "");
    var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));

    for (let i = 0; i < valida.length; i++) {
      dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
      dig2 += cnpj.charAt(i) * valida[i];
    }
    dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
    dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

    if (((dig1 * 10) + dig2) != digito) {
      return false;
    }
    else {
      return true;
    }

  }

  static validarCPF(strCPF): boolean {
    var Soma;
    var Resto;
    Soma = 0;
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    const exp = /\.|\-|\//g
    strCPF = strCPF.toString().replace(exp, "");
    if (strCPF == "00000000000")
      return false;
    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)))
      return false;
    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11)))
      return false;
    return true;
  }

  static validarDocumento(documento): boolean {
    // alert(documento);
    var res = true;

    documento = documento.trim();

    if (documento.length > 14) {
      res = this.validarCNPJ(documento);
      return res;
    } else {
      res = this.validarCPF(documento);
      return res;
    }
  }

}
