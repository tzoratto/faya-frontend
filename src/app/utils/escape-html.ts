import {Message} from './message';

let entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F'
};

function escapeHtmlString(string: string): string {
    return String(string).replace(/[&<>"'\/]/g, (s) => {
        return entityMap[s];
    });
}

export function escapeHtml(obj: string | Message): string | Message {
    if (typeof obj === 'string') {
        return escapeHtmlString(obj);
    } else {
        Object.keys(obj.variables).forEach(function (key) {
            obj.variables[key] = escapeHtmlString(obj.variables[key]);
        });
        return obj;
    }
}
