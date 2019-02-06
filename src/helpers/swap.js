export default function (source, from, to) {
    const toSource = source[to];
    source[to] = source[from];
    source[from] = toSource;

    return source;
}