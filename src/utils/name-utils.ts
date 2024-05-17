function removeHtmlTags(str: string) {
    return (str || '').replace(/(<([^>]+)>)/gi, '');
}

function removeMarkdownTags(str: string) {
    return (str || '').replace(/([*_~])/g, '');
}

function removeSpecialChars(str: string) {
    return (str || '').replace(/[^\w\s]/gi, '');
}

function getFirstLine(str: string) {
    return (str || '').split(/\r?\n/)[0];
}

function getFirst30Chars(str: string) {
    return (str || '').substring(0, 30);
}

export const getName = (str: string) => {
    let result = getFirstLine(str);
    result = removeMarkdownTags(result);
    result = removeHtmlTags(result);
    result = removeSpecialChars(result);
    return getFirst30Chars(result);
};