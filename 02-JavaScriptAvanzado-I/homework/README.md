
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

## ------------------------------------------------------------------------------------------
## Respuesta: 
Asignar un valor a una variable no declarada implica crearla como variable global (se convierte en una propiedad del objeto global) cuando la asignación es ejecutada. Las diferencias entre una variable declarada y otra sin declarar son:

1. Las variables declaradas se limitan al contexto de ejecución en el cual son declaradas. Las variables no declaradas siempre son globales.
2. Las variables declaradas son creadas antes de ejecutar cualquier otro código. Las variables sin declarar no existen hasta que el código que las asigna es ejecutado.
3. Las variables declaradas son una propiedad no-configurable de su contexto de ejecución (de función o global). Las variables sin declarar son configurables (p. ej. pueden borrarse).

Debido a esas tres diferencias, fallar al declarar variables muy probablemente llevará a resultados inesperados. Por tanto se recomienda siempre declarar las variables, sin importar si están en una función o un ámbito global. Y en el modo estricto (strict mode) de ECMAScript 5, asignar valor a una variable sin declarar lanzará un error.
## ------------------------------------------------------------------------------------------

```javascript
x = 1;
var a = 5;
var b = 10;
var c = function(a, b, c) {
  var x = 10;
  console.log(x);
  console.log(a);
  var f = function(a, b, c) {
    b = a;
    console.log(b);
    b = c;
    var x = 5;
  }
  f(a,b,c);
  console.log(b);
}
c(8,9,10);
console.log(b);
console.log(x);
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
10

8

8

9

10

1
## ------------------------------------------------------------------------------------------
```javascript
console.log(bar);
console.log(baz);
foo();
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
undefined (sube la variable bar pero no toma su valor)

Al momento de llegar a ver baz esta no está definida por lo que el programa crashea.
## ------------------------------------------------------------------------------------------

```javascript
var instructor = "Tony";
if(true) {
    var instructor = "Franco";
}
console.log(instructor);
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
Franco

## ------------------------------------------------------------------------------------------
```javascript
var instructor = "Tony";
console.log(instructor);
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor);
   }
})();
console.log(instructor);
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
Tony

Franco

Tony
## ------------------------------------------------------------------------------------------

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor);
    console.log(pm);
}
console.log(instructor);
console.log(pm);
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
The Flash

Reverse Flash

The Flash (porque fue modificada la variable dentro del if al colocar var)

Franco (Ya que let no sale de su bloque)
## ------------------------------------------------------------------------------------------
### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3"  --> 2
"2" * "3" --> 6
4 + 5 + "px" --> 9px (recorre los valores y luego empieza de izquierda  derecha a operar por eso suma 4 y 5 como int)
"$" + 4 + 5 --> $45 (los convierte en string ya que el primer valor es string)
"4" - 2 --> 2
"4px" - 2 --> Nan(No puede restar string con numero)
7 / 0 --> infinity (js intenta dividir 7 por 0000000000.1 entonces tiende al infinito, tiende a buscar un valor mas chico)
{}[0] --> [0]
parseInt("09") --> 9
5 && 2 --> 2 (Si el lado izq de un and se evalua como falso, toda la ecuacion es falsa, de lo contrario devuelve el valor del  lado derecho)
2 && 5 --> 5
5 || 0 --> 5 
0 || 5 --> 5
[3]+[3]-[10] --> 23 (Al principio concatena 3 + 3 = 33 y el menos toma los datos, los convierte en int y los resta)
3>2>1 --> false (3>2 es igual a true, y true no es mayor que 1)
[] == ![] --> true ya que [] es un objeto(cuyo valor primitivo es igual a "")y ![] es un booleano(cuyo valor primitivo es igual a false) entonces: [] == false, luego [] == 0, luego "" == 0, luego 0 = 0

```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

```javascript
function test() {
   console.log(a);
   console.log(foo());

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
undefined

2
## ------------------------------------------------------------------------------------------
Y el de este código? :

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack;
}

getFood(false);
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
Retornaria undefined, porque la variable es definida dentro del if, por lo que js lleva la definicion hacia arriba y la define como undefined, al no ingresar al if porque la condicion es falsa no le asigna el valor de "Friskies".
## ------------------------------------------------------------------------------------------
### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test());
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
Aurelio De Rosa (Ya que el this hace referencia al objeto prop dentro de obj)

Juan Perez (En este caso el This hace referencia a la variable global fullname, esta orientado a windows)
## ------------------------------------------------------------------------------------------
### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

```javascript
function printing() {
   console.log(1);
   setTimeout(function() { console.log(2); }, 1000);
   setTimeout(function() { console.log(3); }, 0);
   console.log(4);
}

printing();
```
## ------------------------------------------------------------------------------------------
## Imprime lo siguiente:
1

4

3(Tiene un tiempo de espera de 0 por eso se imprime antes que 2)

2(Tiene un tiempo de espera de 1000 por eso se imprime al ultimo)


## ------------------------------------------------------------------------------------------