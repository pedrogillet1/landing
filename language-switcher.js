// Language Switcher JavaScript
// Handles dropdown interaction, language switching, and translations

document.addEventListener('DOMContentLoaded', () => {
  const languageToggle = document.getElementById('language-toggle');
  const languageMenu = document.getElementById('language-menu');
  const currentLanguageSpan = document.getElementById('current-language');

  // Dropdown Interaction
  if (languageToggle && languageMenu) {
    languageToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = languageToggle.getAttribute('aria-expanded') === 'true';
      languageToggle.setAttribute('aria-expanded', !isExpanded);
      languageMenu.classList.toggle('hidden');
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
      if (!languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
        languageToggle.setAttribute('aria-expanded', 'false');
        languageMenu.classList.add('hidden');
      }
    });

    // Prevent menu clicks from closing the dropdown
    languageMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  // Language flags mapping
  const languageFlags = {
    'en': '🇬🇧',
    'pt': '🇧🇷',
    'es': '🇪🇸'
  };

  // Function to set the language
  const setLanguage = async (lang) => {
    try {
      localStorage.setItem('language', lang);
      if (currentLanguageSpan) {
        const flag = languageFlags[lang] || '';
        currentLanguageSpan.textContent = `${flag} ${lang.toUpperCase()}`;
      }

      // Apply translations
      await applyTranslations(lang);

      // Close the dropdown
      if (languageToggle && languageMenu) {
        languageToggle.setAttribute('aria-expanded', 'false');
        languageMenu.classList.add('hidden');
      }
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  // Function to apply translations
  async function applyTranslations(lang) {
    try {
      const response = await fetch(`/translations/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const translations = await response.json();

      // Set the lang attribute on the HTML element for CSS selectors
      document.documentElement.setAttribute('lang', lang);

      // Apply translations to elements with data-i18n-key
      document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        const translation = getNestedTranslation(translations, key);

        if (translation) {
          // Check if element has a placeholder attribute
          if (element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', translation);
          } else {
            element.innerHTML = translation;
          }
        }
      });
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  // Helper function to get nested translation
  function getNestedTranslation(obj, key) {
    const keys = key.split('.');
    let result = obj;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return null;
      }
    }
    return result;
  }

  // Event listeners for language selection
  if (languageMenu) {
    languageMenu.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        const lang = event.target.getAttribute('data-lang');
        setLanguage(lang);
      }
    });
  }

  // Browser Language Detection and Suggestion
  const suggestLanguage = () => {
    const browserLang = navigator.language.split('-')[0]; // 'en-US' -> 'en'
    const supportedLangs = ['en', 'pt', 'es'];
    const isFirstVisit = !localStorage.getItem('language');

    if (isFirstVisit && supportedLangs.includes(browserLang) && browserLang !== 'en') {
      // Create suggestion bar
      const suggestionBar = document.createElement('div');
      suggestionBar.className = 'language-suggestion-bar';

      const langNames = {
        'pt': 'Português',
        'es': 'Español'
      };

      suggestionBar.innerHTML = `
        <span>Detected ${langNames[browserLang]} — Switch to ${langNames[browserLang]}?</span>
        <div>
          <button id="lang-yes">Yes</button>
          <button id="lang-no">No</button>
        </div>
      `;
      document.body.appendChild(suggestionBar);

      document.getElementById('lang-yes').addEventListener('click', () => {
        setLanguage(browserLang);
        suggestionBar.remove();
      });

      document.getElementById('lang-no').addEventListener('click', () => {
        localStorage.setItem('language', 'en');
        suggestionBar.remove();
      });
    }
  };

  // Check for saved language on page load
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    setLanguage(savedLanguage);
  } else {
    // Suggest language based on browser settings
    suggestLanguage();
    // Set default to English
    if (currentLanguageSpan) {
      currentLanguageSpan.textContent = '🇬🇧 EN';
    }
  }
});
