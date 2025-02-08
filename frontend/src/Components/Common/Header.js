import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  const handleLangChange = (e) => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
    
    // Set RTL/LTR
    if (langCode === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = langCode;
    }
    
    localStorage.setItem("I18N_LANGUAGE", langCode);
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default Header; 