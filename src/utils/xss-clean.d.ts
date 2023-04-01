declare module 'xss-clean' {
    import { RequestHandler } from 'express';

    function xss(options?: xss.IFilterXSSOptions): RequestHandler;

    namespace xss {
        interface IFilterXSSOptions {
            whiteList?: any;
            stripIgnoreTag?: boolean;
            stripIgnoreTagBody?: any[];
            onTagAttr?: (tag: string, name: string, value: string, isWhiteAttr: boolean) => string;
            onIgnoreTag?: (tag: string, html: string, options: IFilterXSSOptions) => string;
            onTag?: (tag: string, html: string, options: IFilterXSSOptions) => string;
            safeAttrValue?: (tag: string, name: string, value: string, cssFilter: (style: string) => string) => string;
            escapeHtml?: (html: string) => string;
            escapeRegExp?: (str: string) => string;
            whiteListTag?: string | string[];
            stripBlankChar?: boolean;
            css?: boolean | ICssFilter;
            cssStrict?: boolean;
            useImgAlt?: boolean;
        }

        interface IFilterXSS {
            (html: string, options?: IFilterXSSOptions): string;
        }

        interface IFilterCSS {
            (css: string): string;
        }

        interface ICssFilter {
            whiteList?: any;
            onAttr?: (name: string, value: string, cssFilter: (style: string) => string) => string;
        }
    }

    export = xss;
}
