---
title: Aprenda o básico de GoLang
subtitle: Se você quer aprender golang esse é um bom tutorial para você.
publishedAt: '2025-01-16T23:34:39.375Z'
author: Julio Martins
unique_name: learn-basic-of-golang
image: /images/learn-go-lang.jpeg
language: pt-br
tags:
  - golang
  - tutorial
---

Para executar o golang é necessário instalar o compilador [Go](https://go.dev/dl/), para verificar a instalação rode `go version` no terminal.

Depois de instalado crie a pasta que vai ficar o seu projeto, e dentro da pasta execute esse comando `go mod init nome_do_modulo` com isso vai ser criado o seu go.mod que nele vai ter informações como o nome do modulo, a versão do go e as lib utilizadas no projeto.

#### Syntax

A Syntax do go é bem simples, de cima para baixo vamos ter a declaração do package, os imports, as funções e por ultimo expressões e declarações como mostrado no código abaixo:

```go
package main
import ("fmt")

func main() {
  fmt.Println("Hello World!")
}
```

Em go é necessário ter o package main e a função main, eles são os iniciadores de tudo.

#### Output

Para exibir informações no terminal, basta usar algumas das funções de print do package `fmt`, exemplo: `Print`, `Println` ou `Printf`

Em go para retornar o valor no terminal formatado bastar usar algo parecido com isso:

```go
import "fmt"

var name = "Julio"
var age = 24

fmt.Print("Name: ", name) // Saida: Name: Julio
fmt.Println("Name: ", name, "Age:", age) // Adiciona uma quebra de linha no final
fmt.Printf("Name: %v Age: %v", name, age) // Formatado
```

##### Verbos para formatação geral

| Verbo | Descrição                        |
| ----- | -------------------------------- |
| %v    | Valor na formatação padrão       |
| %#v   | Valor na formatação do Go-syntax |
| %T    | Retornar o tipo do valor         |
| %%    | Retornar o sinal de %            |

#### Variáveis

Existem duas formas para se declarar uma variável em go, com `var name datatype = value` ou inferindo o tipo com `name := value`.

==Inferir o tipo significa que o datatype da variável vai ser definido a partir do valor==

O datatype da variável pode ser `int` que são valores numéricos (123, -123, etc.), `float32` que são valores numéricos com ponto flutuante (123.02, -123.02, etc.), `string` que são cadeias de caracteres ou `bool` que é `true` ou `false`.

##### Regras para nomes

1. Começar com letra ou underscore somente
2. Só pode conter alpha-numéricos (a-z, A-Z, 0-9 e \_)
3. Tem case-sensitive (age, Age e AGE são variáveis diferentes)
4. Sem limite no tamanho do nome
5. Não pode ser palavras chaves usadas pelo Go

==Variáveis criadas dentro de funções só podem ser acessadas dentro da função==

##### Constantes

Outra forma de declarar uma variável é usar `const` para criar uma variável imutável e somente para leitura, seguem as mesmas regras do `var` mas geralmente seus nomes estão em maiúsculo, mas isso não é uma regra é somente para identificar elas.

#### Operadores

Em go temos os mesmo operadores que outras linguagens de programação.

##### Aritméticos

| Operador | Exemplo | Resultado                   |
| -------- | ------- | --------------------------- |
| +        | x + y   | Soma de x com y             |
| -        | x - y   | Subtrai um valor pelo outro |
| \*       | x \* y  | Multiplica os dois valores  |
| /        | x / y   | Faz a divisão de x por y    |
| %        | x % y   | Resto da divisão de x por y |
| ++       | x++     | Aumenta o valor em 1        |
| --       | x--     | Diminui o valor em 1        |

##### Operadores de Atribuição

| Atribuição | Descrição                | Examplo    |
| ---------- | ------------------------ | ---------- |
| x = y      | Atribuir                 | x = y      |
| x += y     | Adiciona e atribui       | x = x + y  |
| x -= y     | Subtrai e atribui        | x = x - y  |
| x \*= y    | Multiplica e atribui     | x = x \* y |
| x /= y     | Divide e atribui         | x = x / y  |
| x %= y     | Divide e atribui o resto | x = x % y  |

##### Operadores de comparação

| Operator | Name             | Example | Result                            |
| -------- | ---------------- | ------- | --------------------------------- |
| ==       | Igual            | x == y  | Verdade se x é igual a y          |
| !=       | Não igual        | x != y  | Verdade se x não é igual a y      |
| <        | Menor que        | x < y   | Verdade se x é menor que y        |
| <=       | Menor ou igual a | x <= y  | Verdade se x é menor ou igual a y |
| >        | Maior que        | x > y   | Verdade se x é maior que y        |
| >=       | Maior ou igual a | x >= y  | Verdade se x é maior ou igual a y |

##### Operadores Lógicos

| Operator | Name       | Description                                           | Example            |
| -------- | ---------- | ----------------------------------------------------- | ------------------ |
| &&       | Logico E   | Retorna verdade se ambos são verdadeiros              | x < y && x > z     |
| \|       | Logico OU  | Retorna verdade se ao menos 1 seja verdadeiro         | x < y \| x > z     |
| !        | Logico Não | Inverte o resultado, se for falso torna-se verdadeiro | !(x == y && x > z) |

#### Condicionais

Em go para se criar um condição que executara linhas de código caso seja verdade, você pode usar o `if` desta forma

```go
if (codição) {
	// executa se for verdade
}
```

Você também pode usar o `else` junto com `if` para caso queira executar linhas de código para quando a condição for falsa

```go
if (condição) {
	// executa se for verdade
} else {
	// executa se for falsa
}
```

Caso você adicionar outra condições, pode usar o `else if` e passado a nova condição

```go
if (condição1) {
	// executa se for verdade
} else if (condição2) {
	// executa se for verdade
} else {
	// executa se não for verdade
}
```

##### Switch

O switch é uma forma de selecionar entre múltiplas escolhas uma para ser executa, ele é parecido com o de outras linguagens, com a diferença que não precisa usar `break`.

```go
switch expression {
case x:
   // codigo
case y:
	// codigo
case z:
...
default:
	// codigo
}
```

Ele tem uma funcionalidade chamada multi-case, que permite usar o mesmo `case` para múltiplas expressões dessa forma:

```go
switch expression {
case x,y:
   // codigo
case v,w:
	// codigo
case z:
...
default:
	// codigo
}
```

#### Loops

Em go a somente uma forma de fazer um loop e é com `for` desta forma:

```go
for inicialização; validação; incrementação {
	// código
}
```

É possível pular uma ou mais etapas do `for` usando `continue` e para parar o loop pode usar `break`.

Para percorrer um array ou slice pode usar `range` desta forma:

```go
for index, value := range array|slice|map {
	// codigo
}
```

Ela retorna o index e o valor.

#### Funções

Em go as funções são declaradas com `func` da seguinte forma:

```go
func functionName(param1 datatype, param2 datatype, ...) datatype {
	// codigo
}

functionName() // chamada
```

Existem algumas regras para o nome da função:

1. O nome da função tem que iniciar com uma letra
2. Somente alpha-numéricos (a-z, A-Z, 0-9 e \_)
3. O nome tem case-sensitive
4. Não pode conter espaços
5. Não pode ser uma palavra reservada

Em go é possível nomear oque vai ser retornado pela função e também é possível retornar mais de uma coisa, basta separa por virgula no `return`

```go
func functionName() (result1 datatype, ...) {
	// codigo
	return result1, result2
}
```

Se você quiser selecionar todos os parâmetros de uma função é possível usando `...`

```go
func example(s ...string) {
	fmt.Println(s[0])
	fmt.Println(s[3])
}


example("banana", "apple", "pineapple")
```

Para aceitar qualquer tipo de parâmetro, basta passar interface{} nos parâmetros

```go
func example(s ...interface{}) {
	fmt.Println(s[0])
	fmt.Println(s[3])
}


example("banana", true, 12)
```

##### Closure Functions

Closure Functions são funções anonimas, elas permitem que você acesse variáveis que foram criados fora do corpo dela.

```go
func main() {
	l := 20
	b := 30

	func() {
		var area int
		area = l * b
		fmt.Println(area)
	}()
}
```

Também é possível usar em loops

```go
func main() {
	for i := 10.0; i < 100; i += 10.0 {
		rad := func() float64 {
			return i * 39.370
		}()

		fmt.Printf("%.2f Metros de %.2f Pelagadas\n", i, rad)
	}
}
```

##### Defer

Go tem uma declaração especial chamada defer que agenda uma chamada de função para ser executada após a conclusão da função.

```go
func first() {
	fmt.Println("first")
}

func second() {
	fmt.Println("second")
}

func main() {
	defer second()
	first()
}
```

Nesse caso a função `first` vai ser executada e depois a função `second`.

##### Panic e Recover

Em go tem uma função chamada `panic` que tem como objetivo interromper a execução e retornar um erro.

```go
func main() {
	configData, err := os.ReadFile("config.json")

	if err != nil {
		panic(fmt.Sprintf("Error reading configuration file: %v", err))
	}
	...
}
```

Caso `err` seja diferente de `nil` a execução do programa sera interrompida e uma mensagem sera exibida no terminal.

Mas caso você queira fazer alguma ação antes do programa ser interrompido, você pode usar a função `recover` junto com `defer` para fazer uma ultima ação.

```go
func main() {
	defer func() {
		if r := recover(); r != nil {
			// Tentar restabelecer o fluxo de execução da função
		}
	}
	...
}
```

Desta forma quando um `panic` for chamado, e as funções de defer forem chamadas você pode tentar restabelecer o programa ou encerrar tudo para evitar um crash.

#### Arrays

Em go os arrays são agrupamentos de valores do mesmo tipo em uma unica variável, para criar um usasse `var array_name = [length]datatype{values}`.

Os arrays tem tamanho fixo, se for criado um com 5 espaços não sera possível adicionar mais que 5 valores nele.

Também é possível criar arrays com somente alguns espaços preenchidos, com `array_name = [5]int{1:2, 3:4}` desta forma teremos a seguinte saída `[0 2 0 4 0]`

Case seja necessário alterar um valor, você pode usar `array_name[1] = 1` desta forma o valor que esta no index 1 vai ser igual a 1 a partir de agora.

#### Slices

Diferente dos arrays os slices são mais flexíveis e poderosos, permitindo que você adicione mais valores depois de criados, para se criar um slice usasse a mesma syntax do array, mas não é necessário passar o tamanho `var slice_name = []datatype{values}` você também pode criar um slice usando os valores de um array com `var slice_name := array_name[start:end]` outra possibilidade é criar eles usando a função `make` desta forma `slice_name := make([]datatype, length, capacity)`

Para modificar um valor basta informar o index e o valor assim `slice_name[1] = 1`.

Para adicionar no final use `slice_name = append(slice_name, elem1, elem2, ...)`, também pode ser usado para juntar duas slices com `slice3 = append(slice1, slice2...)` e necessário colocar os três pontos depois da segunda slice.

#### Maps

Para salvar pares de chave e valor, você pode usar o `map` das seguintes forma:

```go
var map_name = map[keyDataType]ValueDataType{key1: value1, key2: value2, ...}
// ou
var map_name = make(map[keyDataType]ValueDataType)
```

Diferente de um `struct` o `map` permite usar diferentes tipos para a chave com booleanos, números, caracteres, arrays, pointers, structs ou interfaces, somente slices, maps e funções não são permitidos. Para valores é permitido qualquer tipo.

Para acessar um valor basta acessar usando a chave `map_name[key]`, a mesma forma é usada para atualizar o valor, basta atribuir o novo valor.

Para deletar uma valor é necessário usar a função `delete(map_name, key)`.

É possível também verificar se um elemento existem usando `val, ok := map_name[key]` o `ok` vai retornar um boolean.

Se for copiar um `map` saiba que ele vai ter referência, então se você criar uma variável `mapY` que recebe `mapX` como valor, todos as alterações em `mapY` vão refletir em `mapX`.

Exemplo:

```go
var mapX := map[string]String{"brand": "Ford", "model": "Mustang"}
var mapY := mapX

fmt.Println(mapX) // saida: map[brand:Ford model:Mustang]
fmt.Println(mapY) // saida: map[brand:Ford model:Mustang]

b["model"] = "Maverick"

fmt.Println(a) // saida: map[brand:Ford model:Maverick]
fmt.Println(b) // saida: map[brand:Ford model:Maverick]
```

Além disso, é possível percorrer um `map` com um `for` basta usar `range` e ele vai retornar a chave e o valor.

```go

var mapX := map[string]String{"brand": "Ford", "model": "Mustang"}

for k,v := range mapX {
	fmt.Println(k, v)
}
```

#### Struct

Em go existe uma forma de criar uma coleção de membros de diferentes tipos em uma variável.

```go
type struct_name struct {
	membem1 datatype;
	member2 datatype;
	...
}
```

Para atribuir uma struct a uma variável basta usar:

```go
type User struct {
	name string;
	age int;
}

var user = User{"Julio", 24}

// ou

var user User

user.name = "Julio"
user.age = 24
```

#### Interfaces

Em go as interfaces são um tipo abstrato, servem para descrever os métodos de um conjunto de métodos.

Por exemplo, vamos considerar que temos uma `struct` User com as seguintes propriedades: `FirstName`, `LastName`, `Age`, `Role` e vamos criar uma interface `UserMethods` para especificar os métodos que a estrutura `User` vai ter e vamos criar um função `handleAdminUser` que vai receber a estrutura `User` como parâmetro.

```go
type User struct {
	FirstName string
	LastName  string
	Age       int
	Role      string
}

func (u User) GetFullName() string {
	return fmt.Sprintf("%v %v", u.FirstName, u.LastName)
}

func (u User) GetRole() string {
	return u.Role
}

type UserMethods interface {
	GetFullName() string
	GetRole() string
}

func handleAdminUser(u UserMethods) {
	if u.GetRole() == "admin" {
		// Codigo
	}

	// Codigo
}

func main() {
	var user User = User{"Julio", "Martins", 24, "admin"}

	handleAdminUser(user)
}

```

Desta forma se você tentar passar um valor para `handleAdminUser` que não contenha os métodos que estão presentes em `UserMethods` será disparado um erro.

#### Goroutines

Uma goroutine é uma thread leve de execução. As goroutines permitem a execução de funções simultaneamente em um programa e são projetadas para serem eficientes e escaláveis.

Goroutines podem ser criadas usando a palavra-chave `go` seguida pela chamada da função.

```go
func fetch(url string) {
	response, err := http.Get(url)
	fmt.Println("GET ", url)
	if err != nil {
		log.Fatal(err)
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(len(body))
}

func main() {
	go fetch("https://www.google.com")
	go fetch("https://www.stackoverflow.com")

	time.Sleep(10 * time.Second)
}
```

Caso você queira esperar até que os goroutines terminem para que o programa finalize, você pode usar o `WaitGroup` do package `sync` e nele existem 3 métodos, um para adicionar `Add` um para concluir a espera de 1 goroutine `Done` e outro para esperar os goroutines `Wait`,

```go
var wg sync.WaitGroup

func fetch(url string) {
	defer wg.Done()

	response, err := http.Get(url)
	fmt.Println("GET ", url)

	if err != nil {
		log.Fatal(err)
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(len(body))
}

func main() {
	wg.Add(2)
	go fetch("https://www.google.com")
	go fetch("https://www.stackoverflow.com")

	wg.Wait()
}
```

#### Channels

Os canais são um tipo de dado utilizado para se comunicar e sincronizar entre goroutines. Para criar um channel é necessário usar a função `make` e eles podem ser com buffer e sem buffer.

Canais sem buffer bloqueiam a goroutine de envio até que haja um receptor correspondente pronto para receber o valor que está sendo enviado.

Canais com buffer, por outro lado, podem conter um número limitado de valores (determinado pelo tamanho do buffer) e só bloquearão a goroutine de envio quando o buffer estiver cheio.

Para criar um canal sem buffer utiliza-se o seguinte comando:

```go
ch := make(chan datatype)

ch <- value // Enviar um valor para o canal
x := <- ch // Receber um valor do canal e atribuir a x
```

Para criar um canal com buffer basta passar um segundo valor para a função `make` esse segundo parâmetro é a capacidade que esse canal pode ter.

```go
ch := make(chan datatype, 3)

ch <- 1
ch <- 2
ch <- 3
```

Com esses envios o canal agora esta cheio, para adicionar mais items sera necessário receber os valores com `:= <- ch`.

Outra coisa importante é o fechamento do canal com a função `close` passando o canal como parâmetro, isso é necessário para evitar que a goroutine principal bloqueie indefinidamente no canal, mas é necessário fechar corretamente para evitar erros e para isso é necessário seguir algumas regras:

1. Somente o transmissor deveria fechar o canal
2. É possível usar o range loop para receber valores, porque o loop vai terminar automaticamente quando o canal fechar.
3. Verifique se o canal esta aberto antes de enviar um valor com `x, ok := <-ch` a variável `ok` vai dizer se o canal esta aberto.
4. Usar `select` para receber valores de múltiplos canais.

Exemplo de uso de `select` e `for` em canais:

```go
for {
	select {
		case n := channel1:
			// Exemplo para caso você queira usar o valor do channel
		case <-channel2:
			// Exemplo usando o channel se salvar o valor
		case n, ok := channel3
			// Exemplo para fazer condições
	}
}
```

Caso tenha somente um canal, você pode usar um `for` com `range` para receber os valores

```go
for n := range channel {
	// Código
}
```

Você pode usar um canal como parâmetro da seguinte forma

```go
func sendData(ch chan<- int) {
	// Código
}
```

#### Conclusão

Agora você já tem o essencial para fazer seus apps com golang mas ainda não terminou as coisas para se aprender sobre golang, existe algumas libs padrão da linguagem, como por exemplo `log` para logging, `os` que é uma lib para lidar com o sistema operacional, com ela é possível criar/ler/mover/copiar/deletar arquivos/diretórios entre outras libs que existem.
