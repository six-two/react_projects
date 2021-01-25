import { useEffect } from 'react';
import { DEFAULT_LANG, sanitizeLanguage } from './Localizer';

const PARAM_NAME = "lang";

interface Props {
    lang: string,
    setLang: (lang: string) => void,
}

export const getLanguageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get(PARAM_NAME) || DEFAULT_LANG;
    return sanitizeLanguage(lang);
}

export const setLanguageInUrl = (lang: string) => {
    const old_url = window.location.href;

    const url_builder = new URL(old_url);
    url_builder.searchParams.set(PARAM_NAME, lang);
    const new_url = url_builder.toString();

    if (old_url !== new_url) {
        console.log(`Updated URL: "${old_url}" -> "${new_url}"`);
        window.history.replaceState({}, "", new_url);
    }
}

export const UrlLanguageChangeDetector = (props: Props) => {
    useEffect(() => {
        const timer = setInterval(() => {
            const new_lang = getLanguageFromUrl();
            if (new_lang !== props.lang) {
                props.setLang(new_lang);
            }
        }, 100);
        return () => clearInterval(timer);
    });
    return null;
}