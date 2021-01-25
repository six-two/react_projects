import { FormattedMessage } from 'react-intl';
import './App.css';
import ContextLocalizer from './i18n/ContextLocalizer';

const EMAIL = "info@six-two.dev";
const CONTACT_FORM = "https://contact.six-two.dev";

interface Props {
  name_id: string,
  children: JSX.Element,
}

const ContactListItem = (props: Props) => {
  return <li>
    <FormattedMessage id={props.name_id} />
    {": "}
    {props.children}
  </li>
}

function App() {
  return <ContextLocalizer handle_url_param={true}>
    <div className="app">
      {/* General */}
      <h2><FormattedMessage id="general_title" /></h2>
      <p><FormattedMessage id="general_description" /></p>
      {/* Contact */}
      <h2><FormattedMessage id="contact_title" /></h2>
      <ul>
        <ContactListItem name_id="email">
          <a href={"mailto:" + EMAIL}>{EMAIL}</a>
        </ContactListItem>
        <ContactListItem name_id="telegram">
          <a href="https://t.me/six-two">six-two</a>
        </ContactListItem>
        <ContactListItem name_id="threema">
          <span>5RRSCUKP</span>
        </ContactListItem>
        <ContactListItem name_id="discord">
          <span>six-two#5891</span>
        </ContactListItem>
        <ContactListItem name_id="web_form">
          <a href={CONTACT_FORM}>{CONTACT_FORM}</a>
        </ContactListItem>
      </ul>
    </div>
  </ContextLocalizer>
}

export default App;
