import pathToRegexp from 'path-to-regexp';

const patternCache = {};
const cacheLimit = 10000;

let cacheCount = 0;

const compilePath = (pattern, options) => {
    const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
    const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {})

    if (cache[pattern]) {
        return cache[pattern];
    }

    const keys = [];
    // 完成匹配的正则和结果
    const re = pathToRegexp(pattern, keys, options);
    const compiledPattern = { re, keys };

    if (cacheCount < cacheLimit ) {
        cache[pattern] = compiledPattern;
        cacheCount++;
    }

    return compiledPattern;
}

const matchPath = (pathname, options = {}, parent) => {
    if (typeof options === 'string') {
        options = {
            path: options,
        };
    }

    const { path, exact = false, strict = false, sensitive = false } = options;

    if (path === null) {
        return parent;
    }

    const { re, keys } = compilePath(path, { end: exact, strict, sensitive });
    const match = re.exec(pathname);

    if (!match) {
        return null;
    }

    const [url, ...values] = match;

    const isExact = pathname === url;

    if (exact && !isExact) {
        return null;
    }

    return {
        // 用来做匹配的正则
        path,
        // 匹配到的路径
        url: path === '/' && (url === '' ? '/' : url),
        params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
        }, {}),
    };
}

export default matchPath;