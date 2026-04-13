import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LANG_LABELS, type Lang } from '../../i18n/translations';
import styles from './LanguageSelector.module.css';

const LANGS = Object.keys(LANG_LABELS) as Lang[];

export function LanguageSelector() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language}
        title={t.language}
      >
        <Globe size={13} className={styles.globeIcon} />
        <span className={styles.triggerLabel}>{LANG_LABELS[lang]}</span>
        <ChevronDown
          size={11}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
        />
      </button>

      {open && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-label={t.language}
        >
          {LANGS.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <button
                className={`${styles.option} ${l === lang ? styles.optionActive : ''}`}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
              >
                <span className={styles.optionLabel}>{LANG_LABELS[l]}</span>
                {l === lang && <Check size={11} className={styles.checkIcon} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
