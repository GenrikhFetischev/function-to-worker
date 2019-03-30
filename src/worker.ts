export default (func: (...args: any) => any) => {
  const onMessage = (message: MessageEvent) => {
    const output: { id: string; result?: any; error?: Error } = {
      id: message.data.id
    };
    try {
      output.result = func(...message.data.args);
    } catch (e) {
      output.error = e.message;
    }
    postMessage(JSON.stringify(output));
  };

  self.addEventListener("message", onMessage);
};
