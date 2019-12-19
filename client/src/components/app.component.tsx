import React, { Component } from 'react';
import _, { isEmpty } from 'lodash';
import { calculateMultiples, uploadFile, decryptKeywords } from '../api/index.api';


interface State{
	number: number;
	multiples: number[];
	sumPrimesAndNotPrimesData: {
		normalizedNumbers: number[],
		primes: number[],
		sumPrimes: number,
		notPrimes: number[],
		sumNotPrimes: number,
	};
	stack: string[];
	client: string;
	position: number | string;
	keywords: string;
	decryptedKeywords: string[];
}

class App extends Component<{}, State> {

	constructor(props) {
		super(props);
		this.state = {
			number: 0,
			multiples: [],
			sumPrimesAndNotPrimesData: {
				normalizedNumbers: [],
				primes: [],
				sumPrimes: 0,
				notPrimes: [],
				sumNotPrimes: 0,
			},
			stack: [],
			client: '',
			position: '',
			keywords: '',
			decryptedKeywords: [],
		};

		this.calculate = this.calculate.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
	}

	async uploadFile(event: any){
		const { data } : any = await uploadFile(event.target.files[0]);
		this.setState({ sumPrimesAndNotPrimesData: data })
	}

	async calculate() {
		const { number } = this.state;
		const multiples: number[] =  await calculateMultiples(number);
		this.setState({ multiples })
	}

	addClient() {
		const { stack, client } = this.state;

		if (!isEmpty(client)) {
			stack.push(client);
			this.setState({ stack, client: '' });
		}
	}

  removeClient() {
		const { stack, client } = this.state;
		if (!isEmpty(client)) {
			_.remove(stack, (s) => {
				return s == client;
			});
			this.setState({ stack, client: '' })
		}
	}
	
	addClientToSpecificPosition() {
		const { stack, client, position } = this.state;

		if (!isEmpty(client) && !isEmpty(position)) {
			if (position > stack.length) {
				this.addClient();
			} else {
				stack.splice(Number(position) - 1, 0, client);
			}
			this.setState({ stack, position: '', client: ''});
		}
	}

	async decryptKeywords() {
		const { keywords } = this.state;
		console.log(keywords);
		const decryptedKeywords: any = await decryptKeywords(keywords);
		this.setState({ decryptedKeywords });
	}


	render() {
		const { multiples, sumPrimesAndNotPrimesData, stack, client, position, decryptedKeywords } = this.state;

		return (
			<div>
				<div>
					<h1>1. Calcular Multiplos</h1>
					<input placeholder="Ingrese Numero" type="text" onChange={(e) => { this.setState({ number: Number(e.target.value)})}} />
					<button onClick={ this.calculate }>Calcular</button>
					<p>
						Multiplos Encontrados :
						{ 
							multiples.map((multiple, i) => {
								if (i+1 == multiples.length) {
									return multiple;
								} else {
									return multiple + ', ';
								}
							})
						}
					</p>
			</div>
			<hr/>
			<div>
				<h1>2. Suma de pares y Primos </h1>
				<input 
					type="file"
					accept="text/plain"
					onChange={this.uploadFile}
				/>
				<p>
					Valor de primos sumados : { sumPrimesAndNotPrimesData.sumPrimes } |
					| Valor de los no primos sumados : { sumPrimesAndNotPrimesData.sumNotPrimes }
				</p>
				<p>
					Numeros Primos Encontrados : {
						sumPrimesAndNotPrimesData.primes.map((prime, i) => {
							if (i + 1 == sumPrimesAndNotPrimesData.primes.length) {
								return prime;
							} else {
								return prime + ', ';
							}
						})
					} || 
					Numeros No Primos Encontrados : {
						sumPrimesAndNotPrimesData.notPrimes.map((notPrime, i) => {
							if (i + 1 == sumPrimesAndNotPrimesData.notPrimes.length) {
								return notPrime;
							} else {
								return notPrime + ', ';
							}
						})
					}
				</p>
				<p>Todos los numeros extraidos: {
					sumPrimesAndNotPrimesData.normalizedNumbers.map((number, i) => {
						if (i + 1 == sumPrimesAndNotPrimesData.normalizedNumbers.length) {
							return number;
						} else {
							return number + ', ';
						}
					})
				}
				</p>
			</div>
			<hr/>
			<div>
				<h1>Estructuras de datos [Colas, Pilas, Arboles]</h1>
					<p>
						Fila: { stack.map((s, i) => {
							if (i + 1 == stack.length) {
								return s;
							} else {
								return s + ', ';
							} 
						}) }
					</p>
					<input type="text" placeholder="Nombre Cliente" value={client} onChange={ (e) => this.setState({ client: e.target.value }) } />
					<br/>
					<br/>
					<button onClick={ () => this.addClient() }> Añadir cliente a la fila </button>
					<button onClick={ () => this.removeClient() }> Sacar cliente de la fila </button>
					<br/>
					<br/>
					<input type="text" placeholder="Posicion en la fila" value={position} onChange={ (e) => this.setState({ position: e.target.value }) } />
					<button onClick={ () => this.addClientToSpecificPosition() }> Añadir cliente a la fila en una posicion especifica </button>
			</div>
			<hr/>
			<div>
				<h1>Evaluación de token</h1>
					Ejemplo: {"{Palabra Clave 1}"},{"{Palabra Clave 2}"},{"{Palabra Clave 3}"}
					<br/>
				<input type="text" placeholder="Cadena de claves" onChange={ (e) => this.setState({ keywords: e.target.value })} />
				<button onClick={ () => this.decryptKeywords() }>Decifrar cadena</button>
				<p>
					Palabras desencriptadas: {
						decryptedKeywords.map((keyword, i) => {
							if (i + 1 == decryptedKeywords.length) {
								return keyword;
							} else {
								return keyword + ', ';
							} 
						})
					}
				</p>
			</div>
			<br/>
			<hr/>
		</div>
		);
	}
}

export default App;
