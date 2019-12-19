import { Request, Response } from 'express'; // eslint-disable-line no-unused-vars
import { checkNumberIsPrimeOrNot } from '../utils/checkNumberIsPrimeOrNot.util';
import _ from 'lodash';
import fs from 'fs';

class IndexController {
	public async calculateMultiples(req: Request, res: Response) {
			const { multiple } = req.body;
			const numbers: number[] = [];
			let cont = 4;
			while(cont <= multiple){
				console.log(cont);
				if((cont % 4) == 0) {
					numbers.push(cont);
				}
				cont++;
			}
			res.json(numbers);
	}

	public async uploadFile(req: Request, res: Response){
		const data = fs.readFileSync(req.files[0].path, 'utf8');
		const primes: number[] = [];
		const notPrimes: number[] = [];

		let sumPrimes: number = 0;
		let sumNotPrimes: number = 0;


		let text = data.toString();
		text = text.replace(/(\r\n|\n|\r)/gm, "");
		text = text.trim();
		
		const numbers = text.split(/([0-9]+)/);
		const normalizedNumbers: number[] = [];

		for (let index = 0; index < numbers[1].length; index++) {
			normalizedNumbers.push(Number(numbers[1].charAt(index)));
		}

		normalizedNumbers.map((number) => {
			checkNumberIsPrimeOrNot(number) ? primes.push(number) : notPrimes.push(number);
		});
		
		primes.map((prime) => {
			sumPrimes = prime + sumPrimes;
		});

		notPrimes.map((notPrime) => {
			sumNotPrimes = notPrime + sumNotPrimes;
		});

		res.status(200).json({ data: { normalizedNumbers, primes, sumPrimes, notPrimes, sumNotPrimes }});
	}

	public decryptKeywords(req: Request, res: Response) {

		let { keywords } = req.body;

		keywords = _.replace(keywords, /{/g, '');
		keywords = _.replace(keywords, /}/g, '');
		keywords = keywords.split(',');
	
		res.status(200).json(keywords);
	}

}

export default IndexController;
