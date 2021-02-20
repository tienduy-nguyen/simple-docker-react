export function generateFullName(firstName: string, lastName: string) {
  let newFirstName = '';
  let newLastName = '';
  if (firstName) {
    newFirstName = firstName.charAt(0).toUpperCase() + lastName.slice(1);
  }
  if (lastName) {
    newLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  }
  return `${newFirstName} ${newLastName}`;
}
