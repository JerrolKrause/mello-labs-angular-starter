import { Spinner } from 'primeng/spinner';

/**
 * Format the currency supplied from the spinner properly
 * @param currency
 */
export const currencyChange = (currency: Spinner): string => {
  // Get current value
  let val = currency.inputfieldViewChild.nativeElement.value;
  // Remove anything but valid currency characters
  val = val.replace(/[^\d,.]/, '');
  if (val.includes('.')) {
    const split = val.split('.');
    split[1] = split[1].slice(0, 2);
    val = split.join('.');
  }

  // Update spinner control
  currency.inputfieldViewChild.nativeElement.value = val;
  currency.formatValue();
  currency.value = val;

  // Fix bug with Spinner component that allows more than 2 decimal places
  setTimeout(() => {
    const split = currency.inputfieldViewChild.nativeElement.value.split('.');
    if (split && split[1] && split[1].length > 2) {
      currency.inputfieldViewChild.nativeElement.value = val;
    }
  });
  return val.replace(/[^\d.]/, '');
};
