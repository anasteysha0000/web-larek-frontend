export type ViewChild = HTMLElement | HTMLElement[];
export function isChildElement(x: unknown): x is ViewChild {
    return x instanceof HTMLElement || Array.isArray(x);
}
// следующие типы для универсальной настройки тега
export type ViewAttrs = 'textContent' | 'className' | 'href' | 'src' | 'alt'; // ограничиваем, что можно настроить
export type ViewProps = Partial<Record<ViewAttrs, string>> // Partial делает все поля не обязательными
export type ViewValue = string | ViewChild | ViewProps; 