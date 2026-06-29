/**
 * Facter Design System - Theme Presets
 *
 * Temas disponíveis:
 * - default: Neutro (shadcn default)
 * - truck: Azul (Facter Truck)
 * - vagas: Roxo (Facter Vagas)
 * - techcare: Verde (Facter TechCare)
 *
 * Uso no projeto:
 * ```css
 * // globals.css
 * @import '@facter/ds-core/themes/base.css';
 * @import '@facter/ds-core/themes/default.css';
 * @tailwind base;
 * @tailwind components;
 * @tailwind utilities;
 * ```
 */
declare const FACTER_THEMES: {
    readonly default: "default";
    readonly truck: "truck";
    readonly vagas: "vagas";
    readonly techcare: "techcare";
};
type FacterTheme = keyof typeof FACTER_THEMES;
/**
 * Lista de temas disponíveis com suas cores primárias
 * primaryHsl é usado para injetar CSS variables dinamicamente
 */
declare const THEME_INFO: {
    readonly default: {
        readonly name: "Default";
        readonly primaryColor: "#18181B";
        readonly primaryHsl: "240 5.9% 10%";
        readonly ringHsl: "240 5.9% 10%";
        readonly description: "Tema neutro padrão";
    };
    readonly truck: {
        readonly name: "Facter Truck";
        readonly primaryColor: "#3B5BDB";
        readonly primaryHsl: "233 65% 55%";
        readonly ringHsl: "233 65% 55%";
        readonly description: "Sistema de gestão de frotas";
    };
    readonly vagas: {
        readonly name: "Facter Vagas";
        readonly primaryColor: "#8B5CF6";
        readonly primaryHsl: "262 83% 58%";
        readonly ringHsl: "262 83% 58%";
        readonly description: "Plataforma de vagas de emprego";
    };
    readonly techcare: {
        readonly name: "Facter TechCare";
        readonly primaryColor: "#16A34A";
        readonly primaryHsl: "142 76% 36%";
        readonly ringHsl: "142 76% 36%";
        readonly description: "Sistema de assistência técnica";
    };
};

export { FACTER_THEMES, type FacterTheme, THEME_INFO };
