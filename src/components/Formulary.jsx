import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolio, AREA_ORDER, LAB_LABELS } from '../data/portfolio';

const COLUMNS = [
  { key: 'brand', labelKey: 'colBrand' },
  { key: 'area', labelKey: 'colArea' },
  { key: 'lab', labelKey: 'colLab' },
  { key: 'years', labelKey: 'colYears' }
];

function SortArrow({ direction }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" data-dir={direction}>
      <path d="M5 1v8M2 6l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function Formulary() {
  const { language, t } = useLanguage();
  const [area, setArea] = useState('all');
  const [sort, setSort] = useState({ key: 'years', direction: 'desc' });

  const specialties = t('specialties.items');

  // Look up the display name for a therapeutic area from the specialties list
  const areaName = useMemo(() => {
    const map = {};
    if (Array.isArray(specialties)) {
      specialties.forEach((item) => {
        map[item.id] = item.name;
      });
    }
    return map;
  }, [specialties]);

  const rows = useMemo(
    () =>
      portfolio.map((entry) => ({
        ...entry,
        areaLabel: entry.areaKey ? areaName[entry.areaKey] ?? entry.areaKey : t('formulary.unclassified'),
        labLabel: LAB_LABELS[entry.lab]?.[language] ?? entry.lab,
        years: `${entry.from}–${entry.to}`
      })),
    [areaName, language, t]
  );

  const areas = useMemo(() => {
    const counts = { all: rows.length };
    AREA_ORDER.forEach((key) => {
      counts[key] = rows.filter((row) => row.areaKey === key).length;
    });
    return counts;
  }, [rows]);

  const visible = useMemo(() => {
    const filtered = area === 'all' ? rows : rows.filter((row) => row.areaKey === area);
    const factor = sort.direction === 'asc' ? 1 : -1;

    return [...filtered].sort((a, b) => {
      if (sort.key === 'years') return (a.from - b.from) * factor;
      const left = sort.key === 'area' ? a.areaLabel : sort.key === 'lab' ? a.labLabel : a.brand;
      const right = sort.key === 'area' ? b.areaLabel : sort.key === 'lab' ? b.labLabel : b.brand;
      return left.localeCompare(right, language) * factor;
    });
  }, [rows, area, sort, language]);

  const toggleSort = (key) =>
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: key === 'years' ? 'desc' : 'asc' }
    );

  const ariaSort = (key) =>
    sort.key === key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined;

  return (
    <div id="formulary" className="c-section green">
      <div className="c-section__content left">
        <span className="c-eyebrow" data-ix="load-under">
          {t('formulary.eyebrow')}
        </span>

        <h2 data-ix="load-right">{t('formulary.title')}</h2>

        <p className="lede measure-wide is-cream" data-ix="load-left">
          {t('formulary.lede')}
        </p>

        <div className="c-formulary" data-ix="staggar-load">
          <div className="c-filters" role="group" aria-label={t('formulary.colArea')}>
            <button
              type="button"
              className="c-filter"
              aria-pressed={area === 'all'}
              onClick={() => setArea('all')}
            >
              {t('formulary.filterAll')}
              <span className="c-filter__count">{areas.all}</span>
            </button>

            {AREA_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className="c-filter"
                aria-pressed={area === key}
                onClick={() => setArea(key)}
              >
                {areaName[key] ?? key}
                <span className="c-filter__count">{areas[key]}</span>
              </button>
            ))}
          </div>

          {/* Announce result count changes to screen readers */}
          <p aria-live="polite" className="u-visually-hidden">
            {visible.length} {t('formulary.countLabel')}
          </p>

          {visible.length === 0 ? (
            <p className="c-formulary__empty">{t('formulary.empty')}</p>
          ) : (
            <>
              <table className="c-table">
                <caption className="u-visually-hidden">{t('formulary.title')}</caption>
                <thead>
                  <tr>
                    {COLUMNS.map((column) => (
                      <th key={column.key} scope="col" aria-sort={ariaSort(column.key)}>
                        <button type="button" onClick={() => toggleSort(column.key)}>
                          {t(`formulary.${column.labelKey}`)}
                          <SortArrow direction={sort.key === column.key ? sort.direction : 'asc'} />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((row) => (
                    <tr key={`${row.brand}-${row.lab}`}>
                      <td className="c-table__brand">{row.brand}</td>
                      <td className={row.areaKey ? undefined : 'c-table__muted'}>{row.areaLabel}</td>
                      <td className="c-table__muted">{row.labLabel}</td>
                      <td className="c-table__muted">{row.years}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Small screens: the same records as labelled blocks */}
              <div className="c-formulary__list">
                {visible.map((row) => (
                  <div className="c-formulary__row" key={`m-${row.brand}-${row.lab}`}>
                    <span className="c-formulary__row-brand">{row.brand}</span>
                    <span className="c-formulary__row-years">{row.years}</span>
                    <span className="c-formulary__row-meta">
                      {row.areaLabel} · {row.labLabel}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="c-formulary__note">{t('formulary.note')}</p>
        </div>
      </div>
    </div>
  );
}
