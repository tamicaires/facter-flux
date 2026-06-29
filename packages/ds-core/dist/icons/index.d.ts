import * as React from 'react';

interface TireProps extends React.SVGAttributes<SVGElement> {
    size?: number | string;
}
declare const Tire: React.FC<TireProps>;

export { Tire, type TireProps };
