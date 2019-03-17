export const markHotKey = (options: any) => {
  const { type, key } = options;

  return {
    // FIXME: type the args
    onKeyDown: (event: any, editor: any, next: any) => {
      if (!event.ctrlKey || event.key != key) return next();
      event.preventDefault();
      editor.toggleMark(type);
    }
  };
};
