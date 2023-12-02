export const randomId = () => {
  const date = new Date();

  const random_1: string = Math.random().toString(36).substring(2, 10);
  const randomId_1 = random_1.replace(/[0-9]/g, "");

  const random_2: string = String(date.getTime()).substring(0, 5);

  const isUnderbar: number = Math.floor(Math.random() * 10) + 1;

  let id: string = "";

  if (isUnderbar % 2 == 0) {
    id = randomId_1 + random_2;
  } else if (isUnderbar % 2 == 1) {
    id = randomId_1 + "_" + random_2;
  }

  return id;
};
