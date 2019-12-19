
export const checkNumberIsPrimeOrNot = (number: number) => {

  let n: string | number | any, i: number, flag = true; 
    
  n = number; 
  n = parseInt(n);
  for(i = 2; i <= n - 1; i++) {
    if (n % i == 0) { 
      flag = false; 
      break; 
    } 
  }

  if (flag == true && n > 1) 
    return true;
  else
    return false;
}