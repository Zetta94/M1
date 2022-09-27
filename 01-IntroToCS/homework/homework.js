'use strict'

function BinarioADecimal(num) {
  /*let binario = parseInt(num, 2);
  return binario;
  */
  /*Ejercicio resuelto por compañera
  let numeroBin = [];
  let numSep = num.toString().split('').reverse().join('');

  for(let i = 0; i < numSep.length; i++) {
    if(numSep[i] == 1) {
        let numero =  2 ** i;
     numeroBin.push(numero); 
    }
  }
  return numeroBin.reduce((a, b) => a + b, 0);//revisar despues com funciona el reduce.
  */
 var suma = 0;
 var posicion = 0;
 for (let i = num.length; i>=0 ; i) {
  suma = suma + num[i]*2**posicion
  console.log(posicion) 
  posicion++
 }
 return suma;

}

function DecimalABinario(num) {
  //return (num).toString(2);
  var arr=[];
  while(num!==0){
    let rest = parseInt(num%2);
    num = Math.floor(num/2);
    arr.unshift(rest);
  }
  return arr.join('');
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}