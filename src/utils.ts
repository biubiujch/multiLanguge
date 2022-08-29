export function generateID() {
  return Date.now() + +Math.random().toString().slice(2, 3);
}

export function modelWrap(target: any) {
  target.createItem = async (cb: Function, params: any) => {
    await target.create(params);
    cb();
  };

  target.getItem = async (cb: Function) => {
    let result = await target.findAll();
    cb(result);
  };
}
