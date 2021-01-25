import { IntlProvider } from 'react-intl';
import de_json from './de.json';
import en_json from './en.json';


interface Props {
  children: any,
  lang: string,
}

export const DEFAULT_LANG = "en";

export const sanitizeLanguage = (lang: string) => {
  switch (lang) {
    case "de":
    case "en":
      return lang;
    default:
      console.warn(`Unknown language: "${lang}"`);
      return "en";
  }
}

const getLangData = (lang: string) => {
  switch (lang) {
    case "de":
      return de_json;
    case "en":
      return en_json;
    default:
      console.warn(`No translations available for language: "${lang}"`);
      return en_json;
  }
}

// This can easily be used with react-redux (using the connect function) or a context
const Localizer = (props: Props) => {
  return <IntlProvider
    messages={getLangData(props.lang)}
    locale={props.lang}
    defaultLocale={DEFAULT_LANG}>
    {props.children}
  </IntlProvider>
}

export default Localizer;