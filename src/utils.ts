export function generateID() {
  return Date.now()+ Math.random().toString().slice(2, 3);
}

type N = ReturnType<typeof generateID>