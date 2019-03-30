import workerCode from "./worker";

const workerCreator = (func: (...args: any) => any) => {
  const jobsMap = new Map();

  const blob = new Blob([`(${workerCode})(${String(func)})`]);
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);

  worker.addEventListener("message", (message: MessageEvent) => {
    const data = JSON.parse(message.data);
    const handlers = jobsMap.get(data.id);
    if (handlers !== undefined) {
      const [resolve, reject] = handlers;
      if (data.error !== undefined) {
        reject(data.error);
      } else {
        resolve(data.result);
      }
      jobsMap.delete(data.id);
    }
  });

  return (...args: Parameters<typeof func>) => {
    const id = Number(new Date());
    const promise = new Promise((resolve, reject) => {
      jobsMap.set(id, [resolve, reject]);
    });

    worker.postMessage({
      args,
      id
    });

    return promise;
  };
};

export default workerCreator;
