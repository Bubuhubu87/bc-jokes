export { };

declare global {
    interface Array<T> {
        url(): string;
    }
}

Array.prototype.url = function () {
    return this.map((item) =>
        item.endsWith('/')
            ? item.slice(0, -1)
            : item).join('/');
};
