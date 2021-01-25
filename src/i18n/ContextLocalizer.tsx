import React from 'react';
import Localizer, { DEFAULT_LANG, sanitizeLanguage } from './Localizer';
import { getLanguageFromUrl, setLanguageInUrl, UrlLanguageChangeDetector } from './UrlParameterHandler';

const INITIAL_LANGUAGE = getLanguageFromUrl();

interface Props {
    children: any,
    handle_url_param: boolean,
}

interface LanguageContextData {
    lang: string,
    setLang: (newValue: string) => void,
}

const defaultLanguageContextData: LanguageContextData = {
    lang: INITIAL_LANGUAGE,
    setLang: (newLang: string) => { console.warn(`Failed to change language to "${newLang}": No context was provided (and the app fell back to the default data)`) },
};

export const LanguageContext = React.createContext(defaultLanguageContextData);

export default function ContextLocalizer(props: Props) {
    const initial_lang = props.handle_url_param ? INITIAL_LANGUAGE : DEFAULT_LANG;
    const [lang, setLang] = React.useState(initial_lang);
    const setLangWithUrlParam = (value: string) => {
        const sanitized_value = sanitizeLanguage(value);
        if (props.handle_url_param) {
            setLanguageInUrl(sanitized_value);
        }
        setLang(sanitized_value);
    }

    const contextData: LanguageContextData = { lang, setLang: setLangWithUrlParam };
    return <LanguageContext.Provider value={contextData}>
        <Localizer lang={lang}>
            {props.children}
        </Localizer>
        {props.handle_url_param && <UrlLanguageChangeDetector
            lang={lang}
            setLang={setLangWithUrlParam} />}
    </LanguageContext.Provider>
}