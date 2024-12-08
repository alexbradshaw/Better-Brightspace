// place files you want to import through the `$lib` alias in this folder;

export const conversionStep = (members: person[]): string => {
  let finalString = '{';

  for (let i = 0; i < members.length; i++) {
    finalString += members[i].id;
    if (i != members.length - 1) {
      finalString += ', ';
    }
  }

  finalString += '}';

  return finalString;
};
